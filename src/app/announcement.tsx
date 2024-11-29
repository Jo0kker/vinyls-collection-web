import { cn } from '@/utils/classNames'
import { fetchAPI, FetchResponse } from '@/utils/fetchAPI'

export default async function Announcement() {
    const stats: FetchResponse<{
        users: number
        collections: number
        vinyls: number
    }> = await fetchAPI('/stats/global')

    const badges = [
        { label: `${stats.data.users} collectionneurs`, color: 'text-orange-500' },
        { label: `${stats.data.collections} collections`, color: 'text-green-500' },
     
        { label: `${stats.data.vinyls} disques`, color: 'text-blue-400' }
    ]

    return (
        <article className="flex justify-between gap-4 px-5 py-3 rounded-lg shadow-md bg-black/10">
            <p className="font-medium text-red-500">
                <span className="lg:hidden ">Site encore en développement</span>
                <span className="hidden lg:inline ">Site encore en développement.</span>
            </p>

            <div className="hidden space-x-3 lg:block">
                {badges.map(({ label, color }) => (
                    <span
                        key={label}
                        className={cn(
                            color,
                            'font-roboto inline-flex items-center rounded-md bg-black bg-opacity-20 px-3 py-1 text-sm font-medium'
                        )}
                    >
                        {label}
                    </span>
                ))}
            </div>
        </article>
    )
}
