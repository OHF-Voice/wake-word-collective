import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ICON_CHEVRON_SLOTTED, PAGE_STYLES } from "../../const";
import "@material/web/button/text-button";
import "../../components/card-layout";
import "../../components/share-url";

@customElement("thank-you-page")
export class ThankYouPage extends LitElement {
  render() {
    return html`
      <card-layout header="Thank you!" alignment="center">
        <div class="casita" slot="header-image">
          <img
            src="./images/casita/heart.gif"
            alt="Casita mascot with heart eyes expressing gratitude"
          />
        </div>
        <div class="card-content" slot="content">
          <p>
            Thanks to your help, we are one step closer to making voice
            assistants more accurate and accessible to everyone. Also, feel free
            to record more samples.
          </p>
          <p>
            <strong>Share this with your friends and family.</strong>
            The more we get, the better it becomes!
            <share-url></share-url>
          </p>
        </div>
        <div class="card-actions" slot="actions">
          <md-text-button has-icon trailing-icon @click=${this.restart}>
            Record another sample ${ICON_CHEVRON_SLOTTED}
          </md-text-button>
        </div>
      </card-layout>
    `;
  }

  restart() {
    return (window.location.href = window.location.href.replace(
      window.location.hash,
      "",
    ));
  }

  static styles = [
    PAGE_STYLES,
    css`
      share-url {
        display: block;
        margin-top: 16px;
      }
    `,
  ];
}
