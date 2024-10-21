import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/icon/icon";
import "../../components/card-layout";
import { WAKE_WORDS, ICON_CHEVRON_SLOTTED, PAGE_STYLES } from "../../const";

@customElement("landing-page")
export class LandingPage extends LitElement {
  @property() public selectWakeWord!: (wakeWord: string) => void;

  render() {
    return html`
      <card-layout header="Wake Word Collective">
        <div class="card-content">
          <p>
            Give us a minute of your time to improve our community-driven,
            privacy-focused voice assistant, and we’ll break big tech’s
            stranglehold on home voice control.
          </p>
          <div class="note">
            <p>
              Specifically, we’re trying to improve our wake word engine, which
              “wakes” the device to listen for more commands. Our open source
              <a
                href="https://github.com/kahrendt/microWakeWord"
                target="_blank"
                >microWakeWord</a
              >
              engine is an incredible, lightweight bit of code but requires
              training with real voices to improve.
            </p>
            <p>
              Everyone’s voice is unique, we need recordings of people of all
              genders, ages, and accents from around the world saying this wake
              word.
            </p>
          </div>
        </div>
        ${Object.entries(WAKE_WORDS).map(
          ([key, label]) => html`
            <div class="card-actions">
              <md-text-button
                has-icon
                trailing-icon
                @click=${() => this.selectWakeWord(key)}
              >
                Help record samples for “${label}” ${ICON_CHEVRON_SLOTTED}
              </md-text-button>
            </div>
          `,
        )}
      </card-layout>
    `;
  }

  static styles = [
    PAGE_STYLES,
    css`
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
    `,
  ];
}
