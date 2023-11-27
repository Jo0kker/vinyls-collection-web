import React from 'react'

import { cn } from '@/utils/classNames'

type InputTextProps = {
    value: string | File
    setValue?: (value: string) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    label: string
    type?: string
    className?: string
    inputClassName?: string
    inputStyle?: React.CSSProperties
    labelClassName?: string
    tipClassname?: string
    tipMessage?: string
}

export const InputText = ({
    value,
    setValue,
    onChange,
    name,
    label,
    type,
    className,
    inputClassName,
    inputStyle,
    labelClassName,
    tipClassname,
    tipMessage
}: InputTextProps) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue && setValue(e.target.value)
        onChange && onChange(e)
    }

    return (
        <div className={cn('relative z-0', className)}>
            <input
                type={type ?? 'text'}
                id={name}
                name={name}
                onChange={onChangeHandler}
                className={cn(
                    'peer block w-full appearance-none border-0  border-b-2 bg-transparent px-0 py-1.5 text-sm focus:border-fuchsia-700 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-fuchsia-500',
                    inputClassName ?? 'border-white'
                )}
                placeholder={' '}
                value={value}
                style={inputStyle}
                aria-describedby={name + '_help'}
            />
            <label
                htmlFor={name}
                className={
                    labelClassName +
                    ' text-md absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-fuchsia-800 dark:text-gray-400 peer-focus:dark:text-blue-500'
                }
            >
                {label}
            </label>
            {tipMessage && (
                <p id={name + '_help'} className={tipClassname + ' mt-2 text-xs'}>
                    {tipMessage}
                </p>
            )}
        </div>
    )
}
