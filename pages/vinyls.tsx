import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/pro-light-svg-icons";
import axiosApiInstance from "../services/interceptorService";
import { CollectionVinyl } from "../types/CollectionVinyl";
import { Search } from "../types/Search";
import { Trade } from "../types/Trade";

export async function getServerSideProps() {
  // get last 6 vinyls
  const reqCollectionVinyl = await axiosApiInstance.get(
    `/collectionVinyl?include=vinyl,collection,collection.user&limit=8`
  );

  const collectionVinyls: CollectionVinyl[] = reqCollectionVinyl.data.data;

  const reqSearchVinyl = await axiosApiInstance.get(
    `/searches?limit=8&include=user`
  );

  const searchVinyls: Search[] = reqSearchVinyl.data.data;

  const reqTradeVinyl = await axiosApiInstance.get(
    `/trades?limit=8&include=user`
  );

  const tradeVinyls: Trade[] = reqTradeVinyl.data.data;

  return {
    props: {
      collectionVinyls,
      searchVinyls,
      tradeVinyls,
    },
  };
}

const Vinyls = ({
  collectionVinyls,
  searchVinyls,
  tradeVinyls,
}: {
  collectionVinyls: CollectionVinyl[];
  searchVinyls: Search[];
  tradeVinyls: Trade[];
}) => {
  return (
    <div className={"pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col"}>
      <div
        className={"flex flex-row justify-center font-bold text-2xl mt-6 mb-4"}
      >
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Liste des derniers vinyls</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>

      {/* Les derniers vinyls ajoutés */}

      <div className={"lg:mx-32"}>
        <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
          <span className={"text-emerald-500"}>
            <FontAwesomeIcon icon={faCompactDisc} />{" "}
          </span>{" "}
          Derniers vinyls ajoutés
        </h2>
        <div className={"flex flex-row flex-wrap justify-center"}>
          {collectionVinyls.map((collectionVinyl) => (
            <div
              key={collectionVinyl.id}
              className={"flex flex-col items-center m-4 w-48"}
            >
              <div className={"flex flex-col items-center"}>
                <Image
                  src={collectionVinyl.vinyl.image_path}
                  alt={collectionVinyl.vinyl.label}
                  width={100}
                  height={100}
                  className={"object-cover"}
                />
                <div className={"flex flex-col items-center"}>
                  <h3 className={"text-fuchsia-800 font-bold text-lg"}>
                    {/* cut if string too long */}
                    {collectionVinyl.vinyl.label.length > 15
                      ? collectionVinyl.vinyl.label.substring(0, 15) + "..."
                      : collectionVinyl.vinyl.label}
                  </h3>
                  <h4 className={"text-fuchsia-800 font-bold text-sm"}>
                    {collectionVinyl.vinyl.artist}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Les derniers vinyls à échanger */}
      <div className={"lg:mx-32"}>
        <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
          <span className={"text-emerald-500"}>
            <FontAwesomeIcon icon={faCompactDisc} />{" "}
          </span>{" "}
          Derniers vinyls ajoutés
        </h2>
        <div className={"flex flex-row flex-wrap justify-center"}>
          {collectionVinyls.map((collectionVinyl) => (
            <div
              key={collectionVinyl.id}
              className={"flex flex-col items-center m-4 w-48"}
            >
              <div className={"flex flex-col items-center"}>
                <Image
                  src={collectionVinyl.vinyl.image_path}
                  alt={collectionVinyl.vinyl.label}
                  width={100}
                  height={100}
                  className={"object-cover"}
                />
                <div className={"flex flex-col items-center"}>
                  <h3 className={"text-fuchsia-800 font-bold text-lg"}>
                    {/* cut if string too long */}
                    {collectionVinyl.vinyl.label.length > 15
                      ? collectionVinyl.vinyl.label.substring(0, 15) + "..."
                      : collectionVinyl.vinyl.label}
                  </h3>
                  <h4 className={"text-fuchsia-800 font-bold text-sm"}>
                    {collectionVinyl.vinyl.artist}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Les derniers vinyls recherchés */}
      <div className={"lg:mx-32"}>
        <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
          <span className={"text-emerald-500"}>
            <FontAwesomeIcon icon={faCompactDisc} />{" "}
          </span>{" "}
          Derniers vinyls ajoutés
        </h2>
        <div className={"flex flex-row flex-wrap justify-center"}>
          {collectionVinyls.map((collectionVinyl) => (
            <div
              key={collectionVinyl.id}
              className={"flex flex-col items-center m-4 w-48"}
            >
              <div className={"flex flex-col items-center"}>
                <Image
                  src={collectionVinyl.vinyl.image_path}
                  alt={collectionVinyl.vinyl.label}
                  width={100}
                  height={100}
                  className={"object-cover"}
                />
                <div className={"flex flex-col items-center"}>
                  <h3 className={"text-fuchsia-800 font-bold text-lg"}>
                    {/* cut if string too long */}
                    {collectionVinyl.vinyl.label.length > 15
                      ? collectionVinyl.vinyl.label.substring(0, 15) + "..."
                      : collectionVinyl.vinyl.label}
                  </h3>
                  <h4 className={"text-fuchsia-800 font-bold text-sm"}>
                    {collectionVinyl.vinyl.artist}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vinyls;
