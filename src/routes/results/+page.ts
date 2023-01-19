import { FINAL_HOST } from "../../store/store"
import { get } from "svelte/store";
import type { PageLoad } from "./$types"

export const load:PageLoad = async ({ fetch, url }) => {
    const res = await fetch(`${get(FINAL_HOST)}/api/v1/search${url.search}`);
    const data = await res.json();
    return {
        data: data,
        searchTerm: url.searchParams.get("search_query")
    }
}