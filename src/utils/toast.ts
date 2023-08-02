// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast'

export function showToast(type: string, message: string, icon?: string) {
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
