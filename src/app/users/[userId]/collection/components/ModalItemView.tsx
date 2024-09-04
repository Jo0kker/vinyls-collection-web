'use client'

import React from 'react';

import { Modal } from 'flowbite-react';
// eslint-disable-next-line import/order
import Image from 'next/image';

import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

import useModalItemViewStore from '@/store/modalItemViewStore';


const ModalItemView = () => {
  const { isModalOpen, modalData, collectionType, closeModal } = useModalItemViewStore();

  return (
    <>
      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onClose={closeModal}
          className="modal"
        >
          <Modal.Header>
            {modalData?.vinyl?.title}
          </Modal.Header>
          <Modal.Body>
            {modalData?.vinyl && (
              <div className="vinyl-info mb-4">
                <h3 className="text-md sm:text-lg font-semibold">Vinyl Information</h3>
                <p><strong>Artist:</strong> {modalData.vinyl.artist}</p>
                <p><strong>Genre:</strong> {modalData.vinyl.genre}</p>
                <p><strong>Released:</strong> {modalData.vinyl.released}</p>
                <a href={modalData.vinyl.discog_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Discogs</a>
              </div>
            )}

            {modalData && (
              <div className="item-info">
                <h3 className="text-md sm:text-lg font-semibold">Item Information</h3>
                <p><strong>Description:</strong> {modalData.description}</p>
                <p><strong>Format:</strong> {modalData.format}</p>
                {'media' in modalData && modalData.media && modalData.media.length > 0 && (
                  <div className="media-section mt-4">
                    <h4 className="text-sm sm:text-md font-semibold">Media</h4>
                    <Gallery>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {modalData.media.map((media) => (
                          <Item
                            key={media.id}
                            original={media.file_name}
                            thumbnail={media.file_name}
                            width="1024"
                            height="768"
                            caption={media.name}
                          >
                            {({ ref, open }) => (
                              <div
                                ref={ref}
                                onClick={open}
                                className="relative w-full h-48 sm:h-64 cursor-pointer"
                              >
                                <Image
                                  src={media.file_name}
                                  alt={media.name}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-lg"
                                />
                              </div>
                            )}
                          </Item>
                        ))}
                      </div>
                    </Gallery>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={closeModal}>Close</button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalItemView;
