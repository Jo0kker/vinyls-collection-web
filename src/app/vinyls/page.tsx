import { faCompactDisc } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atom/Button'
import { CollectionVinyl, Trade, Search } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'
import { prefixImage } from '@/utils/prefixImage'

export default async function VinylsPage() {
    const [collectionVinyls, tradeVinyls, searchVinyls] = await getData()

    return (
        <div className="mt-4 flex flex-col rounded bg-white px-4 pt-4 sm:pt-0">
            <div className="mb-4 mt-6 flex flex-row justify-center text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Liste des derniers vinyls</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="lg:mx-32">
                <h2 className="mb-2 mt-4 text-xl font-bold text-fuchsia-800">
                    <span className="text-emerald-500">
                        <FontAwesomeIcon icon={faCompactDisc} />{' '}
                    </span>{' '}
                    Derniers vinyls ajoutés
                </h2>

                <div className="flex flex-row flex-wrap justify-center">
                    {collectionVinyls.data?.map(collectionVinyl => (
                        <Link
                            href={`/vinyls/${collectionVinyl.vinyl.id}`}
                            key={collectionVinyl.id}
                            className="m-4 flex w-48 flex-col items-center rounded-md p-2 hover:bg-gray-300"
                        >
                            <Image
                                src={prefixImage(collectionVinyl.vinyl.image)}
                                alt={collectionVinyl.vinyl.title}
                                width={100}
                                height={100}
                                className="w-full rounded-md object-cover"
                            />
                            <div className="w-full overflow-hidden">
                                <h3 className="truncate text-center font-bold text-fuchsia-800">
                                    {collectionVinyl.vinyl.title}
                                </h3>
                                <h4 className="text-center text-sm font-bold text-fuchsia-800">
                                    {collectionVinyl.vinyl.artist}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {!!tradeVinyls.data?.length && (
                <div className="lg:mx-32">
                    <h2 className="mb-2 mt-4 text-xl font-bold text-fuchsia-800">
                        <span className="text-emerald-500">
                            <FontAwesomeIcon icon={faCompactDisc} />{' '}
                        </span>{' '}
                        Derniers vinyls à échanger
                    </h2>
                    <div className="flex flex-row flex-wrap justify-center">
                        {tradeVinyls.data.map(trade => (
                            <Link
                                href={`/vinyls/${trade.vinyl.id}`}
                                key={trade.id}
                                className="m-4 flex w-48 flex-col items-center p-2 hover:bg-gray-300"
                            >
                                <Image
                                    src={prefixImage(trade.vinyl.image)}
                                    alt={trade.vinyl.title}
                                    width={100}
                                    height={100}
                                    className="w-full rounded-md object-cover"
                                />
                                <div className="w-full overflow-hidden">
                                    <h3 className="truncate text-center font-bold text-fuchsia-800">
                                        {trade.vinyl.title}
                                    </h3>
                                    <h4 className="text-center text-sm font-bold text-fuchsia-800">
                                        {DateTime.fromISO(trade.updated_at).toFormat('dd/MM/yyyy')}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link href="/trades">
                        <Button className="mb-4 mt-4">Voir tous les vinyls à échanger</Button>
                    </Link>
                </div>
            )}

            {!!searchVinyls.data?.length && (
                <div className="lg:mx-32">
                    <h2 className="mb-2 mt-4 text-xl font-bold text-fuchsia-800">
                        <span className="text-emerald-500">
                            <FontAwesomeIcon icon={faCompactDisc} />{' '}
                        </span>{' '}
                        Derniers vinyls recherchés
                    </h2>
                    <div className="flex flex-row flex-wrap justify-center">
                        {searchVinyls.data?.map(search => (
                            <div key={search.id} className="m-4 flex w-48 flex-col items-center">
                                <Image
                                    src={prefixImage(search.vinyl.image)}
                                    alt={search.vinyl.title}
                                    width={100}
                                    height={100}
                                    className="w-full rounded-md object-cover"
                                />
                                <div className="w-full overflow-hidden">
                                    <h3 className="truncate text-center font-bold text-fuchsia-800">
                                        {search.vinyl.title}
                                    </h3>
                                    <h4 className="text-center text-sm font-bold text-fuchsia-800">
                                        {search.vinyl.artist}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href="/searches">
                        <Button className="mb-4 mt-4">Voir tous les vinyls recherchés</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

async function getData() {
    return await Promise.all([
        fetchAPI<CollectionVinyl[]>('/collectionVinyl/search', {
            method: 'POST',
            next: {
                revalidate: 1200
            },
            body: JSON.stringify({
                search: {
                    includes: [
                        { relation: 'vinyl' },
                        { relation: 'collection' },
                        { relation: 'collection.user' }
                    ],
                    sort: [{ field: 'updated_at', direction: 'desc' }]
                }
            })
        }),
        fetchAPI<Trade[]>('/trades/search', {
            method: 'POST',
            next: {
                revalidate: 1200
            },
            body: JSON.stringify({
                search: {
                    includes: [{ relation: 'vinyl' }, { relation: 'user' }],
                    sort: [{ field: 'updated_at', direction: 'desc' }]
                }
            })
        }),
        fetchAPI<Search[]>('/searches/search', {
            method: 'POST',
            next: {
                revalidate: 1200
            },
            body: JSON.stringify({
                search: {
                    includes: [{ relation: 'vinyl' }, { relation: 'user' }],
                    sort: [{ field: 'updated_at', direction: 'desc' }]
                }
            })
        })
    ])
}
