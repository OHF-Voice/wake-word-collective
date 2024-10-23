import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PAGE_STYLES } from "../const";

@customElement("card-layout")
export class CardLayout extends LitElement {
  @property() public header!: string;
  @property() public casita!: string;
  @property() public alignment: "center" | "left" = "left";

  render() {
    let cardHeader = null;
    if (this.header) {
      cardHeader = html`
        <h1 class="card-header">
          ${this.casita
            ? html`
                <div class="casita">
                  <img src="./images/casita/${this.casita}.gif" />
                </div>
              `
            : null}
          ${this.header}
        </h1>
      `;
    }

    return html`
      <div class="ha-card align-${this.alignment}">
        ${cardHeader}
        <slot></slot>
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

      h1.card-header {
        margin: 16px 16px 16px;
        display: flex;
        font-weight: 500;
        flex-direction: column;
      }

      .casita {
        margin-top: 16px;
      }

      .casita img {
        height: 120px;
      }

      ::slotted(.card-content) {
        padding: 0 16px 16px;
        line-height: 1.5;
      }

      ::slotted(.card-actions) {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 8px;
      }
    `,
  ];
}
