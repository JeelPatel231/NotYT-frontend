import { type Writable, writable } from "svelte/store";

export const API_ENDPOINT:Writable<string> = writable("https://tube.nocturn9x.space")

