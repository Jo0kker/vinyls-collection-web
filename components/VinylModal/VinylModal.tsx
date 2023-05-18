import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormSearch from "@components/VinylModal/FormSearch";
import { array } from "yup";

type props = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchDiscogsVinyls: (data: VinylSearchProps) => Promise<void>;
  listVinyls: never[];
  addVinylToCollection: (idDiscogs: number) => void;
};

interface VinylSearchProps {
  title: string;
  artist: string;
  year: string;
}

export const VinylModal = ({
  modalIsOpen,
  setModalIsOpen,
  searchDiscogsVinyls,
  listVinyls,
  addVinylToCollection,
}: props) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setModalIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10">
          <div className=" flex justify-center min-h-full   p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden min-w-[80%] rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 lg:min-w-[40%] p-4">
                <FormSearch
                  setModalIsOpen={setModalIsOpen}
                  modalIsOpen={modalIsOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
