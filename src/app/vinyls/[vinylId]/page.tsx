import { faCompactDisc, faVideo } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip } from 'flowbite-react'
import Image from 'next/image'

import AccordionVideo from '@/app/vinyls/[vinylId]/components/AccordionVideo'
import { Vinyl } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'
import { prefixImage } from '@/utils/prefixImage'
import { Button } from '@/components/atom/Button';

type VinylPageProps = {
    params: {
        vinylId: string
    }
}

export default async function VinylPage({ params }: VinylPageProps) {
    const { data: vinyls } = await fetchAPI<Vinyl[]>('/vinyls/search', {
        method: 'POST',
        body: JSON.stringify({
            search: {
                filters: [
                    {
                        field: 'id',
                        operator: '=',
                        value: params.vinylId
                    }
                ]
            }
        })
    })

    const vinyl = vinyls[0]

    return (
        <div className="mt-4 flex flex-col gap-4 rounded bg-white px-4 py-4 pt-4 sm:pt-0">
            <div className="mb-4 mt-4 flex flex-row justify-center text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">{vinyl?.title}</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                    <Image
                        src={prefixImage(vinyl.image)}
                        alt={vinyl.title}
                        width={300}
                        height={300}
                        className="rounded-md"
                    />
                    <div>
                        <table className="table-auto text-sm">
                            <tbody>
                            <tr>
                                <td className="px-4 py-2">Titre</td>
                                <td className="px-4 py-2">{vinyl.title}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Artiste</td>
                                <td className="px-4 py-2">{vinyl.artist}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Provenance</td>
                                <td className="px-4 py-2">{vinyl.provenance}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Année</td>
                                <td className="px-4 py-2">{vinyl.released}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Genre</td>
                                <td className="px-4 py-2">{vinyl.genre}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="flex flex-row items-center">
                            <Tooltip content={vinyl.discog_id ? 'Voir sur Discogs' : 'Pas de lien Discogs'}>
                                <a
                                  href={`https://www.discogs.com/release/${vinyl.discog_id}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-4"
                                >
                                    <Badge color="blue" className="text-black">
                                        <FontAwesomeIcon icon={faCompactDisc} size="2xl"/>
                                        {' '}
                                        Discogs
                                    </Badge>
                                </a>
                            </Tooltip>
                            <Tooltip content="Ajouter à ça collection">
                                <Button
                                  buttonClassName="border-0 p-0"
                                >
                                    <Badge color="blue" className="text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor"
                                             viewBox="0 0 640 512">
                                            <path
                                              d="M0 256C0 164.5 48.8 80 128 34.3s176.8-45.7 256 0c60.3 34.8 103 92.1 119.9 157.9c-2.6-.1-5.3-.2-7.9-.2c-60 0-113 30-144.7 75.8c.5-3.9 .7-7.8 .7-11.8c0-34.3-18.3-66-48-83.1s-66.3-17.1-96 0s-48 48.8-48 83.1s18.3 66 48 83.1s66.3 17.1 96 0c8.4-4.8 15.8-10.8 22.2-17.7c-4.1 14.8-6.2 30.4-6.2 46.5c0 45.9 17.6 87.6 46.4 119c-75.7 36.2-164.9 33.1-238.4-9.3C48.8 432 0 347.5 0 256zm64 0l32 0c0-88.4 71.6-160 160-160l0-32C150 64 64 150 64 256zm160 0c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm64-16l0 32 64 0 0 64 32 0 0-64 64 0 0-32-64 0 0-64-32 0 0 64-64 0z"/>
                                        </svg>
                                        {' '}
                                        Collection
                                    </Badge>
                                </Button>
                            </Tooltip>

                        </div>
                    </div>
                </div>

                {vinyl.discog_id && (
                  <>
                      {vinyl.track_list && (
                        <div className="flex w-full flex-col items-center justify-center md:w-1/2">
                            <h2 className="mb-2 mt-4 text-xl font-bold text-fuchsia-800">
                                    <span className="text-emerald-500">
                                        <FontAwesomeIcon icon={faCompactDisc}/>{' '}
                                    </span>{' '}
                                Tracklist
                            </h2>
                            <div className="w-full overflow-x-auto">
                                <Table hoverable>
                                    <TableHead className="bg-gray-100 dark:bg-gray-900">
                                        <TableHeadCell className="whitespace-nowrap">
                                            Position
                                        </TableHeadCell>
                                        <TableHeadCell>Titre</TableHeadCell>
                                        <TableHeadCell>Durée</TableHeadCell>
                                    </TableHead>
                                        <TableBody className="w-full divide-y">
                                            {JSON.parse(vinyl.track_list).map(
                                                (track: any, index: number) => (
                                                    <TableRow
                                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                        key={index}
                                                    >
                                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                            {track.position}
                                                        </TableCell>
                                                        <TableCell>{track.title}</TableCell>
                                                        <TableCell>{track.duration}</TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )}
                        {vinyl.discog_videos && (
                            <div className="flex w-full flex-col items-center justify-center">
                                <h2 className="mb-2 mt-4 text-xl font-bold text-fuchsia-800">
                                    <span className="text-emerald-500">
                                        <FontAwesomeIcon icon={faVideo} />{' '}
                                    </span>{' '}
                                    Videos
                                </h2>
                                <>
                                    <div className="flex w-full flex-col">
                                        <AccordionVideo videos={JSON.parse(vinyl.discog_videos)} />
                                    </div>
                                </>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
