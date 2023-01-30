import axiosApiInstance from "../../services/interceptorService";
import { Vinyl } from "../../types/Vinyl";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faVideo } from "@fortawesome/pro-light-svg-icons";
import { YoutubeEmbed } from "@components/YoutubeEmbed";
import { Accordion } from "flowbite-react";
import { useState } from "react";
import { Button } from "@components/Button";

interface Track {
  duration: string;
  position: string;
  title: string;
  type_: string;
}

export async function getServerSideProps(context: { params: { id: any } }) {
  const { id } = context.params;
  const vinyl = await axiosApiInstance.get(`/vinyls/${id}`);

  return {
    props: {
      vinyl: vinyl.data.data,
    },
  };
}

const Vinyl = ({ vinyl }: { vinyl: Vinyl }) => {
  const [showMoreVideo, setShowMoreVideo] = useState(false);

  return (
    <div className={"pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col"}>
      <div
        className={"flex flex-row justify-center font-bold text-2xl mt-4 mb-4"}
      >
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>
          {vinyl.discogs ? vinyl.discogs.title : vinyl.label}
        </h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>
      <div className={"flex flex-col"}>
        <div
          className={"flex flex-col md:flex-row justify-center items-center"}
        >
          <Image
            src={vinyl.discogs ? vinyl.discogs.thumb : vinyl.image_path}
            alt={vinyl.label}
            width={300}
            height={300}
          />
          <table className={"table-auto text-sm"}>
            <tbody>
              <tr>
                <td className={"px-4 py-2"}>Label</td>
                <td className={"px-4 py-2"}>{vinyl.label}</td>
              </tr>
              <tr>
                <td className={"px-4 py-2"}>Artiste</td>
                <td className={"px-4 py-2"}>{vinyl.artist}</td>
              </tr>
              <tr>
                <td className={"px-4 py-2"}>Provenance</td>
                <td className={"px-4 py-2"}>{vinyl.provenance}</td>
              </tr>
              <tr>
                <td className={"px-4 py-2"}>Année</td>
                <td className={"px-4 py-2"}>{vinyl.year_released}</td>
              </tr>
              <tr>
                <td className={"px-4 py-2"}>Genre</td>
                <td className={"px-4 py-2"}>{vinyl.genre}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {vinyl.discogs && (
          <>
            <div className={"flex flex-col justify-center items-center"}>
              <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
                <span className={"text-emerald-500"}>
                  <FontAwesomeIcon icon={faCompactDisc} />{" "}
                </span>{" "}
                Tracklist
              </h2>
              <table className={"table-auto text-sm"}>
                <tbody>
                  {vinyl.discogs.tracklist.map(
                    (track: Track, index: number) => (
                      <tr key={index}>
                        <td className={"px-4 py-2"}>{track.position}</td>
                        <td className={"px-4 py-2"}>{track.title}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            {vinyl.discogs.videos && (
              <div className={"flex flex-col justify-center items-center"}>
                <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
                  <span className={"text-emerald-500"}>
                    <FontAwesomeIcon icon={faVideo} />{" "}
                  </span>{" "}
                  Videos
                </h2>
                <div className={"flex flex-col gap-1"}>
                  <Accordion>
                    {vinyl.discogs.videos.map((video: any, index: number) => {
                      if (index < 3) {
                        return (
                          <Accordion.Panel key={index}>
                            <Accordion.Title>{video.title}</Accordion.Title>
                            <Accordion.Content>
                              <YoutubeEmbed url={video.uri} />
                            </Accordion.Content>
                          </Accordion.Panel>
                        );
                      } else {
                        if (showMoreVideo) {
                          return (
                            <Accordion.Panel key={index}>
                              <Accordion.Title>{video.title}</Accordion.Title>
                              <Accordion.Content>
                                <YoutubeEmbed url={video.uri} />
                              </Accordion.Content>
                            </Accordion.Panel>
                          );
                        } else {
                          return <></>;
                        }
                      }
                    })}
                  </Accordion>
                </div>
                <Button
                  onClick={() => setShowMoreVideo(!showMoreVideo)}
                  className={"my-4"}
                >
                  {showMoreVideo ? "Voir moins" : "Voir plus"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Vinyl;
