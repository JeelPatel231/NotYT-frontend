// MOVE TO VIDEOS TAB WHEN SURFING CHANNEL AS DEFAULT

export async function GET({params}) {
    return {
        status: 302,
        headers:{
            location: `${params.id}/latest`
        }
    };
}