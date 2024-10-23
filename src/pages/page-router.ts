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
  private showInstructions = false;

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
        <header-logo></header-logo>
        <landing-page
          .selectWakeWord=${(wakeWord: string) => {
            this.wakeWord = wakeWord;
            location.hash = wakeWord;
          }}
        ></landing-page>
      `;
    }

    if (this.wakeWord === "thank_you") {
      return html`
        <header-logo></header-logo>
        <thank-you-page></thank-you-page>
      `;
    }

    if (this.showInstructions) {
      return html`
        <header-logo></header-logo>
        <instructions-page
          .wakeWord=${this.wakeWord}
          .description=${this.description}
          .startRecording=${(recorder: Recorder) => {
            this.recorder = recorder;

            recorder.addEventListener("stop", () => {
              this.wakeWord = undefined;
              this.recorder = undefined;
              this.showInstructions = false;
              location.hash = "thank_you";
            });

            this.showInstructions = false;
            this.recorder?.start();
          }}
        ></instructions-page>
      `;
    }

    if (!this.recorder) {
      return html`
        <header-logo></header-logo>
        <consent-page
          .wakeWord=${this.wakeWord}
          .description=${this.description}
          .giveConsent=${(description: string) => {
            this.showInstructions = true;
            this.description = description;
          }}
          .cancelConsent=${() => {
            this.wakeWord = undefined;
            this.showInstructions = false;
          }}
        ></consent-page>
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
    recording-page {
      width: 100%;
      height: 100%;
      align-items: center;
    }
  `;
}
