import { User } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'

export const fetchUserData = async (userId: number) => {
    try {
        const response = await fetchAPI('/users/search', {
            method: 'POST',
            body: JSON.stringify({
                search: {
                    filters: [
                        {
                            field: 'id',
                            operator: '=',
                            value: userId
                        }
                    ],
                    limit: 1
                }
            })
        })
        return response.data[0] as User
    } catch (err) {
        throw err // Gère l'erreur comme tu le souhaites
    }
}
