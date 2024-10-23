import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Recorder } from "../../util/recorder";
import { preloadImage } from "../../util/preload";
import { classMap } from "lit/directives/class-map.js";
import "@material/web/button/filled-button";
import { PAGE_STYLES, WAKE_WORDS } from "../../const";

@customElement("recording-page")
export class RecordingPage extends LitElement {
  @property() public wakeWord!: string;
  @property() public description!: string;
  @property({
    attribute: false,
  })
  public recorder!: Recorder;
  @state() private times = 10;

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    const showDelayedGreenDot = (time = 4000) => {
      setTimeout(() => {
        this.recorder.expectWakeWord = true;
        this.requestUpdate("recorder");
      }, time);
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
    showDelayedGreenDot(1000);
  }

  render() {
    preloadImage("./images/casita/heart.gif");

    return html`
      <div class="recording-sign">RECORDING ACTIVE</div>
      <div class="speak-indicator">
        <p>When the circle turns green, say “${WAKE_WORDS[this.wakeWord]}”</p>
        <div
          class="green-circle ${classMap({
            recording: this.recorder.expectWakeWord,
          })}"
        >
          <span class="sr-only" aria-live="assertive">
            Status:
            ${this.recorder.expectWakeWord
              ? "Say the wake word"
              : "Processing. Please wait..."}
          </span>
        </div>
        <p>
          ${this.times > 0
            ? html`${this.times} more time${this.times == 1 ? "" : "s"}`
            : "Keep going if you want to!"}
        </p>
      </div>
      <md-filled-button
        @click=${() => {
          this.recorder.stop();
        }}
      >
        ${this.times > 0 ? "Stop Recording" : "I am finished"}
      </md-filled-button>
    `;
  }

  static styles = [
    PAGE_STYLES,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .recording-sign {
        box-sizing: border-box;
        width: 100%;
        font-size: 24px;
        font-weight: bold;
        padding: 16px;
        text-align: center;
        background-color: red;
        color: white;
      }

      .speak-indicator {
        flex: 1;
        padding: 16px;
        text-align: center;
        font-size: 24px;
      }

      .instructions {
        padding: 0 16px;
      }

      .green-circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 16px auto;
        border: 5px solid red;
      }

      .green-circle.recording {
        background-color: green;
        border-color: green;
      }

      md-filled-button {
        margin-bottom: 16px;
      }

      .sr-only {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    `,
  ];
}
