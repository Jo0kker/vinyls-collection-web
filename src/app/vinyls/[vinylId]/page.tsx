import { faCompactDisc, faVideo, faArrowUpRightFromSquare, faEarMuffs } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Accordion, AccordionContent, AccordionPanel, AccordionTitle,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Tooltip
} from 'flowbite-react'
import Image from 'next/image'

import AccordionVideo from '@/app/vinyls/[vinylId]/components/AccordionVideo'
import AddToCollection from '@/app/vinyls/[vinylId]/components/AddToCollection'
import ButtonUpdateDiscog from '@/app/vinyls/[vinylId]/components/ButtonUpdateDiscog'
import { Vinyl } from '@/types'
import { getSession } from '@/utils/authOptions'
import { fetchAPI } from '@/utils/fetchAPI'
import { prefixImage } from '@/utils/prefixImage'

type VinylPageProps = {
    params: Promise<{
        vinylId: string
    }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VinylPage({ params, searchParams }: VinylPageProps) {
    const resolvedParams = await params
    const queryParams = await searchParams
    const session = await getSession()

    const { data: vinyls } = await fetchAPI<Vinyl[]>('/vinyls/search', {
        method: 'POST',
        next: {
            tags: [`vinyls:${resolvedParams.vinylId}`]
        },
        body: JSON.stringify({
            search: {
                filters: [
                    {
                        field: 'id',
                        operator: '=',
                        value: resolvedParams.vinylId
                    }
                ]
            }
        })
    })

    const vinyl = vinyls[0]

    return (
        <div className="flex flex-col gap-4 px-4 py-4 pt-4 mt-4 bg-white rounded sm:pt-0">
            <div className="flex flex-row justify-center mt-4 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">{vinyl?.title}</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center gap-4 mb-2 md:flex-row">
                    <Image
                        src={prefixImage(vinyl.image)}
                        alt={vinyl.title}
                        width={300}
                        height={300}
                        className="object-cover w-[300px] h-[300px] rounded-md"
                    />
                    <div>
                        <table className="text-sm table-auto">
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
                        <div className="flex flex-col items-center gap-1">
                            {vinyl.discog_id && (
                                <Tooltip content="Voir sur Discogs">
                                    <a
                                        href={vinyl.discog_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4"
                                    >
                                        <Badge color="blue" className="text-black">
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xl" />
                                            <span className="ml-2">Discogs</span>
                                        </Badge>
                                    </a>
                                </Tooltip>
                            )}
                            {session && vinyl.discog_id && session.user.ability && session.user.ability.includes('update vinyls') && (
                                <ButtonUpdateDiscog />
                            )}
                            {session && (
                                <Tooltip content="Ajouter à ça collection">
                                    <AddToCollection vinyl={vinyl} />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
                {vinyl.discog_id && (
                    <Accordion alwaysOpen={true} className="w-full">
                        {vinyl.track_list ? (
                            <AccordionPanel className="w-full">
                                <AccordionTitle className="w-full text-fuchsia-800">
                                <span className="text-emerald-500">
                                    <FontAwesomeIcon className="text-emerald-500" icon={faCompactDisc} />{' '}
                                </span>
                                    {' '}
                                    Tracklist
                                </AccordionTitle>
                                <AccordionContent>
                                    <div className="overflow-x-auto">
                                        <Table hoverable className="min-w-full">
                                            <TableHead className="bg-gray-100 dark:bg-gray-900">
                                                <TableHeadCell className="whitespace-nowrap">
                                                    Position
                                                </TableHeadCell>
                                                <TableHeadCell>Titre</TableHeadCell>
                                                <TableHeadCell>Durée</TableHeadCell>
                                            </TableHead>
                                            <TableBody className="divide-y">
                                                {JSON.parse(vinyl.track_list).map(
                                                    (track: any, index: number) => (
                                                        <TableRow
                                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                            key={index}
                                                        >
                                                            <TableCell
                                                                className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                                </AccordionContent>
                            </AccordionPanel>
                        ) : (
                            <AccordionPanel>
                                <AccordionTitle className="w-full text-fuchsia-800">
                                    <span className="text-emerald-500">
                                        <FontAwesomeIcon className="text-emerald-500" icon={faCompactDisc} />{' '}
                                    </span>
                                    {' '}
                                    Pas de tracklist
                                </AccordionTitle>
                                <AccordionContent>
                                    <div className="flex flex-col">
                                        <p className="text-center">Pas de tracklist disponible</p>
                                    </div>
                                </AccordionContent>
                            </AccordionPanel>
                        )}
                        {vinyl.discog_videos && JSON.parse(vinyl.discog_videos).length > 0 ? (
                            <AccordionPanel className="w-full">
                                <AccordionTitle className="w-full text-fuchsia-800">
                                    <span className="text-emerald-500">
                                        <FontAwesomeIcon className="text-emerald-500" icon={faEarMuffs} />{' '}
                                    </span>
                                    {' '}
                                    Media
                                </AccordionTitle>
                                <AccordionContent>
                                    <div className="flex flex-col">
                                        <AccordionVideo videos={JSON.parse(vinyl.discog_videos)} />
                                    </div>
                                </AccordionContent>
                            </AccordionPanel>
                        ) : (
                            <AccordionPanel>
                                <AccordionTitle className="w-full text-fuchsia-800">
                                    <span className="text-emerald-500">
                                        <FontAwesomeIcon className="text-emerald-500" icon={faEarMuffs} />{' '}
                                    </span>
                                    {' '}
                                    Pas de vidéos
                                </AccordionTitle>
                                <AccordionContent>
                                    <div className="flex flex-col">
                                        <p className="text-center">Pas de vidéos disponibles</p>
                                    </div>
                                </AccordionContent>
                            </AccordionPanel>
                        )}
                    </Accordion>
                )}
            </div>
        </div>
    )
}
