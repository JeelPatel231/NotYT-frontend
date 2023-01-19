import type { RequestHandler } from "@sveltejs/kit";

// A SIMPLE PROXY TO AVOID CORS AND ALSO USE CORS-LESS SERVERS WITHOUT PAIN
export const GET:RequestHandler = async ({url}) => {
    // assigning url.host just doesnt work, i have tried it
    console.log(url.href)
    let INVIDIOUS_ENDPOINT:string = url.href.replace(`${url.protocol}//${url.host}/proxy/`,'');

    (INVIDIOUS_ENDPOINT.includes("?")) ? INVIDIOUS_ENDPOINT += "&" : INVIDIOUS_ENDPOINT+= "?";
    INVIDIOUS_ENDPOINT += "hl=en-US";
    
    const k = await fetch(INVIDIOUS_ENDPOINT,{
        headers:{"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"}
    })

    return new Response(k.body)
}