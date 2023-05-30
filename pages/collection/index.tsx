import { useEffect, useState } from 'react';
import SideBar from '@components/SideBar';
import { useBearStore } from '@store/useBearStore';
import axiosApiInstance from '../../services/interceptorService';
import type { CollectionVinyl } from '@types/CollectionVinyl';
import type { AxiosError, AxiosResponse } from 'axios';
import ListVinyls from '@components/ListVinyls';
import { Button } from '@components/Button';
import SlideOvers from '@components/SlideOvers';
import type { FormikValues } from 'formik';
import { showToast } from '@utils/utils';

export function getServerSideProps (context: any) {
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
    const [collections, setCollections] = useState<{ [key: string]: any }>([]);
    const [collectionVinyls, setCollectionVinyls] = useState<CollectionVinyl[]>(
        []
    );
    const [searchPage, setSearchPage] = useState(1);
    const [searchData, setSearchData] = useState<{
    title: string;
    artist: string;
    year: string;
  }>({
      title: '',
      artist: '',
      year: '',
  });
    const [isLoadingCollectionVinyls, setIsLoadingCollectionVinyls] =
    useState(true);
    const [vinylSearch, setVinylSearch] = useState([]);
    const [slideIsOpen, setSlideIsOpen] = useState(false);
    const user = useBearStore((state) => state.user);

    const getAllCollections = async () => {
        if (user) {
            const reqCollectionVinyl = await axiosApiInstance.get(
                `/users/${user.id}/collections`
            );
            // add search and trades to collections
            setCollections([
                { id: -1, name: 'Recherche', type: 'search' },
                { id: -2, name: 'A échanger', type: 'trade' },
                ...reqCollectionVinyl.data.data,
            ]);
            setCollectionShow(reqCollectionVinyl.data.data[0].id);
        }
    };

    const getCollectionVinyls = () => {
        setIsLoadingCollectionVinyls(true);
        if (user) {
            if (collectionShow === -1) {
                // search
                axiosApiInstance
                    .get(`/users/${user.id}/searches?include=vinyl`)
                    .then((res: AxiosResponse) => {
                        setCollectionVinyls(res.data.data);
                        setIsLoadingCollectionVinyls(false);
                    });
            } else if (collectionShow === -2) {
                // trade
            } else {
                axiosApiInstance
                    .get(`/collections/${collectionShow}/collectionVinyl?include=vinyl`)
                    .then((res: AxiosResponse) => {
                        setCollectionVinyls(res.data.data);
                        setIsLoadingCollectionVinyls(false);
                    });
            }
        }
    };

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
        getAllCollections().then(() => {});
    }, [user]);

    useEffect(() => {
        if (collectionShow) {
            getCollectionVinyls();
        }
    }, [collectionShow]);

    return (
        <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
            <div
                className={'flex flex-row justify-center font-bold text-2xl mt-6 mb-4'}
            >
                <span className={'mr-3 text-emerald-500'}>//</span>
                <h1 className={'text-fuchsia-800'}>Gestion de vos collections</h1>
                <span className={'ml-3 text-orange-400'}>//</span>
            </div>
            <div className={'flex flex-col sm:flex-row'}>
                <SideBar
                    navItems={collections}
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
