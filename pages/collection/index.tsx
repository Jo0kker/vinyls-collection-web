import React, { useEffect, useState } from "react";
import SideBar from "@components/SideBar";
import { useBearStore } from "@store/useBearStore";
import axiosApiInstance from "../../services/interceptorService";
// @ts-ignore
import { CollectionVinyl } from "@types/CollectionVinyl";
// @ts-ignore
import { Collection } from "@types/Collection";
import {AxiosError, AxiosResponse} from "axios";
import ListVinyls from "@components/ListVinyls";
import { Button } from "@components/Button";
import SlideOvers from "@components/SlideOvers";
import { FormikValues } from "formik";
import {showToast} from "@utils/utils";

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.token;
  const refresh_token = context.req.cookies.refresh_token;

  if (!token || !refresh_token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const UserCollection = () => {
  const [collectionShow, setCollectionShow] = useState(0);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionVinyls, setCollectionVinyls] = useState<CollectionVinyl[]>(
    []
  );
  const [searchPage, setSearchPage] = useState(1);
  const [searchData, setSearchData] = useState<{
    title: string;
    artist: string;
    year: string;
  }>({
    title: "",
    artist: "",
    year: "",
  });
  const [vinylSearch, setVinylSearch] = useState([]);
  const [slideIsOpen, setSlideIsOpen] = useState(false);
  const user = useBearStore((state) => state.user);

  const getAllCollections = async () => {
    if (user) {
      const reqCollectionVinyl = await axiosApiInstance.get(
        `/users/${user.id}/collections`
      );
      setCollections(reqCollectionVinyl.data.data);
      setCollectionShow(reqCollectionVinyl.data.data[0].id);
    }
  };

  const getCollectionVinyls = () => {
    axiosApiInstance
      .get(`/collections/${collectionShow}/collectionVinyl?include=vinyl`)
      .then((res: AxiosResponse) => {
        setCollectionVinyls(res.data.data);
      });
  };

  const searchVinyls = async (data: FormikValues) => {
    const reqVinyls = await axiosApiInstance.post(
      `/discogs/search?title=${data.title}&artist=${data.artist}&year=${data.year}&per_page=10&page=${searchPage}`
    );
    setSearchData({
      title: data.title,
      artist: data.artist,
      year: data.year,
    });
    setVinylSearch(reqVinyls.data.results);
  };

  const addVinylToCollection = (idDiscogs: number) => {
    if (user) {
      axiosApiInstance.post(`/collectionVinyl`, {
        discog_id: idDiscogs,
        collection_id: collectionShow,
      }).then(() => {
        getCollectionVinyls();
      }).catch((err: AxiosError) => {
        if (err.response?.status === 409) {
          showToast('error', 'Vinyle déjà présent dans la collection')
        }
      });
    }
  };

  useEffect(() => {
    getAllCollections().then(() => {});
  }, [user]);

  useEffect(() => {
    if (collectionShow) {
      getCollectionVinyls();
    }
  }, [collectionShow]);

  // return with loading
  return (
    <div className={"pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col"}>
      <div
        className={"flex flex-row justify-center font-bold text-2xl mt-6 mb-4"}
      >
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Gestion de vos collections</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>
      <div className={"flex flex-col"}>
        <SideBar
          navItems={collections}
          activeTab={collectionShow}
          setActiveTab={setCollectionShow}
        />
        <div>
          <Button
            onClick={() => {
              setSlideIsOpen(true);
            }}
            className={"my-4"}
          >
            Ajouter un vinyle
          </Button>
          <ListVinyls collectionVinyls={collectionVinyls} setCollectionVinyls={setCollectionVinyls} />
        </div>
        <SlideOvers
          open={slideIsOpen}
          setOpen={setSlideIsOpen}
          searchVinyl={searchVinyls}
          vinyl={vinylSearch}
          addVinylToCollection={addVinylToCollection}
        />
      </div>
    </div>
  );
};

export default UserCollection;
