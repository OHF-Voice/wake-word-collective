import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("header-logo")
export class HeaderLogo extends LitElement {
  render() {
    return html`
      <header>
        <img src="./images/logo.svg" alt="Wake Word Collective logo" />
      </header>
    `;
  }

  static styles = css`
    header {
      margin: 0 auto;
      max-width: 450px;
      text-align: center;
      margin-top: 50px;
      padding: 0 16px;
    }

    img {
      display: block;
      width: 100%;
      max-height: 38px;
    }
  `;
}
