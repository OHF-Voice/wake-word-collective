import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import "@material/web/checkbox/checkbox";
import "@material/web/button/text-button";
import "@material/web/textfield/filled-text-field";
import "../../components/card-layout";
import { WAKE_WORDS } from "../../const";
import { createRecorder } from "../../util/recorder";
import type { Recorder } from "../../util/recorder";

@customElement("consent-page")
export class ConsentPage extends LitElement {
  @property() public giveConsent!: (
    recorder: Recorder,
    description: string,
  ) => void;
  @property() public cancelConsent!: () => void;

  @property() public wakeWord!: string;
  @property() public description!: string;

  @query("md-filled-text-field") private descriptionField!: HTMLInputElement;

  @query("md-checkbox") private consentCheckbox!: HTMLInputElement;

  @state() private givingConsent = false;

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.descriptionField.value = this.description;
  }

  render() {
    return html`
      <card-layout header="Before we start recording">
        <div class="card-content">
          <p>
            Selected wake word: ${WAKE_WORDS[this.wakeWord]}&nbsp;(<a
              href="#"
              @click=${this.cancelConsent}
              >change</a
            >)
          </p>
          <p class="consent">
            <b>Consent</b><br />
            We want to make all recordings publicly available without
            restrictions, for which we need your consent.
          </p>
          <label class="formfield">
            <md-checkbox
              touch-target="wrapper"
              .disabled=${this.givingConsent}
            ></md-checkbox>
            <span>
              I agree to the
              <a href="./terms.html" target="_blank">
                Wake Word Collective terms
              </a>
            </span>
          </label>
          <p>
            <b>Description (optional)</b><br />
            Could you provide us with a brief description of yourself. We will
            use this to balance the training of the wake word.
          </p>
          <md-filled-text-field
            label="Description"
            .disabled=${this.givingConsent}
          ></md-filled-text-field>
          <div class="helper">Example: Dutch male, 40s</div>
        </div>
        <div class="card-actions">
          <span></span>
          <md-text-button
            @click=${this.submitConsent}
            .disabled=${this.givingConsent}
          >
            Start recording
          </md-text-button>
        </div>
      </card-layout>
    `;
  }

  async submitConsent() {
    if (!this.consentCheckbox.checked) {
      this.shadowRoot!.querySelector("md-checkbox")!.focus();
      alert("Please agree to the Wake Word Collective terms");
      return;
    }

    this.givingConsent = true;
    const recorder = await createRecorder(this.wakeWord);

    if (!recorder) {
      this.givingConsent = false;
      return;
    }

    this.giveConsent(
      recorder,
      this.shadowRoot!.querySelector("md-filled-text-field")!.value,
    );
  }

  static styles = css`
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
  `;
}
