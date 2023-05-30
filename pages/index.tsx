import Head from 'next/head';
import Image from 'next/image';
import { Carousel } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCompactDisc } from '@fortawesome/pro-light-svg-icons';
import { Button } from '@components/Button';
import type { CollectionVinyl } from '../types/CollectionVinyl';
import axiosApiInstance from '../services/interceptorService';
import Link from 'next/link';

export async function getServerSideProps() {
    // get last 6 vinyls
    const reqCollectionVinyl = await axiosApiInstance.get(
        '/collectionVinyl?include=vinyl,collection,collection.user&limit=6'
    );

    const collectionVinyls: CollectionVinyl[] =
    reqCollectionVinyl?.data?.data || [];

    return {
        props: {
            collectionVinyls,
        },
    };
}

export default function Home({
    collectionVinyls,
}: {
  collectionVinyls: CollectionVinyl[];
}) {
    return (
        <div className={'pt-44 sm:pt-0 mt-24 px-4 rounded bg-white flex flex-col'}>
            <Head>
                <title>Vinyls Collection</title>
                <meta name="description" content="Vinyls-collection" />
            </Head>
            <div
                className={
                    'sm:flex sm:flex-row sm:gap-8 md:gap-16 lg:gap-24 sm:relative sm:-top-[63px]'
                }
            >
                <Image
                    src={'https://picsum.photos/300/300?random=1'}
                    alt={'Vinyl du moins'}
                    width={300}
                    height={300}
                    className={
                        'absolute object-cover h-56 w-56 lg:h-72 lg:w-72 border-8 -rotate-12 top-96 left-1/2 transform -translate-x-1/2 translate-y-16 sm:static sm:translate-x-0 sm:translate-y-0 lg:translate-x-12 md:translate-x-8'
                    }
                />
                <div>
                    <h2
                        className={
                            'text-fuchsia-800 text-center text-5xl font-extrabold m-2'
                        }
                    >
                        <span className={'sm:text-white'}>Le vinyl</span>
                        <FontAwesomeIcon icon={faPlus} className={'text-emerald-500 m-1'} />
                        <br />
                        <FontAwesomeIcon icon={faPlus} className={'text-emerald-500 m-1'} />
                        <span>du mois</span>
                    </h2>
                    <h3 className={'font-bold my-2'}>Lorem ipsum dolor sit.</h3>
                    <p className={'leading-5'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur cupiditate dignissimos doloremque exercitationem nihil
            placeat quo sapiente ut vel voluptatem!
                    </p>

                    <div className={'flex flex-row justify-center'}>
                        <Button className={'mt-4'}>Lire la suite</Button>
                    </div>
                </div>
            </div>
            {collectionVinyls && collectionVinyls.length > 0 ? (
                <div>
                    <h2 className={'mt-4 mb-2 text-fuchsia-800 font-bold text-xl'}>
                        <span className={'text-emerald-500'}>
                            <FontAwesomeIcon icon={faCompactDisc} />{' '}
                        </span>{' '}
            Derniers vinyls ajoutés
                    </h2>

                    <div className="h-56 sm:hidden">
                        <Carousel>
                            {collectionVinyls.map((collectionVinyl, key) => (
                                <Image
                                    key={key}
                                    src={collectionVinyl.vinyl.image_path}
                                    alt={collectionVinyl.vinyl.label}
                                    width={300}
                                    height={300}
                                    className={'h-full w-full object-cover border-8'}
                                />
                            ))}
                        </Carousel>
                    </div>

                    <div
                        className={
                            'hidden sm:grid sm:grid-cols-3 content-around gap-4 justify-items-center'
                        }
                    >
                        {collectionVinyls && collectionVinyls.length > 0
                            ? collectionVinyls.map((collectionVinyl) => (
                                <Link
                                    href={`/vinyls/${collectionVinyl.vinyl_id}`}
                                    key={collectionVinyl.id}
                                >
                                    <Image
                                        src={collectionVinyl.vinyl.image_path}
                                        alt={collectionVinyl.vinyl.label}
                                        width={300}
                                        height={300}
                                        className={'h-56 w-56 object-cover border-8'}
                                    />
                                    <h3>{collectionVinyl.vinyl.label}</h3>
                                    <p className={'text-sm'}>{collectionVinyl.vinyl.artist}</p>
                                    <p>{collectionVinyl.collection?.user?.name}</p>
                                </Link>
                            ))
                            : ''}
                    </div>

                    <Button className={'my-4'}>En voir davantage</Button>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
