import React, { useEffect, useState } from "react";
import SideBar from "@components/SideBar";
import { useBearStore } from "@store/useBearStore";
import axiosApiInstance from "../../services/interceptorService";
// @ts-ignore
import { CollectionVinyl } from "@types/CollectionVinyl";
// @ts-ignore
import { Collection } from "@types/Collection";
import { AxiosResponse } from "axios";

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
  const user = useBearStore((state) => state.user);

  const getAllCollections = async () => {
    if (user) {
      const reqCollectionVinyl = await axiosApiInstance.get(
        `/users/${user.id}/collections`
      );

      setCollections(reqCollectionVinyl.data.data);

      // set tab active to first collection
      setCollectionShow(reqCollectionVinyl.data.data[0].id);
    } else {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    getAllCollections().then(() => {});
  }, []);

  useEffect(() => {
    if (collectionShow) {
      axiosApiInstance
        .get(`/collections/${collectionShow}/vinyls`)
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
          <h1>List</h1>
        </div>
      </div>
    </div>
  );
};

export default EspaceMembre;
