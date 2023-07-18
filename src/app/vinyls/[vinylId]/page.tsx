import Image from 'next/image'

import { Vinyl } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'
import { prefixImage } from '@/utils/prefixImage'

type VinylPageProps = {
    params: {
        vinylId: string
    }
}

export default async function VinylPage({ params }: VinylPageProps) {
    const { data: vinyl } = await fetchAPI<Vinyl>(`/vinyls/${params.vinylId}`)

    return (
        <div className="mt-4 flex flex-col gap-4 rounded bg-white px-4 py-4 pt-4 sm:pt-0">
            <div className="mb-4 mt-4 flex flex-row justify-center text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">{vinyl?.title}</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>

            <div className="flex flex-col">
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
                                <td className="px-4 py-2">Label</td>
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

                {/* {vinyl.discogs && (
                    <>
                        <div className='flex flex-col items-center justify-center'}>
                            <h2 className='mb-2 mt-4 text-xl font-bold text-fuchsia-800'}>
                                <span className='text-emerald-500'}>
                                    <FontAwesomeIcon icon={faCompactDisc} />{' '}
                                </span>{' '}
                                Tracklist
                            </h2>
                            <table className='table-auto text-sm'}>
                                <tbody>
                                    {vinyl.discogs.tracklist.map((track, index: number) => (
                                        <tr key={index}>
                                            <td className='px-4 py-2'}>{track.position}</td>
                                            <td className='px-4 py-2'}>{track.title}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {vinyl.discogs.videos && (
                            <div className='flex flex-col items-center justify-center'}>
                                <h2 className='mb-2 mt-4 text-xl font-bold text-fuchsia-800'}>
                                    <span className='text-emerald-500'}>
                                        <FontAwesomeIcon icon={faVideo} />{' '}
                                    </span>{' '}
                                    Videos
                                </h2>
                                <div className='flex flex-col gap-1'}>
                                    <Accordion>
                                        {vinyl.discogs.videos.map((video, index: number) => {
                                            if (index < 3) {
                                                return (
                                                    <Accordion.Panel key={index}>
                                                        <Accordion.Title>
                                                            {video.title}
                                                        </Accordion.Title>
                                                        <Accordion.Content>
                                                            <YoutubeEmbed url={video.uri} />
                                                        </Accordion.Content>
                                                    </Accordion.Panel>
                                                )
                                            } else {
                                                if (showMoreVideo) {
                                                    return (
                                                        <Accordion.Panel key={index}>
                                                            <Accordion.Title>
                                                                {video.title}
                                                            </Accordion.Title>
                                                            <Accordion.Content>
                                                                <YoutubeEmbed url={video.uri} />
                                                            </Accordion.Content>
                                                        </Accordion.Panel>
                                                    )
                                                } else {
                                                    return <></>
                                                }
                                            }
                                        })}
                                    </Accordion>
                                </div>
                                <Button
                                    onClick={() => setShowMoreVideo(!showMoreVideo)}
                                    className='my-4'}
                                >
                                    {showMoreVideo ? 'Voir moins' : 'Voir plus'}
                                </Button>
                            </div>
                        )}
                    </>
                )} */}
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const vinyls = await fetchAPI<{ id: number }[]>('/vinyls?limit=50')

    return vinyls.data?.map(item => ({ vinylId: `${item.id}` }))
}
