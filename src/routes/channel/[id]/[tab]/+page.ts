import { FINAL_HOST } from "../../../../store/store";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load:PageLoad = async ({ fetch, params }) => {
    const channel_res = await fetch(`${get(FINAL_HOST)}/api/v1/channels/${params.id}`);
    const channel_data = await channel_res.json();
    let tab_data = undefined;
    if(params.tab !== "about"){  // about tab needs channel data and no /about path exists for api
        const tab_res = await fetch(`${get(FINAL_HOST)}/api/v1/channels/${params.id}/${params.tab}`);
        tab_data = await tab_res.json();
    } 
    return{
        channel_data,
        activeTab:params.tab,
        tab_data: tab_data ?? channel_data,
    }
}