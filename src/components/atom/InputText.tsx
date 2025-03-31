import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/pro-duotone-svg-icons'

import { cn } from '@/utils/classNames'

type InputTextProps = {
    value: string
    setValue?: (value: string) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    name: string
    label: string
    type?: string
    className?: string
    inputClassName?: string
    inputStyle?: React.CSSProperties
    labelClassName?: string
    tipClassname?: string
    tipMessage?: string
    required?: boolean
    formikOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    formikOnBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const InputText = ({
    value,
    setValue,
    onChange,
    onBlur,
    name,
    label,
    type = 'text',
    className = '',
    inputClassName,
    inputStyle,
    labelClassName,
    tipClassname,
    tipMessage,
    required = false,
    formikOnChange,
    formikOnBlur,
    placeholder
}: InputTextProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue && setValue(e.target.value)
        onChange && onChange(e)
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(e)
    }

    return (
        <div className={`relative flex flex-col ${className}`}>
            <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <input
                    type={isPassword && showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    onChange={formikOnChange ?? onChangeHandler}
                    onBlur={formikOnBlur ?? onBlurHandler}
                    className={cn(
                        'w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200',
                        inputClassName ?? ''
                    )}
                    placeholder={placeholder ?? ' '}
                    required={required}
                    value={value}
                    style={inputStyle}
                    aria-describedby={name + '_help'}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-5 h-5" />
                    </button>
                )}
            </div>
            {tipMessage && (
                <p id={name + '_help'} className={tipClassname + ' mt-2 text-xs text-gray-500'}>
                    {tipMessage}
                </p>
            )}
        </div>
    )
}
