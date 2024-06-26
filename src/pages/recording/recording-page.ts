import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Recorder } from "../../util/recorder";
import { classMap } from "lit/directives/class-map.js";
import "@material/web/button/filled-button";

@customElement("recording-page")
export class RecordingPage extends LitElement {
  @property() public wakeWord!: string;
  @property() public description!: string;
  @property() public recorder!: Recorder;
  @state() public times = 10;

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    const showDelayedGreenDot = () => {
      setTimeout(() => {
        this.recorder.expectWakeWord = true;
        this.requestUpdate("recorder");
      }, 4000);
    };
    this.recorder.addEventListener("data", () => {
      this.times--;
      // Someone left the page open or it's hidden
      if (this.times < -100 || document.hidden) {
        this.recorder.stop();
      }
      this.recorder.expectWakeWord = false;
      this.requestUpdate("recorder");
      showDelayedGreenDot();
    });
  }

  render() {
    return html`
      <div class="recording">RECORDING ACTIVE</div>
      <div class="instructions">
        <p>When the circle is green, say “Okay, Nabu”</p>
        <div
          class="green-circle ${classMap({
            recording: this.recorder.expectWakeWord,
          })}"
        ></div>
        <div>
          <p>
            ${this.times > 0
              ? html`${this.times} more time${this.times == 1 ? "" : "s"}`
              : "Keep going if you want to!"}
          </p>
          <p>
            Say it like you would say it normally. Try moving around the room.
            Occasionally speak softly or speak up.
          </p>
        </div>
      </div>
      <md-filled-button
        @click=${() => {
          this.recorder.stop();
        }}
      >
        Stop Recording
      </md-filled-button>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .recording {
      box-sizing: border-box;
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      padding: 16px;
      text-align: center;
      background-color: red;
      color: white;
    }

    .instructions {
      flex: 1;
      padding: 16px;
      text-align: center;
      font-size: 24px;
    }

    .green-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 16px auto;
      background-color: red;
    }

    .green-circle.recording {
      background-color: green;
    }
  `;
}
