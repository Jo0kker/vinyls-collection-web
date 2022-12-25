import React, {useEffect, useState} from "react";
import SideBar from "@components/SideBar";
import {useBearStore} from "@store/useBearStore";
import axiosApiInstance from "../../services/interceptorService";
import {User} from "../../types/User";


const EspaceMembre = () => {
  const user = useBearStore(state => state.user);
  if (!user) {
    // redirect to login with next

  }

  const [tabActive, setTabActive] = useState(0);
  const [collections, setCollections] = useState([]);




    const getCollections = async (user: User) => {
        const reqCollectionVinyl = await axiosApiInstance.get(`/users/${user.id}/collections`);
        setCollections(reqCollectionVinyl.data.data);
        console.log(reqCollectionVinyl.data.data);
    }

    useEffect(() => {
      const user: any = useBearStore.getState().user;
      if (user) {
        getCollections(user);
      } else {
        window.location.href = '/login';
      }
    }, []);

    return (
        <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
            <div
              className={"flex flex-row justify-center font-bold text-2xl mt-6 mb-4"}
            >
                <span className={"mr-3 text-emerald-500"}>//</span>
                <h1 className={"text-fuchsia-800"}>Votre espace</h1>
                <span className={"ml-3 text-orange-400"}>//</span>
            </div>
            <div className={'flex flex-col'}>
                <SideBar navItems={collections} activeTab={tabActive} setActiveTab={setTabActive} />
                <div>
                    <h1>test</h1>
                </div>
            </div>
        </div>
    )
}

export default EspaceMembre;
