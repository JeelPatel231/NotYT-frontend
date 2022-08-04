// A SIMPLE PROXY TO AVOID COOKIES FROM IMAGE PROVIDER

export const GET = async ({params}) => {
    const k = await fetch(`${`https://img.youtube.com/vi/${params.id}/mqdefault.jpg`}`)
    return {
        status:k.status,
        body:k.body,
    }
}