export function prefixImage(image?: string) {
    return image?.startsWith('http')
        ? image
        : !!image?.length
        ? process.env.NEXT_PUBLIC_API_URL + image
        : 'https://via.placeholder.com/100x100.png?text=No+Image'
}
