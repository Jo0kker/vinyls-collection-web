import { useEffect, useState, useMemo } from 'react';
import { useBearStore } from '@store/useBearStore';
import type { FunctionComponent } from 'react';
import DesktopMenu from '@components/menu/Desktop';
import type { User } from '@definitions/User';
import MobileMenu from '@components/menu/Mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompactDisc,
    faUserMusic,
    faAlbumCollection,
    faComment,
    faUser,
    faCog
} from '@fortawesome/pro-light-svg-icons';

export type MenuItem = {
    user: User | null;
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
    menuItems: {
        name: string;
        href: string;
        icon: JSX.Element;
    }[];
    userMenuItems: {
        name: string;
        href: string;
        icon: JSX.Element;
    }[];
};

const NavBar: FunctionComponent = () => {
    const user = useBearStore(state => state.user);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState<
        { name: string; href: string; icon: JSX.Element }[]
    >([]);
    // const user = useQueryClient().getQueryData<User>(["me"]);

    const menuItemsLogin = useMemo(
        () => [
            {
                name: 'Les vinyles',
                href: '/vinyls',
                icon: (
                    <FontAwesomeIcon icon={faCompactDisc} className={'mr-2'} />
                )
            },
            {
                name: 'Les collectionneurs',
                href: '/collector',
                icon: <FontAwesomeIcon icon={faUserMusic} className={'mr-2'} />
            },
            {
                name: 'Votre espace collectionneur',
                href: '/collection',
                icon: (
                    <FontAwesomeIcon
                        icon={faAlbumCollection}
                        className={'mr-2'}
                    />
                )
            },
            {
                name: 'Forum',
                href: '/#',
                icon: <FontAwesomeIcon icon={faComment} className={'mr-2'} />
            }
        ],
        []
    );

    const menuItemsNotLogin = useMemo(
        () => [
            {
                name: 'Les vinyles',
                href: '/vinyls',
                icon: (
                    <FontAwesomeIcon icon={faCompactDisc} className={'mr-2'} />
                )
            },
            {
                name: 'Les collectionneurs',
                href: '/collector',
                icon: <FontAwesomeIcon icon={faUserMusic} className={'mr-2'} />
            },
            {
                name: 'Forum',
                href: '/#',
                icon: <FontAwesomeIcon icon={faComment} className={'mr-2'} />
            }
        ],
        []
    );

    const userMenuItems = [
        {
            name: 'Mon profil',
            href: '/#',
            icon: <FontAwesomeIcon icon={faUser} className={'mr-2'} />
        },
        {
            name: 'Paramètres',
            href: '/#',
            icon: <FontAwesomeIcon icon={faCog} className={'mr-2'} />
        }
    ];

    useEffect(() => {
        if (user) {
            setMenuItems(menuItemsLogin);
        } else {
            setMenuItems(menuItemsNotLogin);
        }
    }, [user, menuItemsLogin, menuItemsNotLogin]);

    return (
        <>
            <DesktopMenu
                user={user}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                menuItems={menuItems}
                userMenuItems={userMenuItems}
            />
            <MobileMenu
                user={user}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                menuItems={menuItems}
                userMenuItems={userMenuItems}
            />
        </>
    );
};

export default NavBar;
