'use client';

import { Accordion } from 'flowbite-react';
import YouTube from 'react-youtube';

export default function AccordionVideo({ videos }: { videos: any }) {

  const getVideoId = (url: string) => {
    const videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition)
    }
    return videoId
  }

  const opts = {
    height: window.innerWidth * 0.5625,
    width: window.innerWidth * 0.5,
  };

  return (
    <div className='flex flex-col'>
      <Accordion className="">
        {videos.map((video: any, index: number) => {
          if (index > 3) return <></>
          return (
            <Accordion.Panel key={index}>
              <Accordion.Title className="truncate ">
                {video.title}
              </Accordion.Title>
              <Accordion.Content>
                <YouTube videoId={getVideoId(video.uri)} opts={opts} className="flex justify-center" />
              </Accordion.Content>
            </Accordion.Panel>
          )
        })}
      </Accordion>
    </div>
  );
}