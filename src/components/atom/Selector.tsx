import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Options = {
    id?: number
    name?: string
}

type Props = {
    options: Options[]
    label?: string
}

export default function Selector({ options, label }: Props) {
    const [selected, setSelected] = useState(options[0])

    return (
        <select
            id="underline_select"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
        >
            {options.map(option => (
                <option key={option.id}>{option.name}</option>
            ))}
        </select>
    )
}
