import Head from "next/head";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCompactDisc } from "@fortawesome/pro-light-svg-icons";
import { Button } from "@components/Button";

export default function Home() {
  return (
    <div className={"pt-44 sm:pt-0 mt-24 px-4 rounded bg-white flex flex-col"}>
      <div
        className={
          "sm:flex sm:flex-row sm:gap-8 md:gap-16 lg:gap-24 sm:relative sm:-top-[63px]"
        }
      >
        <Image
          src={"https://picsum.photos/300/300?random=1"}
          alt={"Vinyl du moins"}
          width={300}
          height={300}
          className={
            "absolute object-cover h-56 w-56 lg:h-72 lg:w-72 border-8 -rotate-12 top-96 left-1/2 transform -translate-x-1/2 translate-y-16 sm:static sm:translate-x-0 sm:translate-y-0 lg:translate-x-12 md:translate-x-8"
          }
        />
        <div>
          <h2
            className={
              "text-fuchsia-800 text-center text-5xl font-extrabold m-2"
            }
          >
            <span className={"sm:text-white"}>Le vinyl</span>
            <FontAwesomeIcon icon={faPlus} className={"text-emerald-500 m-1"} />
            <br />
            <FontAwesomeIcon icon={faPlus} className={"text-emerald-500 m-1"} />
            <span>du mois</span>
          </h2>
          <h3 className={"font-bold my-2"}>Titre de l'intro</h3>
          <p className={"leading-5"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur cupiditate dignissimos doloremque exercitationem nihil
            placeat quo sapiente ut vel voluptatem!
          </p>

          <div className={"flex flex-row justify-center"}>
            <Button className={"mt-4"}>Lire la suite</Button>
          </div>
        </div>
      </div>
      <div>
        <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
          <span className={"text-emerald-500"}>
            <FontAwesomeIcon icon={faCompactDisc} />{" "}
          </span>{" "}
          Derniers vinyls ajoutés
        </h2>

        <div className="h-56 sm:hidden">
          <Carousel>
            <img
              className={"h-full w-full object-cover border-8"}
              src="https://i.discogs.com/4_hlQoW4Wcu5IvGy7TVrEm9CLmRtc30aOiML0WJCF1s/rs:fit/g:sm/q:90/h:600/w:595/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0ODEw/NzA0LTE2NjU2Njk4/MTAtNzEyNC5qcGVn.jpeg"
              alt="one"
            />
            <img
              className={"h-full w-full object-cover border-8"}
              src="https://picsum.photos/300/300/?random=3"
              alt="one"
            />
            <img
              className={"h-full w-full object-cover border-8"}
              src="https://picsum.photos/300/300/?random=4"
              alt="one"
            />
          </Carousel>
        </div>

        <div
          className={
            "hidden sm:grid sm:grid-cols-3 content-around gap-4 justify-items-center"
          }
        >
          <div>
            <img
              className={"h-56 w-56 object-cover border-8"}
              src="https://i.discogs.com/4_hlQoW4Wcu5IvGy7TVrEm9CLmRtc30aOiML0WJCF1s/rs:fit/g:sm/q:90/h:600/w:595/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0ODEw/NzA0LTE2NjU2Njk4/MTAtNzEyNC5qcGVn.jpeg"
              alt="one"
            />
            <h3>Titre du vinyl</h3>
            <p className={"text-sm"}>Artiste</p>
            <p>Nicolas - 10/03 14:43</p>
          </div>
          <div>
            <img
              className={"h-56 w-56 object-cover border-8"}
              src="https://picsum.photos/300/300/?random=5"
              alt="one"
            />
            <h3>Titre du vinyl</h3>
            <p className={"text-sm"}>Artiste</p>
            <p>Nicolas - 10/03 14:43</p>
          </div>
          <div>
            <img
              className={"h-56 w-56 object-cover border-8"}
              src="https://picsum.photos/300/300/?random=6"
              alt="one"
            />
            <h3>Titre du vinyl</h3>
            <p className={"text-sm"}>Artiste</p>
            <p>Nicolas - 10/03 14:43</p>
          </div>
          <div>
            <img
              className={"h-56 w-56 object-cover border-8"}
              src="https://picsum.photos/300/300/?random=7"
              alt="one"
            />
            <h3>Titre du vinyl</h3>
            <p className={"text-sm"}>Artiste</p>
            <p>Nicolas - 10/03 14:43</p>
          </div>
        </div>

        <Button className={"my-4"}>En voir davantage</Button>
      </div>
      <div className={"mb-12"}>
        <h2 className={"mt-4 mb-4 text-fuchsia-800 font-bold text-xl"}>
          <span className={"text-orange-400"}>
            <FontAwesomeIcon icon={faCompactDisc} />
          </span>{" "}
          Derniers messages du forum
        </h2>

        <div className="h-56 sm:hidden ">
          <Carousel slide={false}>
            <div
              className={
                "h-56 sm:h-64 xl:h-80 2xl:h-96 bg-black bg-opacity-40 rounded p-4"
              }
            >
              <h3 className={"font-bold"}>Titre du message</h3>
              <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
              <p className={"leading-5"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur cupiditate dignissimos doloremque exercitationem
                nihil placeat quo sapiente ut vel voluptatem!
              </p>
            </div>
            <div
              className={
                "h-56 sm:h-64 xl:h-80 2xl:h-96 bg-black bg-opacity-40 rounded p-4"
              }
            >
              <h3 className={"font-bold"}>Titre du message</h3>
              <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
              <p className={"leading-5"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur cupiditate dignissimos doloremque exercitationem
                nihil placeat quo sapiente ut vel voluptatem!
              </p>
            </div>
            <div
              className={
                "h-56 sm:h-64 xl:h-80 2xl:h-96 bg-black bg-opacity-40 rounded p-4"
              }
            >
              <h3 className={"font-bold"}>Titre du message</h3>
              <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
              <p className={"leading-5"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur cupiditate dignissimos doloremque exercitationem
                nihil placeat quo sapiente ut vel voluptatem!
              </p>
            </div>
            <div
              className={
                "h-56 sm:h-64 xl:h-80 2xl:h-96 bg-black bg-opacity-40 rounded p-4"
              }
            >
              <h3 className={"font-bold"}>Titre du message</h3>
              <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
              <p className={"leading-5"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur cupiditate dignissimos doloremque exercitationem
                nihil placeat quo sapiente ut vel voluptatem!
              </p>
            </div>
          </Carousel>
        </div>

        <div className={"hidden sm:flex flex-row border-8"}>
          <div className={"h-48 border flex flex-col justify-center gap-2 p-2"}>
            <h3 className={"font-bold"}>Titre du message</h3>
            <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
            <p className={"leading-5"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className={"h-48 border flex flex-col justify-center gap-2 p-2"}>
            <h3 className={"font-bold"}>Titre du message</h3>
            <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
            <p className={"leading-5"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className={"h-48 border flex flex-col justify-center gap-2 p-2"}>
            <h3 className={"font-bold"}>Titre du message</h3>
            <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
            <p className={"leading-5"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className={"h-48 border flex flex-col justify-center gap-2 p-2"}>
            <h3 className={"font-bold"}>Titre du message</h3>
            <span className={"text-sm"}>Nicolas - 10/03 14:43</span>
            <p className={"leading-5"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}