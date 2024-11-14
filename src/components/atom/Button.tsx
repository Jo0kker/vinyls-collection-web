import type { ComponentProps, PropsWithChildren } from 'react'

import { cn } from '@/utils/classNames'

type ButtonType = 'submit' | 'reset' | 'button' | 'no_border'

type ButtonProps = {
    type?: ButtonType
    buttonClassName?: string
    className?: string
    children?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export const Button = ({ buttonClassName, className, children, type, disabled, ...props }: ButtonProps) => {
    if (type === 'submit' || type === 'reset' || type === 'no_border') {
        return (
            <button
                type={type === 'no_border' ? 'button' : type}
                disabled={disabled}
                {...props}
                className={cn(
                    'w-full rounded bg-fuchsia-800 px-3 py-3 font-body text-white sm:w-2/5 xl:w-auto xl:px-6',
                    'disabled:bg-gray-400 disabled:cursor-not-allowed',
                    className
                )}
            >
                {children}
            </button>
        )
    } else {
        return (
            <div className={cn('flex content-center justify-center', className)}>
                <button 
                    type={type}
                    disabled={disabled}
                    {...props} 
                    className={cn(
                        'rounded-3xl border border-black px-4 py-2',
                        'disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed',
                        buttonClassName
                    )}
                >
                    {children}
                </button>
            </div>
        )
    }
}
