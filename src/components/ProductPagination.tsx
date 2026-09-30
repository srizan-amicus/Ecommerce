interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md px-3 py-2 text-orange-500 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        &lt; Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-md px-3 py-2 transition ${
              currentPage === page
                ? "bg-orange-500 font-medium text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md px-3 py-2 text-orange-500 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next &gt;
      </button>
    </div>
  );
}

export default ProductPagination;