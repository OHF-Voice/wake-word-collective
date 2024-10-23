import { css, svg } from "lit";

export const WAKE_WORDS: Record<string, string> = {
  ok_nabu: "Okay, Nabu",
};

export const ICON_CHEVRON_SLOTTED = svg`
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
`;

export const ICON_CHECK_SLOTTED = svg`
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
  </svg>
`;

export const ICON_COPY_SLOTTED = svg`
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
  </svg>
`;

export const PAGE_STYLES = css`
  a {
    color: var(--md-sys-color-primary);
  }

  strong {
    font-weight: 600;
  }

  ol li:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  p:first-child {
    margin-top: 0;
  }
`;
