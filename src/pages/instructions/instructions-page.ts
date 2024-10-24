import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ICON_CHEVRON_SLOTTED, PAGE_STYLES, WAKE_WORDS } from "../../const";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/icon/icon";
import "../../components/card-layout";
import "../../components/error-notice";
import { createRecorder } from "../../util/recorder";
import type { Recorder } from "../../util/recorder";

@customElement("instructions-page")
export class InstructionsPage extends LitElement {
  @property({
    attribute: false,
  })
  public startRecording!: (recorder: Recorder) => void;

  @property() public description!: string;

  @property() public wakeWord!: string;

  @state() private recorderError: boolean = false;

  render() {
    return html`
      <card-layout header="Before we get started">
        <img
          src="./images/demo.gif"
          class="demo"
          slot="banner"
          alt="Demonstration of a person walking around a room, saying the wake word"
        />
        <div class="card-content" slot="content">
          ${this.recorderError
            ? html`
                <error-notice>
                  There was an issue accessing your microphone. Please check
                  your browser permissions and try again
                </error-notice>
              `
            : nothing}
          <p>
            We only need you to say two words,
            <strong>${WAKE_WORDS[this.wakeWord]}</strong>, a couple of times
            over.
          </p>
          <ol>
            <li>
              <strong>Place this device down</strong> in the kind of spot you'd
              put a voice assistant
            </li>
            <li>
              When the <strong>circle turns green</strong> say
              “${WAKE_WORDS[this.wakeWord]}”
            </li>
            <li>
              Say the wake word while you
              <strong>walk around the room</strong>.
            </li>
            <li>
              Try speaking <strong>quietly</strong> and <strong>LOUDLY</strong>.
            </li>
          </ol>
          <p>Don’t worry about background noise; it's useful for training</p>
        </div>
        <div class="card-actions" slot="actions">
          <md-text-button has-icon trailing-icon @click=${this.beginRecording}>
            Let's get started ${ICON_CHEVRON_SLOTTED}
          </md-text-button>
        </div>
      </card-layout>
    `;
  }

  async beginRecording() {
    this.recorderError = false;
    const recorder = await createRecorder(this.wakeWord, this.description);
    if (!recorder) {
      this.recorderError = true;
      return;
    }

    this.startRecording(recorder);
  }

  static styles = [
    PAGE_STYLES,
    css`
      md-list {
        border-radius: 12px;
      }

      svg {
        width: 24px;
      }

      img.demo {
        display: block;
        width: 100%;
      }
    `,
  ];
}
