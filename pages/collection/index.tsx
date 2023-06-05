import { useCallback, useEffect, useState } from 'react';
import SideBar from '@components/SideBar';
import { useBearStore } from '@store/useBearStore';
import axiosApiInstance from '../../services/interceptorService';
import type { CollectionVinyl } from '@definitions/CollectionVinyl';
import type { Collection } from '@definitions/Collection';
import type { AxiosError } from 'axios';
import ListVinyls from '@components/ListVinyls';
import { Button } from '@components/Button';
import SlideOvers from '@components/SlideOvers';
import type { FormikValues } from 'formik';
import { showToast } from '@utils/utils';
import type { GetServerSidePropsContext } from 'next';
import type { DiscogResult } from '@definitions/Discog.js';

export function getServerSideProps (context: GetServerSidePropsContext) {
    const token = context.req.cookies.token;
    const refresh_token = context.req.cookies.refresh_token;

    if (!token || !refresh_token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

const UserCollection = () => {
    const [collectionShow, setCollectionShow] = useState(0);
    const [collectionsList, setCollectionsList] = useState<Collection[]>([]);
    const [collectionVinyls, setCollectionVinyls] = useState<CollectionVinyl[]>([]);
    const [searchPage, setSearchPage] = useState(1);
    const [searchData, setSearchData] = useState({ title: '', artist: '', year: '' });
    const [isLoadingCollectionVinyls, setIsLoadingCollectionVinyls] = useState(true);
    const [vinylSearch, setVinylSearch] = useState<DiscogResult[]>([]);
    const [slideIsOpen, setSlideIsOpen] = useState(false);
    const user = useBearStore((state) => state.user);

    const getAllCollections = useCallback(async () => {
        if (!user) return;

        const reqCollectionVinyl = await axiosApiInstance.get(
            `/users/${user.id}/collections`
        );
        // add search and trades to collections
        setCollectionsList([
            { id: -1, name: 'Recherche', type: 'search' },
            // { id: -2, name: 'A échanger', type: 'trade' },
            ...reqCollectionVinyl.data.data,
        ]);

        setCollectionShow(reqCollectionVinyl.data.data[0].id);
    }, [user]);

    const getCollectionVinyls = useCallback(async () => {
        if (!user || !collectionShow) return;
        setIsLoadingCollectionVinyls(true);        
        // Il faudras rajouter une vérification sur -2 lorsque les échanges seront implémentés
        let url: string;

        if (collectionShow === -1) {
            url = `/users/${user.id}/searches?include=vinyl`;
        } else {
            url = `/collections/${collectionShow}/collectionVinyl?include=vinyl`;
        }

        const response = await axiosApiInstance.get(url);

        setCollectionVinyls(response.data.data);
        setIsLoadingCollectionVinyls(false);
    }, [user, collectionShow]);

    const searchVinyls = async (data: FormikValues) => {
        const reqVinyls = await axiosApiInstance.post(
            `/discogs/search?title=${data.title}&artist=${data.artist}&year=${data.year}&per_page=10&page=${searchPage}`
        );
        setSearchData({
            title: data.title,
            artist: data.artist,
            year: data.year,
        });
        setVinylSearch(reqVinyls.data.results);
    };

    const addVinylToCollection = (idDiscogs: number) => {
        if (user) {
            axiosApiInstance
                .post('/collectionVinyl', {
                    discog_id: idDiscogs,
                    collection_id: collectionShow,
                })
                .then(() => {
                    getCollectionVinyls();
                })
                .catch((err: AxiosError) => {
                    if (err.response?.status === 409) {
                        showToast('error', 'Vinyle déjà présent dans la collection');
                    }
                });
        }
    };

    useEffect(() => {
        getAllCollections();
    }, [getAllCollections]);

    useEffect(() => {
        getCollectionVinyls();
    }, [getCollectionVinyls]);

    return (
        <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
            <div
                className={'flex flex-row justify-center font-bold text-2xl mt-6 mb-4'}
            >
                <span className={'mr-3 text-emerald-500'}>&#47;&#47;</span>
                <h1 className={'text-fuchsia-800'}>Gestion de vos collections</h1>
                <span className={'ml-3 text-orange-400'}>&#47;&#47;</span>
            </div>
            <div className={'flex flex-col sm:flex-row'}>
                <SideBar
                    navItems={collectionsList}
                    activeTab={collectionShow}
                    setActiveTab={setCollectionShow}
                />
                <div className={'flex flex-col flex-1'}>
                    <Button onClick={() => setSlideIsOpen(true)} className={'my-4'}>
            Ajouter un vinyle
                    </Button>
                    <ListVinyls
                        collectionVinylsDiff={collectionVinyls}
                        setCollectionVinylsDiff={setCollectionVinyls}
                        isLoadingCollectionVinyls={isLoadingCollectionVinyls}
                    />
                </div>
                <SlideOvers
                    open={slideIsOpen}
                    setOpen={setSlideIsOpen}
                    searchVinyl={searchVinyls}
                    vinyl={vinylSearch}
                    addVinylToCollection={addVinylToCollection}
                />
            </div>
        </div>
    );
};

export default UserCollection;
