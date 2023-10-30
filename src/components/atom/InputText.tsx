import React from 'react';

type InputTextProps = {
    value: string,
    setValue: (value: string) => void,
    name: string,
    label: string,
    type?: string,
    className?: string
    inputClassName?: string
    inputStyle?: React.CSSProperties
    labelClassName?: string
    tipClassname?: string,
    tipMessage?: string
}

export const InputText = ({
    value,
    setValue,
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
    return (
      <div className={'relative z-0 ' + className}>
          <input
            type={type ?? 'text'}
            id={name}
            onChange={e => setValue(e.target.value)}
            className={inputClassName + ' block py-1.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-500 focus:outline-none focus:ring-0 focus:border-fuchsia-600 peer'}
            placeholder={' '}
            value={value}
            style={inputStyle}
            aria-describedby={name + '_help'}
          />
          <label
            htmlFor={name}
            className={labelClassName + ' absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-800 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'}
          >
            {label}
          </label>
          {tipMessage && <p id={name + '_help'} className={tipClassname + ' mt-2 text-xs'}>{tipMessage}</p>}
      </div>
    )
}
