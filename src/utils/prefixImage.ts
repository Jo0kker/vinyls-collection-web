export function prefixImage(image?: string) {
    return image?.startsWith('http')
        ? image
        : !!image?.length
        ? process.env.NEXT_PUBLIC_API_URL + image
        : 'https://vinyls-collection.fra1.cdn.digitaloceanspaces.com/default_image_vinyl.png'
}
