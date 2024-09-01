// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast'

type showToastProps = {
    type: 'success' | 'error'
    message: string | JSX.Element
    icon?: string
}

export function showToast({ type, message, icon }: showToastProps) {
    toast(message, {
        position: 'top-left',
        duration: 3000,
        icon: icon,
        style: {
            background: type === 'success' ? '#5cb85c' : '#d9534f',
            color: '#fff'
        }
    })
}
