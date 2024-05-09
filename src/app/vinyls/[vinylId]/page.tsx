import { faCompactDisc, faVideo } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import Image from 'next/image'

import AccordionVideo from '@/app/vinyls/[vinylId]/components/AccordionVideo'
import { Vinyl } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'
import { prefixImage } from '@/utils/prefixImage'

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
                </div>

                {vinyl.discog_id && (
                    <>
                        {vinyl.track_list && (
                            <div className="flex w-full flex-col items-center justify-center md:w-1/2">
                                <h2 className="mb-2 mt-4 text-xl font-bold text-fuchsia-800">
                                    <span className="text-emerald-500">
                                        <FontAwesomeIcon icon={faCompactDisc} />{' '}
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
