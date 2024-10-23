import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ICON_CHECK_SLOTTED, ICON_COPY_SLOTTED } from "../const";

@customElement("share-url")
export class ShareURL extends LitElement {
  @state() private copied: boolean = false;

  render() {
    return html`
      <md-text-button
        trailing-icon
        @click=${this.copyToClipboard}
        ?disabled=${this.copied}
      >
        ${this.copied
          ? html`URL copied to clipboard! ${ICON_CHECK_SLOTTED}`
          : html`Copy URL to clipboard ${ICON_COPY_SLOTTED}`}
      </md-text-button>
    `;
  }

  async copyToClipboard() {
    if (this.copied) return;

    await navigator.clipboard.writeText(
      "https://ohf-voice.github.io/wake-word-collective/",
    );

    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 5000);
  }

  static styles = css`
    md-text-button {
      display: block;
    }
  `;
}
