import React, {
    useState,
    useRef,
    useEffect,
    FC,
    ReactElement,
    PropsWithChildren,
    cloneElement
} from 'react'
import { cn } from '@/utils/classNames'

interface AccordionItemProps {
    isOpen: boolean
    onToggle: () => void
    title: string
    className?: string
    contentClassName?: string
}

export const AccordionItem = ({
    isOpen,
    onToggle,
    title,
    children,
    className,
    contentClassName
}: PropsWithChildren<AccordionItemProps>) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<string>('0px')

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`)
        } else {
            setHeight('0px')
        }
    }, [isOpen, children])

    return (
        <div className={cn('rounded-t-xl border-2 border-purple-900', className)}>
            <button
                className={' w-full rounded-t-lg bg-gray-200 py-2 text-left'}
                onClick={onToggle}
            >
                {title}
            </button>
            <div
                ref={contentRef}
                className={contentClassName}
                style={{
                    maxHeight: height,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease'
                }}
            >
                {children}
            </div>
        </div>
    )
}

interface AccordionProps {
    openIndex: number | null
    onToggle: (index: number) => void
}

export const Accordion = ({ children, openIndex, onToggle }: PropsWithChildren<AccordionProps>) => {
    return (
        <div>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return cloneElement(child as ReactElement<any>, {
                        isOpen: openIndex === index,
                        onToggle: () => onToggle(index),
                        title: child.props.title || `Item ${index + 1}` // Make sure title prop is passed to each child
                    })
                }
                return child
            })}
        </div>
    )
}
