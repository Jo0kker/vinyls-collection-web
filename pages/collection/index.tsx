import React, { useEffect, useState } from "react";
import SideBar from "@components/SideBar";
import { useBearStore } from "@store/useBearStore";
import axiosApiInstance from "../../services/interceptorService";
// @ts-ignore
import { CollectionVinyl } from "@types/CollectionVinyl";
// @ts-ignore
import { Collection } from "@types/Collection";
import { AxiosResponse } from "axios";
import ListVinyls from "@components/ListVinyls";
import { Button } from "@components/Button";
import SlideOvers from "@components/SlideOvers";
import { FormikValues } from "formik";

// if not logged in, redirect to login page
export async function getServerSideProps(context: any) {
  // search in local storage for use
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

const EspaceMembre = () => {
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

      // set tab active to first collection
      setCollectionShow(reqCollectionVinyl.data.data[0].id);
      console.log(reqCollectionVinyl.data.data[0].id);
    } else {
      window.location.href = "/";
    }
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

  const addVinylToCollection = async () => {};

  useEffect(() => {
    getAllCollections().then(() => {});
  }, []);

  useEffect(() => {
    if (collectionShow) {
      axiosApiInstance
        .get(`/collections/${collectionShow}/collectionVinyl?include=vinyl`)
        .then((res: AxiosResponse) => {
          setCollectionVinyls(res.data.data);
        });
    }
  }, [collectionShow]);

  // return with loading
  return (
    <div className={"pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col"}>
      <div
        className={"flex flex-row justify-center font-bold text-2xl mt-6 mb-4"}
      >
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Votre espace</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>
      <div className={"flex flex-col"}>
        <SideBar
          navItems={collections}
          activeTab={collectionShow}
          setActiveTab={setCollectionShow}
        />
        <div>
          <ListVinyls collection={collectionVinyls} />
          {/*  Add collection vinyls btn*/}
          <Button
            onClick={() => {
              setSlideIsOpen(true);
            }}
            className={"my-4"}
          >
            Ajouter un vinyle
          </Button>
        </div>
        <SlideOvers
          open={slideIsOpen}
          setOpen={setSlideIsOpen}
          searchVinyl={searchVinyls}
          vinyl={vinylSearch}
        />
      </div>
    </div>
  );
};

export default EspaceMembre;
