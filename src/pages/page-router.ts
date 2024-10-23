import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./landing/landing-page";
import "./thank-you-page/thank-you-page";
import "../components/header-logo";
import { WAKE_WORDS } from "../const";
import type { Recorder } from "../util/recorder";

@customElement("page-router")
export class PageRouter extends LitElement {
  @state()
  private wakeWord?: string;

  @state()
  private recorder?: Recorder;

  @state()
  private description = "";

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    import("./lazy-load.js");

    const processHash = () => {
      const hashWakeWord = location.hash.slice(1);

      if (hashWakeWord in WAKE_WORDS || hashWakeWord === "thank_you") {
        this.wakeWord = hashWakeWord;
      } else {
        this.wakeWord = undefined;
      }
    };

    processHash();

    window.addEventListener("hashchange", processHash);
  }

  render() {
    if (!this.wakeWord) {
      return html`
        <landing-page
          .selectWakeWord=${(wakeWord: string) => {
            this.wakeWord = wakeWord;
            location.hash = wakeWord;
          }}
        ></landing-page>
      `;
    }

    if (this.wakeWord === "thank_you") {
      return html`<thank-you-page></thank-you-page>`;
    }

    if (!this.description) {
      return html`
        <consent-page
          .wakeWord=${this.wakeWord}
          .description=${this.description}
          .giveConsent=${(description: string) => {
            this.description = description;
          }}
          .cancelConsent=${() => {
            this.wakeWord = undefined;
          }}
        ></consent-page>
      `;
    }

    if (!this.recorder) {
      return html`
        <instructions-page
          .wakeWord=${this.wakeWord}
          .description=${this.description}
          .startRecording=${(recorder: Recorder) => {
            this.recorder = recorder;

            recorder.addEventListener("stop", () => {
              this.wakeWord = undefined;
              this.recorder = undefined;
              location.hash = "thank_you";
            });

            this.recorder?.start();
          }}
        ></instructions-page>
      `;
    }

    return html`
      <recording-page
        .recorder=${this.recorder}
        .wakeWord=${this.wakeWord}
        .description=${this.description}
      ></recording-page>
    `;
  }

  static styles = css`
    * {
      flex: 1;
    }
  `;
}
