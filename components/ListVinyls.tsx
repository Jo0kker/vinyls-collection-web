// @ts-ignore
import { Vinyl } from "@types/Vinyl";
import Link from "next/link";
import Image from "next/image";
// @ts-ignore
import { CollectionVinyl } from "@types/CollectionVinyl";

const ListVinyls = ({ collection }: { collection: CollectionVinyl[] }) => {
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2"}>
      {/* if collection empty return no vinyl */}
      {collection.length === 0 ? (
        <div className={"text-center"}>
          <p className={""}>Aucun vinyle</p>
        </div>
      ) : (
        collection.map((collectionVinyl) => (
          <Link
            href={`/vinyls/${collectionVinyl.vinyl_id}`}
            key={collectionVinyl.id}
            className={
              "flex flex-row m-1 border border-gray-300 rounded border-8 hover:bg-gray-400"
            }
          >
            <Image
              src={collectionVinyl.vinyl.image_path}
              alt={collectionVinyl.vinyl.label}
              width={100}
              height={100}
              className={"rounded-bl rounded-tl"}
            />
            <div className={"flex flex-col mx-3 justify-center"}>
              <h2>{collectionVinyl.vinyl.label}</h2>
              <h3>{collectionVinyl.vinyl.artist}</h3>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ListVinyls;
