import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCompactDisc } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@components/Button';
import axiosApiInstance from '@services/interceptorService';

import type { CollectionVinyl } from '@definitions/CollectionVinyl';
import process from 'process';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@utils/authOptions';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // get last 6 vinyls
    const reqCollectionVinyl = await axiosApiInstance.get(
        '/collectionVinyl?include=vinyl,collection,collection.user&limit=6'
    );

    const collectionVinyls: CollectionVinyl[] =
        reqCollectionVinyl?.data?.data || [];

    return {
        props: {
            collectionVinyls,
            session: await getServerSession(
                context.req,
                context.res,
                authOptions
            )
        }
    };
}

type HomeProps = {
    collectionVinyls: CollectionVinyl[];
};

export default function Home({ collectionVinyls }: HomeProps) {
    return (
        <div className="pt-44 sm:pt-0 mt-24 px-4 rounded bg-white flex flex-col">
            <Head>
                <title>Vinyls Collection</title>
                <meta name="description" content="Vinyls-collection" />
            </Head>
            <div className="sm:flex sm:flex-row sm:gap-8 md:gap-16 lg:gap-24 sm:relative sm:-top-[63px]">
                <Image
                    src="https://picsum.photos/300/300?random=1"
                    alt="Vinyl du moins"
                    width={300}
                    height={300}
                    className="absolute object-cover h-56 w-56 lg:h-72 lg:w-72 border-8 -rotate-12 top-96 left-1/2 transform -translate-x-1/2 translate-y-16 sm:static sm:translate-x-0 sm:translate-y-0 lg:translate-x-12 md:translate-x-8"
                />
                <div>
                    <h2 className="text-fuchsia-800 text-center text-5xl font-extrabold m-2">
                        <span className="sm:text-white">Le vinyl</span>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="text-emerald-500 m-1"
                        />
                        <br />
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="text-emerald-500 m-1"
                        />
                        <span>du mois</span>
                    </h2>
                    <h3 className="font-bold my-2">Lorem ipsum dolor sit.</h3>
                    <p className="leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Consequuntur cupiditate dignissimos doloremque
                        exercitationem nihil placeat quo sapiente ut vel
                        voluptatem!
                    </p>

                    <div className="flex flex-row justify-center">
                        <Button className="mt-4">Lire la suite</Button>
                    </div>
                </div>
            </div>
            {collectionVinyls && collectionVinyls.length > 0 ? (
                <div>
                    <h2 className="mt-4 mb-2 text-fuchsia-800 font-bold text-xl">
                        <span className="text-emerald-500">
                            <FontAwesomeIcon icon={faCompactDisc} />{' '}
                        </span>{' '}
                        Derniers vinyls ajoutés
                    </h2>

                    <div className="h-56 sm:hidden">
                        <Carousel>
                            {collectionVinyls.map((collectionVinyl, key) => (
                                <Link
                                    href={`/vinyls/${collectionVinyl.vinyl_id}`}
                                    key={key}
                                    className="w-full h-full flex flex-col items-center justify-center"
                                >
                                    {collectionVinyl.vinyl.image ? (
                                        <Image
                                            src={
                                                collectionVinyl.vinyl.image.startsWith(
                                                    'http'
                                                )
                                                    ? collectionVinyl.vinyl
                                                          .image
                                                    : process.env
                                                          .NEXT_PUBLIC_API_URL +
                                                      collectionVinyl.vinyl
                                                          .image
                                            }
                                            alt={collectionVinyl.vinyl.title}
                                            width={200}
                                            height={200}
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            src="https://via.placeholder.com/100x100.png?text=No+Image"
                                            alt={collectionVinyl.vinyl.title}
                                            width={200}
                                            height={200}
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </Carousel>
                    </div>

                    <div className="hidden sm:grid sm:grid-cols-3 content-around gap-4 justify-items-center">
                        {collectionVinyls && collectionVinyls.length > 0
                            ? collectionVinyls.map(collectionVinyl => (
                                  <Link
                                      href={`/vinyls/${collectionVinyl.vinyl_id}`}
                                      key={collectionVinyl.id}
                                      className="w-full h-full flex flex-col items-center justify-center"
                                  >
                                      {collectionVinyl.vinyl.image ? (
                                          <Image
                                              src={
                                                  collectionVinyl.vinyl.image.startsWith(
                                                      'http'
                                                  )
                                                      ? collectionVinyl.vinyl
                                                            .image
                                                      : process.env
                                                            .NEXT_PUBLIC_API_URL +
                                                        collectionVinyl.vinyl
                                                            .image
                                              }
                                              alt={collectionVinyl.vinyl.title}
                                              width={200}
                                              height={200}
                                              style={{
                                                  objectFit: 'cover',
                                                  width: '200px',
                                                  height: '200px'
                                              }}
                                          />
                                      ) : (
                                          <Image
                                              src="https://via.placeholder.com/100x100.png?text=No+Image"
                                              alt={collectionVinyl.vinyl.title}
                                              width={200}
                                              height={200}
                                              style={{
                                                  objectFit: 'cover',
                                                  width: '200px',
                                                  height: '200px'
                                              }}
                                          />
                                      )}
                                      <h3 className="truncate w-1/2 text-center">
                                          {collectionVinyl.vinyl.title}
                                      </h3>
                                      <p className="text-sm">
                                          {collectionVinyl.vinyl.artist}
                                      </p>
                                  </Link>
                              ))
                            : ''}
                    </div>

                    <Button className="my-4">En voir davantage</Button>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
