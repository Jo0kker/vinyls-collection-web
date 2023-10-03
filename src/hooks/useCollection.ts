import { useMutation } from '@tanstack/react-query'

import { getSession } from '@/utils/authOptions'
import { fetchAPI } from '@/utils/fetchAPI'

export const useCollection = () => {
    return useMutation({
        mutationFn: (name: string) => {
            return fetchAPI('/collections', {
                method: 'POST',
                withSession: true,
                body: JSON.stringify({
                    name
                })
            })
        }
    })
}
