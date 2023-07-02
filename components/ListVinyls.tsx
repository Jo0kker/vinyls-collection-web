import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { useCallback } from 'react';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { showToast } from '@utils/utils';
import axiosApiInstance from '@services/interceptorService';
import loading from '@assets/lottieJson/88944-vinyl-loading.json';

import type { Dispatch, SetStateAction } from 'react';
import type { CollectionVinyl, Trade, Search } from '@definitions/index';

type VinylCollectionState = CollectionVinyl | Search | Trade;

const ListVinyls = ({
    collectionVinylsDiff,
    setCollectionVinylsDiff = () => [],
    isLoadingCollectionVinyls
}: {
    collectionVinylsDiff: VinylCollectionState[];
    setCollectionVinylsDiff?: Dispatch<
        SetStateAction<Array<CollectionVinyl | Search | Trade>>
    >;
    isLoadingCollectionVinyls: boolean;
}) => {
    const deleteVinyl = useCallback(
        (collectionId: number, collectionVinylId: number) => {
            setCollectionVinylsDiff(
                collectionVinylsDiff.filter(
                    (vinyl: CollectionVinyl | Search | Trade) =>
                        vinyl.id !== collectionVinylId
                )
            );

            axiosApiInstance
                .delete(
                    `/collections/${collectionId}/collectionVinyl/${collectionVinylId}`
                )
                .then(() => {
                    // remove the vinyl from the list
                    showToast('success', 'Vinyl supprimé de la collection');
                })
                .catch(() => {
                    showToast('error', 'Une erreur est survenue');
                    // if error, add the vinyl back to the list
                    setCollectionVinylsDiff(collectionVinylsDiff);
                });
        },
        [collectionVinylsDiff, setCollectionVinylsDiff]
    );

    return (
        <>
            {isLoadingCollectionVinyls ? (
                <div className={'flex justify-center'}>
                    <Lottie
                        animationData={loading}
                        className={'opacity-40 w-10'}
                    />
                </div>
            ) : (
                <div
                    className={
                        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2'
                    }
                >
                    {collectionVinylsDiff.length === 0 ? (
                        <div className={'text-center'}>
                            <p className={''}>Aucun vinyle</p>
                        </div>
                    ) : (
                        collectionVinylsDiff.map(
                            (
                                collectionVinylItem:
                                    | CollectionVinyl
                                    | Trade
                                    | Search
                            ) => (
                                <Link
                                    href={`/vinyls/${collectionVinylItem.vinyl_id}`}
                                    key={collectionVinylItem.id}
                                    className={
                                        'grid grid-cols-[2fr_3fr_1fr] m-1 border border-gray-300 rounded border-4 hover:bg-gray-400'
                                    }
                                >
                                    <Image
                                        src={
                                            collectionVinylItem.vinyl.image_path
                                        }
                                        alt={collectionVinylItem.vinyl.label}
                                        width={100}
                                        height={100}
                                        className={
                                            'cursor-pointer h-[100px] object-cover h-full'
                                        }
                                    />
                                    <div className={'grid grid-rows-3 mx-3'}>
                                        <h2
                                            className={
                                                'text-fuchsia-80 font-bold text-lg truncate'
                                            }
                                        >
                                            {collectionVinylItem.vinyl.label}
                                        </h2>
                                        <h3
                                            className={
                                                'text-fuchsia-800 text-sm truncate'
                                            }
                                        >
                                            {collectionVinylItem.vinyl.artist}
                                        </h3>
                                        <p className={'font-light text-xs'}>
                                            {
                                                collectionVinylItem.vinyl
                                                    .year_released
                                            }
                                        </p>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <button
                                            onClick={event => {
                                                event.preventDefault();
                                                if (
                                                    'collection_id' in
                                                    collectionVinylItem
                                                ) {
                                                    deleteVinyl(
                                                        collectionVinylItem.collection_id,
                                                        collectionVinylItem.id
                                                    );
                                                } else {
                                                }
                                            }}
                                            className={'py-1 px-2'}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className={'text-fuchsia-800'}
                                                size={'sm'}
                                            />
                                        </button>
                                    </div>
                                </Link>
                            )
                        )
                    )}
                </div>
            )}
        </>
    );
};

export default ListVinyls;
