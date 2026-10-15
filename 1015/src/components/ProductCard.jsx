import { formatPrice } from '../utils/formatPrice.js'

function ProductCard({ product, index, dispatch }) {
  return (
    <li className="product-card">
      <div className="product-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{formatPrice(product.price)}</p>
      </div>
      <button
        className="button button-secondary add-button"
        type="button"
        onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
        aria-label={`${product.name} 장바구니에 담기`}
      >
        Add to Cart <span aria-hidden="true">+</span>
      </button>
    </li>
  )
}

export default ProductCard
