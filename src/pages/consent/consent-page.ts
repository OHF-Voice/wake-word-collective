import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import "@material/web/checkbox/checkbox";
import "@material/web/button/text-button";
import "@material/web/textfield/filled-text-field";
import "../../components/card-layout";
import { WAKE_WORDS, ICON_CHEVRON_SLOTTED, PAGE_STYLES } from "../../const";
import { preloadImage } from "../../util/preload";

@customElement("consent-page")
export class ConsentPage extends LitElement {
  @property() public giveConsent!: (description: string) => void;
  @property() public cancelConsent!: () => void;

  @property() public wakeWord!: string;
  @property() public description!: string;

  @query("md-filled-text-field") private descriptionField!: HTMLInputElement;

  @query("md-checkbox") private consentCheckbox!: HTMLInputElement;

  @state() private givingConsent = false;

  firstUpdated(changedProperties: PropertyValues) {
    preloadImage("./images/demo.gif");

    super.firstUpdated(changedProperties);
    this.descriptionField.value = this.description;
  }

  render() {
    if (this.givingConsent) {
      return html`
        <card-layout header="Checking audio device">
          <div class="card-content" slot="card-content">
            <i>Please wait…</i>
          </div>
        </card-layout>
      `;
    }

    return html`
      <card-layout header="Some details">
        <div class="card-content" slot="content">
          <p>
            Selected wake word:
            <strong>${WAKE_WORDS[this.wakeWord]}</strong>
            ${Object.keys(WAKE_WORDS).length > 1
              ? html`
                  &nbsp;(<a href="#" @click=${this.cancelConsent}>change</a>)
                `
              : ""}
          </p>
          <p class="consent">
            <strong>Consent</strong><br />
            We want to make all recordings publicly available without
            restrictions, for which we need your consent.
          </p>
          <label class="formfield">
            <md-checkbox touch-target="wrapper"></md-checkbox>
            <span>
              I agree to the
              <a href="./terms.html" target="_blank">
                Wake Word Collective terms
              </a>
            </span>
          </label>
          <p>
            <strong>Primary language</strong><br />
            What language are you most comfortable with? This will help us make
            it work better for that accent.
          </p>
          <md-filled-text-field label="Language"></md-filled-text-field>
          <div class="helper">Example: Dutch</div>
        </div>
        <div class="card-actions" slot="actions">
          <span></span>
          <md-text-button has-icon trailing-icon @click=${this.submitConsent}>
            Submit ${ICON_CHEVRON_SLOTTED}
          </md-text-button>
        </div>
      </card-layout>
    `;
  }

  async submitConsent() {
    if (!this.consentCheckbox.checked) {
      this.consentCheckbox.focus();
      alert("Please agree to the Wake Word Collective terms");
      return;
    }

    const description = this.descriptionField.value;
    if (!description) {
      this.descriptionField.focus();
      alert("Please fill in your primary language");
      return;
    }

    this.givingConsent = true;
    this.giveConsent(description);
  }

  static styles = [
    PAGE_STYLES,
    css`
      a {
        color: var(--md-sys-color-primary);
      }

      p.consent {
        margin-bottom: 0;
      }

      md-checkbox {
        min-width: 18px;
      }

      md-filled-text-field {
        display: block;
        margin-top: 16px;
      }

      label.formfield {
        display: flex;
        align-items: center;
        padding-right: 8px;
      }

      .helper {
        font-size: 12px;
        display: block;
        padding-left: 16px;
      }
    `,
  ];
}
