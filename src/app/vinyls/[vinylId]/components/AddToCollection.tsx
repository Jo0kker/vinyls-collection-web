'use client';

import { useCallback, useEffect, useState } from 'react'

import { Badge, Modal } from 'flowbite-react'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import AsyncSelect from 'react-select/async'

import { Collection, Vinyl } from '@/types'
import { fetchAPI } from '@/utils/fetchAPI'
import { showToast } from '@/utils/toast';

const AddToCollection = ({ vinyl }: {vinyl: Vinyl}) => {
    const session = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [initialOptions, setInitialOptions] = useState<{ label?: string; value?: string }[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<{ label: string; value: string }[] | null>(null);

    // Fonction pour rechercher les collections
    const fetchCollections = async (search: string) => {
        if (!session.data) return [];

        const filters = [
            {
                field: 'user.id',
                operator: '=',
                value: `${session.data.user.id}`,
            },
        ];

        if (search.trim() !== '') {
            filters.push({
                field: 'name',
                operator: 'like',
                value: `%${search}%`,
            });
        }

        const response = await fetchAPI('/collections/search', {
            method: 'POST',
            body: JSON.stringify({ search: { filters , limit: 10 } }),
            headers: {
                'Authorization': `Bearer ${session.data.user.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.map((collection: Collection) => ({
            label: collection.name,
            value: collection.id,
        }));
    };

    // Initial fetch to populate default options
    useEffect(() => {
        const loadInitialOptions = async () => {
            const options = await fetchCollections('');
            setInitialOptions(options);
        };

        if (session.data) {
            loadInitialOptions();
        }
    }, [session]);

    // Debounced version of fetchCollections
    const debouncedFetchCollections = useCallback(debounce(fetchCollections), [session]);

    const handleInputChange = (value: string) => {
        setSearchValue(value);
    };

    if (!session.data) return null;

    const handleAddToCollection = () => {
        if (!selectedOptions) return;

        const collectionIds = selectedOptions.map((option) => option.value);

        const data: any = { mutate: [] };

        for (const collectionId of collectionIds) {
            data.mutate.push({
                operation: 'create',
                attributes: {
                    collection_id: collectionId,
                    vinyl_id: vinyl.id,
                },
            });
        }

        fetchAPI('/collectionVinyl/mutate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${session.data.user.access_token}`,
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setIsOpen(false);
            showToast({
                type: 'success',
                message: 'Vinyle ajouté à la collection',
            });
        }).catch((error) => {
            showToast({
                type: 'error',
                message: JSON.parse(error.message).message,
            });
        });
    }

    return (
        <>
            <button className="p-0" onClick={() => setIsOpen(true)}>
                <Badge color="blue" className="text-black">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 640 512">
                            <path d="M0 256C0 164.5 48.8 80 128 34.3s176.8-45.7 256 0c60.3 34.8 103 92.1 119.9 157.9c-2.6-.1-5.3-.2-7.9-.2c-60 0-113 30-144.7 75.8c.5-3.9 .7-7.8 .7-11.8c0-34.3-18.3-66-48-83.1s-66.3-17.1-96 0s-48 48.8-48 83.1s18.3 66 48 83.1s66.3 17.1 96 0c8.4-4.8 15.8-10.8 22.2-17.7c-4.1 14.8-6.2 30.4-6.2 46.5c0 45.9 17.6 87.6 46.4 119c-75.7 36.2-164.9 33.1-238.4-9.3C48.8 432 0 347.5 0 256zm64 0l32 0c0-88.4 71.6-160 160-160l0-32C150 64 64 150 64 256zm160 0c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm64-16l0 32 64 0 0 64 32 0 0-64 64 0 0-32-64 0 0-64-32 0 0 64-64 0z" />
                        </svg>
                        Ajouter à une collection
                    </div>
                </Badge>
            </button>

            <Modal id="modal-add-to-collection" title="Add to collection" size="sm" show={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header>Choix de la collection</Modal.Header>
                <Modal.Body>
                    <div className="flex items-center justify-center">
                        <div className="w-full">
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold" htmlFor="collection">Collection</label>
                                <AsyncSelect
                                    className="z-20"
                                    isMulti
                                    isClearable
                                    onChange={(options) => {
                                        if (Array.isArray(options)) {
                                            setSelectedOptions(options);
                                        }
                                    }}
                                    defaultOptions={initialOptions} // Pass initial data here
                                    loadOptions={debouncedFetchCollections}
                                    onInputChange={handleInputChange}
                                    menuPosition="fixed" // Position fixe du menu déroulant
                                    styles={{
                                        menu: (provided) => ({ ...provided, zIndex: 1050 }),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleAddToCollection}>Ajouter</button>
                    <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>Annuler</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddToCollection;
