import { svg } from "lit";

export const WAKE_WORDS: Record<string, string> = {
  ok_nabu: "Okay, Nabu",
};

export const ICON_CHEVRON_SLOTTED = svg`
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
`;
