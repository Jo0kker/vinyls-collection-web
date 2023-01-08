// @ts-ignore
import { Vinyl } from "@types/Vinyl";
import Link from "next/link";
import Image from "next/image";
// @ts-ignore
import { CollectionVinyl } from "@types/CollectionVinyl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/pro-light-svg-icons";
import axiosApiInstance from "../services/interceptorService";
import axios, { AxiosResponse } from "axios";
import { showToast } from "@utils/utils";
// @ts-ignore
import { Trade } from "@types/Trade";
// @ts-ignore
import { Search } from "@types/Search";
import { array } from "yup";

const ListVinyls = ({
  collectionVinyls,
  setCollectionVinyls,
}: {
  collectionVinyls: [];
  setCollectionVinyls: Function;
}) => {
  const deleteVinyl = (collectionId: number, collectionVinylId: number) => {
    setCollectionVinyls(
      collectionVinyls.filter(
        (vinyl: CollectionVinyl | Trade | Search) =>
          vinyl.id !== collectionVinylId
      )
    );
    axiosApiInstance
      .delete(
        `/collections/${collectionId}/collectionVinyl/${collectionVinylId}`
      )
      .then((res: AxiosResponse) => {
        // remove the vinyl from the list
        showToast("success", "Vinyl supprimé de la collection");
      })
      .catch(() => {
        showToast("error", "Une erreur est survenue");
        // if error, add the vinyl back to the list
        setCollectionVinyls(collectionVinyls);
      });
  };

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2"}>
      {/* if collection empty return no vinyl */}
      {collectionVinyls.length === 0 ? (
        <div className={"text-center"}>
          <p className={""}>Aucun vinyle</p>
        </div>
      ) : (
        collectionVinyls.map(
          (collectionVinylItem: CollectionVinyl | Trade | Search) => (
            <Link
              href={`/vinyls/${collectionVinylItem.vinyl_id}`}
              key={collectionVinylItem.id}
              className={
                "flex flex-row m-1 border border-gray-300 rounded border-8 hover:bg-gray-400"
              }
            >
              <Image
                src={collectionVinylItem.vinyl.image_path}
                alt={collectionVinylItem.vinyl.label}
                width={100}
                height={100}
                className={"rounded-bl rounded-tl"}
              />
              <div className={"flex flex-col flex-1 mx-3 justify-center"}>
                <h2>{collectionVinylItem.vinyl.label}</h2>
                <h3>{collectionVinylItem.vinyl.artist}</h3>
                <p>{collectionVinylItem.vinyl.year_released}</p>
              </div>
              <div className={"flex mx-2 items-center"}>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    // if collectionVinylItem is a collectionVinylItem
                    if (collectionVinylItem instanceof CollectionVinyl) {
                      deleteVinyl(
                        collectionVinylItem.collection_id,
                        collectionVinylItem.id
                      );
                    } else {
                    }
                  }}
                  className={"bg-fuchsia-900 rounded py-1 px-2"}
                >
                  <FontAwesomeIcon icon={faTrash} color={"white"} />
                </button>
              </div>
            </Link>
          )
        )
      )}
    </div>
  );
};

export default ListVinyls;
