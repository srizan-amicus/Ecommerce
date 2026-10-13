import Button from "../Common/Button";
import { ButtonVariant } from "../../enums/button";

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
  const paginationButtonStyles =
    "!min-h-9 !w-auto !min-w-9 !rounded-md !px-3 !py-2 !text-xs";

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
      <Button
        type="button"
        variant={ButtonVariant.Compact}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${paginationButtonStyles} text-orange-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        &lt; Previous
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = currentPage === page;

        return (
          <Button
            key={page}
            type="button"
            variant={isActive ? ButtonVariant.Primary : ButtonVariant.Compact}
            onClick={() => onPageChange(page)}
            ariaLabel={`Go to page ${page}`}
            className={`${paginationButtonStyles} ${
              isActive
                ? "!bg-orange-500 !text-white hover:!bg-orange-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </Button>
        );
      })}

      <Button
        type="button"
        variant={ButtonVariant.Compact}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${paginationButtonStyles} text-orange-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Next &gt;
      </Button>
    </div>
  );
}

export default ProductPagination;
