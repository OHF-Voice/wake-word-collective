import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("error-notice")
export class ErrorNotice extends LitElement {
  render() {
    return html`
      <div class="notice error">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .notice {
      padding: 10px 12px;
      border-radius: 4px;
      box-sizing: border-box;
      font-weight: 700;
      font-size: 14px;
    }

    .error {
      background-color: var(--danger-color);
      color: #fff;
    }
  `;
}
