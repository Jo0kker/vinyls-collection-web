import { useState } from 'react';

import { useBearStore } from '@store/useBearStore';
import axiosApiInstance from '@services/interceptorService';

import type { GetServerSidePropsContext } from 'next';
import type { Trade, Search } from '@definitions/index';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}
export function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.req.cookies.token;
    const refresh_token = context.req.cookies.refresh_token;

    if (!token || !refresh_token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
}
const Troc = () => {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [searchPage, setSearchPage] = useState(1);
    const [searches, setSearches] = useState<Search[]>([]);
    const user = useBearStore(state => state.user);
    const [tabs, setTabs] = useState([
        { name: 'Recherche', current: true },
        { name: 'A échanger', current: false }
    ]);

    const getAllTrades = async () => {
        if (user) {
            const reqTrades = await axiosApiInstance.get(
                `/users/${user.id}/trades`
            );
            setTrades(reqTrades.data.data);
        }
    };

    const getAllSearches = async () => {
        if (user) {
            const reqSearches = await axiosApiInstance.get(
                `/users/${user.id}/searches`
            );
            setSearches(reqSearches.data.data);
        }
    };

    return (
        <div
            className={'pt-4 sm:pt-0 mt-4 px-4 rounded bg-white flex flex-col'}
        >
            <div
                className={
                    'flex flex-row justify-center font-bold text-2xl mt-6 mb-4'
                }
            >
                <span className={'mr-3 text-emerald-500'}>&#47;&#47;</span>
                <h1 className={'text-fuchsia-800'}>Espace trocs</h1>
                <span className={'ml-3 text-orange-400'}>&#47;&#47;</span>
            </div>
            <div className={'flex flex-col'}>
                <div>
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                            Quoi afficher ?
                        </label>
                        <select
                            id="tabs"
                            name="tabs"
                            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={tabs.find(tab => tab.current)?.name}
                            onChange={e => {
                                setTabs(
                                    tabs.map(tab => {
                                        return {
                                            ...tab,
                                            current: tab.name === e.target.value
                                        };
                                    })
                                );
                            }}
                        >
                            {tabs.map(tab => (
                                <option key={tab.name}>{tab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <div className="border-b border-gray-200">
                            <nav
                                className="-mb-px flex justify-center"
                                aria-label="Tabs"
                            >
                                {tabs.map(item => (
                                    <span
                                        key={item.name}
                                        className={classNames(
                                            item.current
                                                ? 'border-fuchsia-600 text-fuchsia-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                            'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer'
                                        )}
                                        onClick={() => {
                                            setTabs(
                                                tabs.map(tab => {
                                                    tab.current =
                                                        tab.name === item.name;
                                                    return tab;
                                                })
                                            );
                                        }}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }
                                    >
                                        {item.name}
                                    </span>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col'}>
                {tabs.find(tab => tab.current)?.name === 'Recherche' ? (
                    <div className={'flex flex-col'}>
                        <h2>Vos recherches</h2>
                    </div>
                ) : (
                    <div className={'flex flex-col'}>
                        <h2>Vos échanges</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Troc;
