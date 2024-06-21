let warned = false;

export class Recorder {
  public expectWakeWord = false;
  public stopped = false;
  private _listeners: Record<string, () => void> = {};

  constructor(
    public wakeWord: string,
    public stream: MediaStream,
    public recorder: MediaRecorder,
    public vad: any,
  ) {
    recorder.addEventListener("dataavailable", this.dataAvailable);
  }

  addEventListener(event: "data" | "stop", cb: () => void) {
    this._listeners[event] = cb;
  }

  dataAvailable = (e: { data: Blob }) => {
    if (!e.data || this.stopped) {
      return;
    }

    let mime = this.recorder.mimeType.split(";")[0];

    if (mime !== "audio/webm") {
      // alert(`Microphone mimetype not supported: ${mime}`);
      // this.stop();
      // return;
      // For testing purposes until we allow other formats
      if (!warned && !["audio/ogg", "audio/mp4"].includes(mime)) {
        warned = true;
        alert(`Your mime type is not known yet, let us know: ${mime}`);
      }
      mime = "audio/webm";
    }

    if (this._listeners.data) {
      this._listeners.data();
    }

    const params = new URLSearchParams({
      wake_word: this.wakeWord,
      distance: "0",
      speed: "0",
    }).toString();

    fetch(
      `https://services-dev.home-assistant.workers.dev/assist/wake_word/training_data/upload?${params}`,
      {
        method: "PUT",
        body: e.data,
        headers: {
          "Content-Type": this.recorder.mimeType.split(";")[0],
        },
      },
    );
  };

  start() {
    this.recorder.start();
    this.vad.start();
  }

  stop() {
    this.expectWakeWord = false;
    this.stopped = true;
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
      // this.stream.removeTrack(track);
    });
    // this.vad.audioContext.close();
    if (this._listeners.stop) {
      this._listeners.stop();
    }
  }
}

export const createRecorder = async (
  wakeWord: string,
): Promise<Recorder | undefined> => {
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: false,
        autoGainControl: true,
        noiseSuppression: false,
      },
    });
  } catch (e) {
    console.error("Microphone declined", e);
    return undefined;
  }
  const mediaRecorder = new MediaRecorder(stream);

  // @ts-ignore-next-line
  const myvad = await vad.MicVAD.new({
    stream,
    // onSpeechStart: () => {
    //     console.log("Speech start detected")
    // },
    onSpeechEnd: (audio: any) => {
      if (!recorder.expectWakeWord || recorder.stopped) {
        return;
      }
      mediaRecorder.stop();
      mediaRecorder.start();
    },
  });
  const recorder = new Recorder(wakeWord, stream, mediaRecorder, myvad);
  recorder.start();
  return recorder;
};
