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
        description: string
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

    getChangeLink() {
        if (Object.keys(WAKE_WORDS).length < 2) return;
        return html`&nbsp;(<a href="#" @click=${this.cancelConsent}>change</a
            >)`;
    }

    render() {
        if (this.givingConsent) {
            return html`
                <card-layout header="Checking audio device">
                    <div class="card-content">
                        <i>Please wait...</i>
                    </div>
                </card-layout>
            `;
        }
        return html`
            <card-layout header="Some details">
                <div class="card-content">
                    <p>
                        Selected wake word:
                        <strong>${WAKE_WORDS[this.wakeWord]}</strong>
                        ${this.getChangeLink()}
                    </p>
                    <p class="consent">
                        <b>Consent</b><br />
                        We want to make all recordings publicly available
                        without restrictions, for which we need your consent.
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
                        <b>Primary language</b><br />
                        What language are you most comfortable with? This will
                        help us make it work better for that accent.
                    </p>
                    <md-filled-text-field
                        label="Language"
                    ></md-filled-text-field>
                    <div class="helper">Example: Dutch</div>
                </div>
                <div class="card-actions">
                    <span></span>
                    <md-text-button
                        has-icon
                        trailing-icon
                        @click=${this.submitConsent}
                    >
                        Submit
                        <svg
                            slot="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                            />
                        </svg>
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
        const recorder = await createRecorder(this.wakeWord, description);

        if (!recorder) {
            this.givingConsent = false;
            // restore old value
            await this.updateComplete;
            this.consentCheckbox.checked = true;
            this.descriptionField.value = description;
            return;
        }

        this.giveConsent(recorder, description);
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
