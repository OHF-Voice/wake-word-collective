import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
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
            assistants more accurate and accessible to everyone. Your
            contribution is invaluable to the community.
          </p>
          <p>
            We want to collect a diverse set of voices to make sure that
            everyone can use voice assistants. We would appreciate it if you
            could share this website with your family and friends.
          </p>
        </div>
        <div class="card-actions">
          <span></span>
          <a href="#">
            <md-text-button>Finish</md-text-button>
          </a>
        </div>
      </card-layout>
    `;
  }
}
