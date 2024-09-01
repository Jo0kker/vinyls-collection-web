import { faCompactDisc, faPlus } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atom/Button'
import Carousel from '@/components/home/Carousel'
import { CollectionVinyl } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'

export default async function HomePage() {
    const collectionVinyls = await fetchAPI<CollectionVinyl[]>('/collectionVinyl/search', {
        method: 'POST',
        next: {
            revalidate: 1
        },
        body: JSON.stringify({
            search: {
                scopes: [
                    { name: 'uniqueVinyls' }
                ],
                sorts: [
                    {
                        field: 'created_at',
                        direction: 'DESC'
                    }
                ],
                includes: [
                    { relation: 'vinyl' },
                    { relation: 'collection' },
                    { relation: 'collection.user' }
                ],
                limit: 6
            }
        })
    })

    return (
        <div className="mt-24 flex flex-col rounded bg-white px-4 pt-44 sm:pt-0">
            <div className="sm:relative sm:-top-[63px] sm:flex sm:flex-row sm:gap-8 md:gap-16 lg:gap-24">
                <Image
                    src="https://picsum.photos/300/300?random=1"
                    alt="Vinyl du moins"
                    width={300}
                    height={300}
                    className="absolute left-1/2 top-[275px] h-56 w-56 -translate-x-1/2 translate-y-16 -rotate-12 transform border-8 object-cover sm:static sm:translate-x-0 sm:translate-y-0 md:translate-x-8 lg:h-72 lg:w-72 lg:translate-x-12"
                />

                <div>
                    <h2 className="m-2 text-center text-5xl font-extrabold text-fuchsia-800">
                        <span className="sm:text-white">Le vinyl</span>
                        <FontAwesomeIcon icon={faPlus} className="m-1 text-emerald-500" />
                        <br />
                        <FontAwesomeIcon icon={faPlus} className="m-1 text-emerald-500" />
                        <span>du mois</span>
                    </h2>
                    <h3 className="my-2 font-bold">Lorem ipsum dolor sit.</h3>
                    <p className="leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
                        cupiditate dignissimos doloremque exercitationem nihil placeat quo sapiente
                        ut vel voluptatem!
                    </p>

                    <div className="flex flex-row justify-center">
                        <Button className="mt-4">Lire la suite</Button>
                    </div>
                </div>
            </div>

            {collectionVinyls.data?.length && (
                <div>
                    <h2 className="mb-2 mt-4 text-xl font-bold text-fuchsia-800">
                        <span className="text-emerald-500">
                            <FontAwesomeIcon icon={faCompactDisc} />{' '}
                        </span>{' '}
                        Derniers vinyls ajoutés
                    </h2>
                    <Carousel collectionVinyls={collectionVinyls.data} />

                    <Link href="/vinyls">
                        <Button className="my-4">En voir davantage</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
