import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { FINAL_HOST } from "../../store/store";

export const load:PageLoad = async ({ fetch, url }) => {
    const videoId = url.searchParams.get('v')
    const video_res = await fetch(`${get(FINAL_HOST)}/api/v1/videos/${videoId}`);
    const comments_res = await fetch(`${get(FINAL_HOST)}/api/v1/comments/${videoId}`);

    const video_data = await video_res.json();
    const comments_data = await comments_res.json();
    

    return {
        video_data,
        comments_data,
        continuation: comments_data.continuation,
    }
}