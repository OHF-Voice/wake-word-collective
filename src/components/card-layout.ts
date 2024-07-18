import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("card-layout")
export class CardLayout extends LitElement {
  @property() public header!: string;

  render() {
    return html`
      <div class="ha-card">
        <h1 class="card-header">${this.header}</h1>
        <slot></slot>
      </div>
      <div class="spacer"></div>
      <div class="footer">
        <a href="https://www.home-assistant.io">Home&nbsp;Assistant</a> –
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

  static styles = css`
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

      margin-top: 50px;
      width: 100%;
      max-width: 600px;
    }

    @media all and (max-width: 500px) {
      .ha-card {
        --ha-card-border-radius: 0;
        margin-top: 0;
      }
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
      margin: 24px 16px 16px;
      display: block;
    }

    ::slotted(.card-content) {
      padding: 0 16px 16px;
    }

    ::slotted(.card-content) p:last-child {
      margin-bottom: 0;
    }

    ::slotted(.card-content) p:first-child {
      margin-top: 0;
    }

    ::slotted(.card-actions) {
      border-top: 1px solid #e8e8e8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
    }
  `;
}
