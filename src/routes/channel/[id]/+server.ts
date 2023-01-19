// MOVE TO VIDEOS TAB WHEN SURFING CHANNEL AS DEFAULT
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET:RequestHandler = async ({params}) => {
    throw redirect(302,`${params.id}/latest`)
}
