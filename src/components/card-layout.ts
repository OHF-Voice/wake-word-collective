import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PAGE_STYLES } from "../const";

@customElement("card-layout")
export class CardLayout extends LitElement {
  @property() public header!: string;
  @property() public casita!: string;
  @property() public alignment: "center" | "left" = "left";

  render() {
    return html`
      <div class="ha-card align-${this.alignment}">
        <div class="card-header">
          <slot name="header-image" class="header-image"></slot>
          ${this.header ? html`<h1>${this.header}</h1>` : nothing}
        </div>
        <slot name="banner"></slot>
        <slot name="content"></slot>
        <slot name="actions"></slot>
      </div>
      <div class="spacer"></div>
      <div class="footer">
        <a href="https://www.home-assistant.io">Home&nbsp;Assistant</a>
        –
        <a href="https://www.openhomefoundation.org"
          >Open&nbsp;Home&nbsp;Foundation</a
        >
        –
        <a
          href="https://github.com/ohf-voice/wake-word-collective/issues"
          target="_blank"
          rel="noopener"
          >Report&nbsp;bug</a
        >
      </div>
    `;
  }

  static styles = [
    PAGE_STYLES,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 450px;
      }

      .spacer {
        flex: 1;
      }

      .footer {
        text-align: center;
        font-size: 14px;
        padding: 16px 16px 15px;
        color: var(--secondary-text-color);
      }

      .footer a {
        color: var(--secondary-text-color);
      }

      .ha-card {
        background: var(
          --ha-card-background,
          var(--paper-card-background-color, white)
        );
        border-radius: var(--ha-card-border-radius);
        border: 1px solid rgba(0, 0, 0, 0.12);
        color: var(--primary-text-color);
        display: block;
        transition: all 0.3s ease-out;
        position: relative;
        margin-top: 25px;
        width: 100%;
        max-width: 600px;
      }

      @media all and (max-width: 500px) {
        .ha-card {
          max-width: 95%;
          margin-top: 16px;
        }
      }

      .ha-card.align-center {
        text-align: center;
      }

      h1 {
        color: var(--ha-card-header-color, --primary-text-color);
        font-family: var(--ha-card-header-font-family, inherit);
        font-size: var(--ha-card-header-font-size, 24px);
        letter-spacing: -0.012em;
        line-height: 40px;
        font-weight: 400;
      }

      .card-header {
        display: flex;
        flex-direction: column;
      }

      .card-header h1 {
        margin: 16px 16px 0;
        font-weight: 500;
      }

      .card-header .header-image::slotted(*) {
        padding-top: 32px;
      }

      ::slotted(.card-content) {
        padding: 16px;
        line-height: 1.5;
      }

      ::slotted(.card-actions) {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        display: flex;
        flex-wrap: wrap;
        gap: 4px 0;
        justify-content: flex-end;
        align-items: center;
        padding: 8px;
      }
    `,
  ];
}
