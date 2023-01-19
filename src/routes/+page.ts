import { FINAL_HOST } from "../store/store";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load:PageLoad = async ({ fetch }) => {
    const res = await fetch(`${get(FINAL_HOST)}/api/v1/popular`);
    const data = await res.json();
    
    return {
        data // is an array, gets passes as {data:data[]}
    }
}