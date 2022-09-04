// MOVE TO VIDEOS TAB WHEN SURFING CHANNEL AS DEFAULT
import { redirect } from '@sveltejs/kit';

export async function GET({params}) {
    throw redirect(302,`${params.id}/latest`)
}
