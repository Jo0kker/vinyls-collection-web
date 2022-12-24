import {CollectionVinyl} from "../../types/CollectionVinyl";
import axiosApiInstance from "../../services/interceptorService";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@components/Button";
import {AxiosResponse} from "axios";
import {useState} from "react";

export async function getServerSideProps(page = 1) {

  const reqCollectionVinyl = await axiosApiInstance.post(
    `/collectionVinyl/search?include=vinyl,collection,collection.user&page=${page}`,
    {
      sort: [
        {"field": "updated_at", "direction": "desc"}
      ],
    }
  );

  const collectionVinyls: CollectionVinyl[] = reqCollectionVinyl.data.data;
  const meta = reqCollectionVinyl.data.meta;

  return {
    props: {
      collectionVinyls,
      meta
    },
  };
}

const VinylList = ({collectionVinyls, meta} : {collectionVinyls: CollectionVinyl[], meta: {
    current_page: number,
    last_page: number,
    total: number
  }}) => {

  const [collection, setCollection] = useState(collectionVinyls);
  const [currentPage, setCurrentPage] = useState(meta.current_page);


  const loadMore = () => {
    axiosApiInstance.post(
      `/collectionVinyl/search?include=vinyl,collection,collection.user&page=${currentPage + 1}`,
      {
        sort: [
          {"field": "updated_at", "direction": "desc"}
        ],
      }
    ).then((res: AxiosResponse) => {
      setCollection([...collection, ...res.data.data]);
      setCurrentPage(res.data.meta.current_page);
    });
  }

  return (
    <div className={"pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col"}>
      <div
        className={"flex flex-row justify-center font-bold text-2xl mt-4 mb-4"}
      >
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Liste des vinyls</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>

      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
        {collection.map((collectionVinyl) => (
          <Link href={`/vinyls/${collectionVinyl.vinyl_id}`}
                key={collectionVinyl.id}
                className={"flex flex-row m-1 border border-gray-300 rounded border-8 hover:bg-gray-400"}
          >
            <Image src={collectionVinyl.vinyl.image_path}
                   alt={collectionVinyl.vinyl.label}
                   width={100} height={100}
                   className={'rounded-bl rounded-tl'}
            />
            <div className={'flex flex-col mx-3 justify-center'}>
              <h2>{collectionVinyl.vinyl.label}</h2>
              <h3>{collectionVinyl.vinyl.artist}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Button className={'my-4'} onClick={loadMore}>Charger plus</Button>
    </div>
  );
};

export default VinylList;
