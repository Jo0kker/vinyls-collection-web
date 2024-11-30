export function prefixImage(image?: string) {
    return image?.startsWith('http')
        ? image
        : !!image?.length
          ? process.env.NEXT_PUBLIC_API_URL + image
          : 'https://minio-s0o448og8cs4884cg0wccg8c.54.37.82.33.sslip.io/vinyl-collection/default_image_vinyl.png'
}
