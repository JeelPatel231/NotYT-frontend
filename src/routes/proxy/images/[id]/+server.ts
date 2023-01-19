// A SIMPLE PROXY TO AVOID COOKIES FROM IMAGE PROVIDER

import type { RequestHandler } from "@sveltejs/kit"

export const GET:RequestHandler = async ({params}) => {
    const k = await fetch(`https://img.youtube.com/vi/${params.id}/mqdefault.jpg`)

    return new Response(k.body)
}