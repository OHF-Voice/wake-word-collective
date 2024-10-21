import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ICON_CHECK_SLOTTED, ICON_COPY_SLOTTED } from "../const";

@customElement("share-url")
export class ShareURL extends LitElement {
  private copied: boolean = false;

  render() {
    return html`
      <md-text-button
        trailing-icon
        @click=${this.copyToClipboard}
        ?disabled=${this.copied}
      >
        ${this.copied ? "URL copied to clipboard" : "Copy URL to clipboard"}
        ${this.copied ? ICON_CHECK_SLOTTED : ICON_COPY_SLOTTED}
      </md-text-button>
    `;
  }

  async copyToClipboard() {
    if (this.copied) return;

    await navigator.clipboard.writeText(
      "https://ohf-voice.github.io/wake-word-collective/",
    );

    this.copied = true;
    this.requestUpdate("copied");
  }

  static styles = css`
    md-text-button {
      margin-top: 16px;
      width: 100%;
    }
  `;
}
