import { redirect } from 'next/navigation'

type CollectionPageProps = {
    params: {
        userId: string
    }
}

export default function CollectionPage({ params }: CollectionPageProps) {
    const userId: number = parseInt(params.userId)

    redirect(`/users/${userId}/collection/-1`)
}
