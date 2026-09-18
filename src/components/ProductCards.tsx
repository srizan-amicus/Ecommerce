import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      
      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* Product Details */}
      <div className="product-info">

        {/* Product Name */}
        <h2 className="product-name">
          {product.name}
        </h2>

        {/* Product SKU */}
        <p className="product-sku">
          #{product.id.toString().padStart(8, "0")}
        </p>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">
            ★★★★★
          </span>

          <span className="rating-value">
            {product.rating ?? 0} (1)
          </span>
        </div>

        {/* Quantity */}
        <div className="quantity-container">
          <span className="quantity-label">
            QTY:
          </span>

          <input
            type="number"
            value="1"
            min="1"
            readOnly
          />
        </div>

        {/* Add To Cart */}
        <button className="add-to-cart">
          ADD TO CART
        </button>

        {/* Shopping List */}
        <button className="shopping-list">
          + SHOPPING LIST
        </button>

      </div>
    </article>
  );
}

export default ProductCard;