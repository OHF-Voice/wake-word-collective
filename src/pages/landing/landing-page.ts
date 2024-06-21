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
            The Open Home Foundation is working on a privacy focused voice
            assistant. We have developed a novel wake word engine,
            microWakeWord, that runs on cheap hardware.
          </p>
          <p>
            It is important to us that voice assistants works for everyone. To
            ensure this, we are creating a audio set of people from all over the
            world saying the wake word under different circumstances.
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
