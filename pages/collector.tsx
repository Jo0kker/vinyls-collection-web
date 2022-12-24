import axiosApiInstance from "../services/interceptorService";
import {User} from "../types/User";
import Image from "next/image";
import Link from "next/link";
import {DateTime} from "luxon";

export async function getServerSideProps() {
  const req = await axiosApiInstance.get(`/users`);
  const users: User[] = req.data.data;

  return {
    props: {
      users,
    },
  };
}

const Collector = ({ users }: { users: User[] }) => {

  return (
    <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
      <div
        className={"flex flex-row justify-center font-bold text-2xl mt-6 mb-4"}
      >
        <span className={"mr-3 text-emerald-500"}>//</span>
        <h1 className={"text-fuchsia-800"}>Liste des collectionneurs</h1>
        <span className={"ml-3 text-orange-400"}>//</span>
      </div>

      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
        {users.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`} className={"flex flex-row m-1 border border-gray-300 rounded border-8 hover:bg-gray-400"}>
            <Image src={user.avatar} alt={user.name}
                   width={100} height={100}
                    className={'cursor-pointer'}/>
            <div className={'flex flex-col mx-3 justify-center'}>
              <h2>Pseudo : {user.name}</h2>
              <h3>Dernière connection : {DateTime.fromFormat()}</h3>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collector;
