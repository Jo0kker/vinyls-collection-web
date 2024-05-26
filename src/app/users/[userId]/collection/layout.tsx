import { PropsWithChildren } from 'react'

import ModalItemEdit from '@/app/users/[userId]/collection/components/ModalItemEdit'

const LayoutCollection = ({ children } : PropsWithChildren) => {
    return (
        <div>
            <ModalItemEdit />
            {children}
        </div>
    )
}

export default LayoutCollection
