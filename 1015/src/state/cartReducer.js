export const initialState = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // ADD_ITEM: 새 상품은 수량 1로 추가하고, 이미 있으면 수량을 1 늘립니다.
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }
    case 'INCREASE_QUANTITY':
      // INCREASE_QUANTITY: 해당 상품을 찾아 새 객체로 바꾸며 수량을 1 늘립니다.
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }
    case 'DECREASE_QUANTITY':
      // DECREASE_QUANTITY: 수량이 1보다 클 때만 줄여 최소 수량 1을 지킵니다.
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      }
    case 'REMOVE_ITEM':
      // REMOVE_ITEM: 선택한 상품을 제외한 새 배열을 만듭니다.
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case 'CLEAR_CART':
      // CLEAR_CART: 모든 상품을 비운 새 배열을 만듭니다.
      return { ...state, items: [] }
    default:
      return state
  }
}
