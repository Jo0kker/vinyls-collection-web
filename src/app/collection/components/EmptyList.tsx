import { BookmarkSlashIcon } from '@heroicons/react/20/solid'

export function EmptyList() {
    return (
        <article className="my-auto flex w-full flex-1 flex-col items-center justify-center rounded-lg bg-gray-100 p-3 text-gray-700">
            <BookmarkSlashIcon className="mb-3 h-6" />
            <p className="text-lg font-semibold ">Aucun vinyl dans cette collection</p>
            <p className="text-gray-800">pour le moment</p>
        </article>
    )
}
