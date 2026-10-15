import CartItem from './CartItem.jsx'
import { formatPrice } from '../utils/formatPrice.js'

function CartPanel({ items, itemCount, totalPrice, dispatch }) {
  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <div className="cart-header">
        <div>
          <p className="section-kicker">MY CART</p>
          <h2 id="cart-heading">장바구니 <span className="heading-count">{itemCount}</span></h2>
        </div>
        <button
          className="button button-destructive clear-button"
          type="button"
          disabled={items.length === 0}
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
        >
          Clear Cart
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-mark" aria-hidden="true">00</span>
          <p className="empty-title">장바구니가 비어있습니다</p>
          <p className="empty-description">상품 목록에서 원하는 상품을 담아보세요.</p>
        </div>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} dispatch={dispatch} />
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <div className="summary-row">
          <span>담긴 상품</span>
          <span>{itemCount}개</span>
        </div>
        <div className="summary-total">
          <span>총 금액</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
      </div>
    </section>
  )
}

export default CartPanel
