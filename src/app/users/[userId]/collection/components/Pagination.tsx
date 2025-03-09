import { cn } from '@/utils/classNames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-duotone-svg-icons'

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

type PageItem = number | '...'

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const getVisiblePages = () => {
        const delta = 2; // Nombre de pages à afficher de chaque côté de la page courante
        const range: number[] = [];
        const rangeWithDots: PageItem[] = [];
        let l: number | undefined;

        // Toujours inclure la première page
        range.push(1);

        // Calculer les pages à afficher
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i < totalPages && i > 1) {
                range.push(i);
            }
        }

        // Toujours inclure la dernière page si elle existe
        if (totalPages > 1) {
            range.push(totalPages);
        }

        // Ajouter les points de suspension
        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    return (
        <div className="flex justify-center gap-2 mt-4 mb-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    "p-2 rounded-lg transition-colors",
                    currentPage === 1 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700"
                )}
            >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>

            {getVisiblePages().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                    className={cn(
                        "px-4 py-2 rounded-lg transition-colors",
                        typeof page === 'number'
                            ? currentPage === page
                                ? "bg-fuchsia-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700"
                            : "bg-transparent text-gray-400 cursor-default"
                    )}
                    disabled={typeof page !== 'number'}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    "p-2 rounded-lg transition-colors",
                    currentPage === totalPages 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700"
                )}
            >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
        </div>
    )
}