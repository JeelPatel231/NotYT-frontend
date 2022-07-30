// A SIMPLE PROXY TO AVOID CORS AND ALSO USE CORS-LESS SERVERS WITHOUT PAIN

export const GET = async ({url}) => {
    // assigning url.host just doesnt work, i have tried it
    let INVIDIOUS_ENDPOINT:string = url.href.replace(`${url.protocol}//${url.host}/proxy/`,'');

    (INVIDIOUS_ENDPOINT.includes("?")) ? INVIDIOUS_ENDPOINT += "&" : INVIDIOUS_ENDPOINT+= "?";
    INVIDIOUS_ENDPOINT += "hl=en-US";
    
    console.log(INVIDIOUS_ENDPOINT)

    const k = await fetch(INVIDIOUS_ENDPOINT,{
        headers:{"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"}
    })
    return {
        status:k.status,
        body:k.body,
    }
}