import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { useCallback } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { showToast } from '@utils/utils';
import axiosApiInstance from '@services/interceptorService';
import loading from '@assets/lottieJson/88944-vinyl-loading.json';

import type { Dispatch, SetStateAction } from 'react';
import type { CollectionItem } from '@definitions/index';

const ListVinyls = ({
    collectionVinylsDiff,
    setCollectionVinylsDiff = () => [],
    isLoadingCollectionVinyls,
    addVinylAction,
    listDisplay = 'Grid'
}: {
  collectionVinylsDiff: CollectionItem[];
  setCollectionVinylsDiff?: Dispatch<SetStateAction<Array<CollectionItem>>>;
  isLoadingCollectionVinyls: boolean;
  addVinylAction: Dispatch<SetStateAction<boolean>> | undefined;
  listDisplay?: 'Grid' | 'List'
}) => {
    const deleteVinyl = useCallback((collectionId: number, collectionVinylId: number) => {
        setCollectionVinylsDiff(collectionVinylsDiff.filter(vinyl => vinyl.id !== collectionVinylId));

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
    }, [collectionVinylsDiff, setCollectionVinylsDiff]);

    return (
        <>
            {isLoadingCollectionVinyls ? (
                <div className={'flex justify-center'}>
                    <Lottie animationData={loading} className={'opacity-40 w-10'} />
                </div>
            ) : (
                <div className={`box-content ${listDisplay === 'List' ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                    {
                        typeof addVinylAction !== 'undefined' && 
                        <div className={ 'grid grid-cols-[1fr] m-1 border border-gray-200 border-dashed rounded border-4 hover:bg-gray-100 text-gray-200/75 hover:text-gray-400 cursor-pointer hover:border-gray-300' }>
                            <div className={'flex justify-center mx-3'} onClick={() => addVinylAction(true)}>
                                <PlusIcon className='w-24 ' />
                            </div>
                        </div>
                    }
                    {
                        collectionVinylsDiff.map(
                            collectionVinylItem => (
                                <Link
                                    href={`/vinyls/${collectionVinylItem.vinyl_id}`}
                                    key={collectionVinylItem.id}
                                    className={
                                        `grid ${listDisplay === 'Grid' ? 'grid-cols-[2fr_3fr_1fr]' : 'grid-cols-[2fr_8fr_1fr]'} m-1 border border-gray-300 rounded border-4 hover:bg-gray-100`
                                    }
                                >
                                    <Image
                                        src={collectionVinylItem.vinyl.image}
                                        alt={collectionVinylItem.vinyl.label}
                                        width={100}
                                        height={100}
                                        className={'cursor-pointer h-[100px] object-cover h-full'}
                                    />
                                    <div className={'grid grid-rows-3 mx-3'}>
                                        <h2
                                            className={'text-fuchsia-80 font-bold text-lg truncate'}
                                        >
                                            {collectionVinylItem.vinyl.label}
                                        </h2>
                                        <h3 className={'text-fuchsia-800 text-sm truncate'}>
                                            {collectionVinylItem.vinyl.artist}
                                        </h3>
                                        <p className={'font-light text-xs'}>
                                            {collectionVinylItem.vinyl.year_released}
                                        </p>
                                    </div>
                                    <div className={`flex flex-col ${listDisplay === 'List' ? 'justify-center' : ''}`}>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                if ('collection_id' in collectionVinylItem) {
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
                    }
                </div>
            )}
        </>
    );
};

export default ListVinyls;
