import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}>;

export const Button = (props: ButtonProps) => {
    if (props.type === 'submit') {
        return (
            <button
                className={`text-white bg-fuchsia-800 rounded px-3 py-3 w-full sm:w-2/5 font-roboto xl:w-auto xl:px-6 ${props.className}`}
                type={props.type}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        );
    } else if (props.type === 'reset') {
        return (
            <button
                className={
                    'text-white bg-fuchsia-800 rounded px-3 py-3 w-full sm:w-2/5 font-roboto xl:w-auto xl:px-6'
                }
                type={props.type}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        );
    } else {
        return (
            <div
                className={`flex content-center justify-center ${props.className}`}
            >
                <button
                    className="border border-black py-2 px-4 rounded rounded-3xl"
                    onClick={props.onClick}
                >
                    {props.children}
                </button>
            </div>
        );
    }
};
