import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const displayPages = 4; // Number of pages to display

    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
    let endPage = Math.min(totalPages, startPage + displayPages - 1);

    if (endPage - startPage + 1 < displayPages) {
        startPage = Math.max(1, endPage - displayPages + 1);
    }

    // Generate an array of page numbers to display
    const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
        (num) => startPage + num
    );

    return (
        <nav className="flex items-center justify-center my-4">
            <ul className="flex space-x-2">
                <li>
                    <button
                        className="bg-[#959EAD] text-white disabled:cursor-not-allowed disabled:bg-[#b6bcc5] rounded px-2 py-1 disabled:text-brand_white-500"
                        disabled={currentPage <= 1 ? true : false}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Prev
                    </button>
                </li>

                {startPage > 1 && (
                    <li>
                        <button
                            className="border rounded px-2 py-1"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                    </li>
                )}

                {startPage > 2 && (
                    <li>
                        <span className="px-2 py-1">...</span>
                    </li>
                )}

                {pageNumbers.map((page) => (
                    <li key={page}>
                        <button
                            className={`border rounded px-2 py-1 ${page === currentPage ? "bg-primary-500 text-white" : ""
                                }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {endPage < totalPages - 1 && (
                    <li>
                        <span className="px-2 py-1">...</span>
                    </li>
                )}

                {endPage < totalPages && (
                    <li>
                        <button
                            className="border rounded px-2 py-1"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </li>
                )}
                <li>
                    <button
                        className="bg-[#959EAD] text-white disabled:cursor-not-allowed disabled:bg-[#b6bcc5] rounded px-2 py-1 disabled:text-brand_white-500"
                        disabled={currentPage < totalPages ? false : true}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
