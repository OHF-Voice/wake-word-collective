import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ICON_CHEVRON_SLOTTED } from "../../const";
import "@material/web/button/text-button";
import "../../components/card-layout";

@customElement("thank-you-page")
export class ThankYouPage extends LitElement {
  render() {
    return html`
      <card-layout header="Thank you!">
        <div class="card-content">
          <p>
            Thanks to your help, we are one step closer to making voice
            assistants more accurate and accessible to everyone. Also, feel free
            to record more samples.
          </p>
          <p>
            <strong>Share this with your friends and family.</strong>
            The more we get, the better it becomes!
          </p>
        </div>
        <div class="card-actions">
          <span></span>
          <md-text-button has-icon trailing-icon @click=${this.restart}>
            Record another sample ${ICON_CHEVRON_SLOTTED}
          </md-text-button>
        </div>
      </card-layout>
    `;
  }

  restart() {
    // replace url with url withouth hash
    return (window.location.href = window.location.href.replace(
      window.location.hash,
      "",
    ));
  }
}
