// A SIMPLE PROXY TO AVOID CORS AND ALSO USE CORS-LESS SERVERS WITHOUT PAIN

export const GET = async ({params}) => {
    const k = await fetch(`${`https://img.youtube.com/vi/${params.id}/mqdefault.jpg`}`)
    return {
        status:k.status,
        body:k.body,
    }
}