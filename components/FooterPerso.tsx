import Link from 'next/link';
import Image from 'next/image';
import { Footer } from 'flowbite-react';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '@images/logo.png';

export const FooterPerso = () => {
    return (
        <footer className="bg-opacity-10 bg-transparent text-white mt-4">
            <div className="w-full">
                <div className="grid w-full justify-between items-center lg:flex lg:justify-between lg:flex lg:grid-cols-1">
                    <div className="mb-4 flex items-center sm:mb-0">
                        <Image
                            src={logo}
                            alt="Vinyls-Collection"
                            height={49}
                            width={110}
                            className="mr-3"
                        />
                        <span
                            className="self-center  text-2xl font-semibold text-gray-300 dark:text-white"
                        >
                            Vinyls Collection
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 lg:mt-4 lg:mb-4 lg:grid-cols-4 lg:gap-6 mr-4">
                        <div>
                            <Footer.LinkGroup col={true}>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Présentation du site
                                </Footer.Link>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Besoin d'aide ?
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.LinkGroup col={true}>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Foire aux questions
                                </Footer.Link>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Contact
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.LinkGroup col={true}>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Les vinyls du siècle
                                </Footer.Link>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Tous les vinyls
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.LinkGroup col={true}>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Tous les collectionneurs
                                </Footer.Link>
                                <Footer.Link
                                    href="#"
                                    className="hover:text-orange-700"
                                >
                                    Nos partenaires
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider className="my-2" />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright
                        href="#"
                        by=" Vinyls-Collection™"
                        year={2022}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="hover:text-orange-700"
                        />
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="hover:text-orange-700"
                        />
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="hover:text-orange-700"
                        />
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="hover:text-orange-700"
                        />
                    </div>
                </div>
                <div
                    className="flex flex-row justify-center gap-4 opacity-30 mt-4"
                >
                    <Link href="#">Mentions légales</Link>
                    <Link href="#">Politique de confidentialité</Link>
                </div>
            </div>
        </footer>
    );
};
