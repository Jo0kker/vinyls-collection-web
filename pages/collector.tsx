import axiosApiInstance from '../services/interceptorService';
import type { User } from '../types/User';
import Image from 'next/image';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { Button } from '@components/Button';
import { useState } from 'react';
import type { AxiosResponse } from 'axios';

export async function getServerSideProps () {
    const req = await axiosApiInstance.get('/users');
    const users: User[] = req.data.data;
    const meta = req.data.meta;

    return {
        props: {
            users,
            meta,
        },
    };
}

const Collector = ({
    users,
    meta,
}: {
  users: User[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}) => {
    const [collectors, setCollectors] = useState(users);
    const [currentPage, setCurrentPage] = useState(meta.current_page);

    const loadMore = () => {
        axiosApiInstance
            .get(`/users?page=${currentPage + 1}`)
            .then((res: AxiosResponse) => {
                setCollectors([...collectors, ...res.data.data]);
                setCurrentPage(res.data.meta.current_page);
            });
    };

    return (
        <div className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}>
            <div
                className={'flex flex-row justify-center font-bold text-2xl mt-6 mb-4'}
            >
                <span className={'mr-3 text-emerald-500'}>&#47;&#47;</span>
                <h1 className={'text-fuchsia-800'}>Liste des collectionneurs</h1>
                <span className={'ml-3 text-orange-400'}>&#47;&#47;</span>
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
                {collectors.map((user) => (
                    <Link
                        key={user.id}
                        href={`/users/${user.id}`}
                        className={
                            'flex flex-row m-1 border border-gray-300 rounded border-8 hover:bg-gray-400'
                        }
                    >
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            width={100}
                            height={100}
                            className={'cursor-pointer'}
                        />
                        <div className={'flex flex-col mx-3 justify-center'}>
                            <h2>{user.name}</h2>
                            <p className={'text-sm'}>{user.collectionVinyls_count} vinyls</p>
                            <p className={'text-sm'}>
                Dernière connection :{' '}
                                {DateTime.fromFormat(
                                    user.last_activity,
                                    'yyyy-MM-dd HH:mm:ss'
                                ).toFormat('dd/MM/yyyy')}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <Button className={'my-4'} onClick={loadMore}>
        Charger plus
            </Button>
        </div>
    );
};

export default Collector;
