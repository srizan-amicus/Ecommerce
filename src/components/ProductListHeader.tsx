import Button from "./Button";
import { ButtonVariant } from "../enums/button";

interface ProductListHeaderProps {
  searchTerm: string;
  productCount: number;
  loading: boolean;
  onRefresh: () => void;
}

function ProductListHeader({
  searchTerm,
  productCount,
  loading,
  onRefresh,
}: ProductListHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Listing</h1>

        <p className="mt-1 text-xs text-gray-500">
          Browse and find products you like
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-xs text-gray-500">
          {searchTerm
            ? `Showing ${productCount} results for "${searchTerm}"`
            : `Showing ${productCount} results`}
        </p>

        <Button
          variant={ButtonVariant.Primary}
          onClick={onRefresh}
          disabled={loading}
          className="!h-10 !w-full !min-w-0 px-4 text-sm sm:!w-48"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
    </div>
  );
}

export default ProductListHeader;
