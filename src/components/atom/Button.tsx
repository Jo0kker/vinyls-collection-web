import type { ComponentProps, PropsWithChildren } from 'react'

import { cn } from '@/utils/classNames'

type ButtonProps = ComponentProps<'button'> & {
    type?: ComponentProps<'button'>['type'] | 'reset'
}

export const Button = (props: PropsWithChildren<Partial<ButtonProps>>) => {
    if (props.type === 'submit' || props.type === 'reset') {
        return (
            <button
                {...props}
                className={cn(
                    'w-full rounded bg-fuchsia-800 px-3 py-3 font-body text-white sm:w-2/5 xl:w-auto xl:px-6',
                    props.className
                )}
            >
                {props.children}
            </button>
        )
    } else {
        return (
            <div className={cn('flex content-center justify-center', props.className)}>
                <button {...props} className={cn('rounded-3xl border border-black px-4 py-2')}>
                    {props.children}
                </button>
            </div>
        )
    }
}
