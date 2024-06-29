import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "../../components/card-layout";
import { WAKE_WORDS } from "../../const";

@customElement("landing-page")
export class LandingPage extends LitElement {
  @property() public selectWakeWord!: (wakeWord: string) => void;

  render() {
    return html`
      <card-layout header="Wake Word Collective">
        <div class="card-content">
          <p>
            With
            <a href="https://www.home-assistant.io" target="_blank"
              >Home Assistant</a
            >
            we set the goal to let anyone control their home in their own
            language with a privacy focused voice assistant. We have developed
            multiple local technologies to make this possible. One of them is a
            novel wake word engine,
            <a href="https://github.com/kahrendt/microWakeWord" target="_blank"
              >microWakeWord</a
            >, that is open source and runs on cheap hardware.
          </p>
          <p>
            It is important that voice assistants only listen when a user says
            the wake word, but this is not an easy task! To increase the
            accuracy of microWakeWord, we need recordings from people saying
            wake words from all over the world.
          </p>
          <p>
            This website allows you to record yourself with your phone or
            computer and contribute them to the collective.
          </p>
        </div>
        <md-list>
          ${Object.entries(WAKE_WORDS).map(
            ([key, label]) => html`
              <md-list-item
                type="button"
                @click=${() => {
                  this.selectWakeWord(key);
                }}
              >
                <div slot="headline">
                  Help record samples for “<i>${label}</i>”
                </div>
                <svg
                  slot="end"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                  />
                </svg>
              </md-list-item>
            `,
          )}
        </md-list>
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
  `;
}
