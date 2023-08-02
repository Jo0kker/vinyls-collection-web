import { cn } from '@/utils/classNames'

export default function Announcement() {
    /** @todo - build stats badges here */
    const badges = [
        { label: '3878 collectionneurs', color: 'text-orange-500' },
        { label: '13488 collections', color: 'text-green-500' },
        { label: '696766 disques', color: 'text-blue-400' }
    ]

    return (
        <article className="flex justify-between gap-4 rounded-lg bg-black/10 px-5 py-3 shadow-md">
            <p className="font-medium text-red-500">
                <span className="lg:hidden ">Le site fait peau neuve!</span>
                <span className="hidden lg:inline ">
                    Vous l&apos;attendiez tous la nouvelle version du site est disponible.
                </span>
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
