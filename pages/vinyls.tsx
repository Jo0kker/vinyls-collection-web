import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/pro-light-svg-icons";
import axiosApiInstance from "../services/interceptorService";
import { CollectionVinyl } from "../types/CollectionVinyl";
import { Search } from "../types/Search";
import { Trade } from "../types/Trade";
import { Button } from "@components/Button";
import Link from "next/link";
import { DateTime } from "luxon";

export async function getServerSideProps() {
  // get last 6 vinyls
  const reqCollectionVinyl = await axiosApiInstance.post(
    `/collectionVinyl/search?include=vinyl,collection,collection.user&limit=8`,
    {
      sort: [{ field: "updated_at", direction: "desc" }],
    }
  );

  const collectionVinyls: CollectionVinyl[] = reqCollectionVinyl.data.data;

  const reqTradeVinyl = await axiosApiInstance.post(
    `/trades/search?include=vinyl,user&limit=8`,
    {
      sort: [{ field: "updated_at", direction: "desc" }],
    }
  );

  const tradeVinyls: Trade[] = reqTradeVinyl.data.data;

  const reqSearchVinyl = await axiosApiInstance.post(
    `/searches/search?include=vinyl,user&limit=8&`,
    {
      sort: [{ field: "updated_at", direction: "desc" }],
    }
  );

  const searchVinyls: Search[] = reqSearchVinyl.data.data;

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
            <Link
              href={`/vinyls/${collectionVinyl.vinyl.id}`}
              key={collectionVinyl.id}
              className={
                "flex flex-col items-center m-4 p-2 w-48 hover:bg-gray-300"
              }
            >
              <Image
                src={collectionVinyl.vinyl.image_path}
                alt={collectionVinyl.vinyl.label}
                width={100}
                height={100}
                className={"object-cover w-full"}
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
            </Link>
          ))}
        </div>
        <Link href={"/vinyls/list"}>
          <Button className={"mt-4"}>Voir tous les vinyls</Button>
        </Link>
      </div>
      {/* Les derniers vinyls à échanger */}
      <div className={"lg:mx-32"}>
        <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
          <span className={"text-emerald-500"}>
            <FontAwesomeIcon icon={faCompactDisc} />{" "}
          </span>{" "}
          Derniers vinyls à échanger
        </h2>
        <div className={"flex flex-row flex-wrap justify-center"}>
          {tradeVinyls.map((trade) => (
            <Link
              href={`/vinyls/${trade.vinyl.id}`}
              key={trade.id}
              className={
                "flex flex-col items-center m-4 p-2 w-48 hover:bg-gray-300"
              }
            >
              <Image
                src={trade.image_path}
                alt={trade.vinyl.label}
                width={100}
                height={100}
                className={"object-cover w-full"}
              />
              <div className={"flex flex-col items-center"}>
                <h3 className={"text-fuchsia-800 font-bold text-lg"}>
                  {/* cut if string too long */}
                  {trade.vinyl.label.length > 15
                    ? trade.vinyl.label.substring(0, 15) + "..."
                    : trade.vinyl.label}
                </h3>
                <h4
                  className={
                    "text-fuchsia-800 font-bold text-sm hover:text-amber-600"
                  }
                >
                  <Link href={`/users/${trade.user_id}`}>
                    {trade.user?.name}
                  </Link>
                </h4>
                <p className={"text-sm"}>
                  {DateTime.fromISO(trade.updated_at).toFormat("dd/MM/yyyy")}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link href={"/trades"}>
          <Button className={"mt-4 mb-4"}>
            Voir tous les vinyls à échanger
          </Button>
        </Link>
      </div>
      {/* Les derniers vinyls recherchés */}
      <div className={"lg:mx-32"}>
        <h2 className={"mt-4 mb-2 text-fuchsia-800 font-bold text-xl"}>
          <span className={"text-emerald-500"}>
            <FontAwesomeIcon icon={faCompactDisc} />{" "}
          </span>{" "}
          Derniers vinyls recherchés
        </h2>
        <div className={"flex flex-row flex-wrap justify-center"}>
          {searchVinyls.map((search) => (
            <div
              key={search.id}
              className={"flex flex-col items-center m-4 w-48"}
            >
              <Image
                src={search.image_path}
                alt={search.vinyl.label}
                width={100}
                height={100}
                className={"object-cover w-full"}
              />
              <div className={"flex flex-col items-center"}>
                <h3 className={"text-fuchsia-800 font-bold text-lg"}>
                  {/* cut if string too long */}
                  {search.vinyl.label.length > 15
                    ? search.vinyl.label.substring(0, 15) + "..."
                    : search.vinyl.label}
                </h3>
                <h4 className={"text-fuchsia-800 font-bold text-sm"}>
                  {search.vinyl.artist}
                </h4>
              </div>
            </div>
          ))}
        </div>
        <Link href={"/searches"}>
          <Button className={"mt-4 mb-4"}>
            Voir tous les vinyls recherchés
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Vinyls;
