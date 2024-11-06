import type { FunctionComponent } from 'react'

import {
    faCompactDisc,
    faUserMusic,
    faAlbumCollection,
    faComment
} from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

import Desktop from '@/components/navBar/Desktop'
import Mobile from '@/components/navBar/Mobile'

export type MenuItem = {
    session: Session | null
    links: (isAuth?: boolean, userId?: number) => Link[]
}

interface Link {
    name: string
    href: string
    icon: JSX.Element
}
const LINKS = (isAuth?: boolean, userId?: number): Link[] => [
    {
        name: 'Les vinyles',
        href: '/vinyls',
        icon: <FontAwesomeIcon icon={faCompactDisc} color="purple" className="mr-2" size="lg" />
    },
    {
        name: 'Les collectionneurs',
        href: '/collector',
        icon: <FontAwesomeIcon icon={faUserMusic} color="purple" className="mr-2" size="lg" />
    },
    ...(isAuth
        ? [
              {
                  name: 'Votre espace collectionneur',
                  href: `/users/${userId}/collection`,
                  icon: (
                      <FontAwesomeIcon
                          icon={faAlbumCollection}
                          color="purple"
                          className="mr-2"
                          size="lg"
                      />
                  )
              }
          ]
        : []),
    {
        name: 'Forum',
        href: '/forum',
        icon: <FontAwesomeIcon icon={faComment} color="purple" className="mr-2" size="lg" />
    }
]

const NavBar: FunctionComponent = () => {
    const session = useSession()

    return (
        <div className="max-w-screen-xl p-6 mx-auto">
            <Desktop session={session.data} links={LINKS} />
            <Mobile session={session.data} links={LINKS} />
        </div>
    )
}

export default NavBar
