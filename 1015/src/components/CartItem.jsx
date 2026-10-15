import { formatPrice } from '../utils/formatPrice.js'

function CartItem({ item, dispatch }) {
  return (
    <li className="cart-item">
      <div className="cart-item-top">
        <div>
          <h3>{item.name}</h3>
          <p className="unit-price">개당 {formatPrice(item.price)}</p>
        </div>
        <button
          className="button button-destructive remove-button"
          type="button"
          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
          aria-label={`${item.name} 삭제`}
        >
          Remove
        </button>
      </div>
      <div className="cart-item-bottom">
        <div className="quantity-control" aria-label={`${item.name} 수량 ${item.quantity}개`}>
          <button
            type="button"
            aria-label={`${item.name} 수량 감소`}
            disabled={item.quantity === 1}
            onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            aria-label={`${item.name} 수량 증가`}
            onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
          >
            +
          </button>
        </div>
        <strong className="line-total">{formatPrice(item.price * item.quantity)}</strong>
      </div>
    </li>
  )
}

export default CartItem
