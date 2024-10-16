import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { WAKE_WORDS } from "../../const";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/icon/icon";
import "../../components/card-layout";

@customElement("instructions-page")
export class InstructionsPage extends LitElement {
    @property() public startRecording!: () => void;

    @property() public wakeWord!: string;

    render() {
        return html`
            <card-layout header="Before we get started">
                <div class="card-content">
                    <p>
                        We only need you to say two words,
                        <strong>${WAKE_WORDS[this.wakeWord]}</strong>, a couple
                        of times over.
                    </p>

                    <ol>
                        <li>
                            <strong>Place this device down</strong> in the kind
                            of spot you'd put a voice assistant
                        </li>
                        <li>
                            When the <strong>circle turns green</strong> say
                            “${WAKE_WORDS[this.wakeWord]}”
                        </li>
                        <li>
                            Say the wake word while you
                            <strong>walk around the room</strong>.
                        </li>
                        <li>
                            Try speaking <strong>quietly</strong> and
                            <strong>LOUDLY</strong>.
                        </li>
                    </ol>

                    <p>
                        Don’t worry about background noise; it's useful for
                        training
                    </p>
                </div>
                <div class="card-actions">
                    <md-text-button
                        has-icon
                        trailing-icon
                        @click=${this.startRecording}
                    >
                        Let's get started
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

    static styles = css`
        a {
            color: var(--md-sys-color-primary);
        }

        md-list {
            border-radius: 12px;
        }
        svg {
            width: 24px;
        }
        p:last-child {
            margin-bottom: 0;
        }

        .note {
            background-color: #f5f5f5;
            font-size: 0.875rem;
            border-radius: 6px;
            padding: 12px;
            line-height: 1.5;
        }

        .note p:first-of-type {
            margin-top: 0;
        }
    `;
}
