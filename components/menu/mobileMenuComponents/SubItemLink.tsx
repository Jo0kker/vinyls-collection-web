import React from 'react';

const SubItemLink = (
    { name, href, icon }: { name: string, href: string, icon: JSX.Element }
) => {
    return (
        <button type="button"
            className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
            New
        </button>
    );
};

export default SubItemLink;
