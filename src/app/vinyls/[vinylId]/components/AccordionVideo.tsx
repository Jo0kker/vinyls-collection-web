'use client'

import { Accordion } from 'flowbite-react'
import YouTube from 'react-youtube'
import { useEffect, useState } from 'react'

export default function AccordionVideo({ videos }: { videos: any }) {
    const getVideoId = (url: string) => {
        const videoId = url.split('v=')[1]
        const ampersandPosition = videoId.indexOf('&')
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition)
        }
        return videoId
    }

    const [opts, setOpts] = useState({
        height: 390,
        width: 640,
        playerVars: {
            autoplay: 0,
        },
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Mise à jour des options de YouTube avec la taille de la fenêtre
            setOpts({
                height: window.innerWidth / 1.77,
                width: window.innerWidth,
                playerVars: {
                    autoplay: 0,
                },
            })
        }
    }, [])


    return (
        <div className="flex flex-col">
            <Accordion>
                {videos.map((video: any, index: number) => {
                    return (
                        <Accordion.Panel key={index}>
                            <Accordion.Title className="truncate ">{video.title}</Accordion.Title>
                            <Accordion.Content>
                                <YouTube
                                    videoId={getVideoId(video.uri)}
                                    opts={opts}
                                    className="flex justify-center"
                                />
                            </Accordion.Content>
                        </Accordion.Panel>
                    )
                })}
            </Accordion>
        </div>
    )
}
