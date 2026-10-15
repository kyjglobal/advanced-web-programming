import { useReducer } from 'react'
import SiteHeader from './components/SiteHeader.jsx'
import ProductList from './components/ProductList.jsx'
import CartPanel from './components/CartPanel.jsx'
import { products } from './data/products.js'
import { cartReducer, initialState } from './state/cartReducer.js'

function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialState)
  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0)
  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="app-shell">
      <SiteHeader itemCount={itemCount} />

      <main className="page-container">
        <div className="page-intro">
          <p className="eyebrow">SHOPPING CART</p>
          <h1>필요한 상품을<br />간편하게 담아보세요.</h1>
          <p className="intro-description">상품을 고르고 수량을 조절해 장바구니를 완성해보세요.</p>
        </div>

        <div className="content-grid">
          <ProductList products={products} dispatch={dispatch} />
          <CartPanel
            items={cart.items}
            itemCount={itemCount}
            totalPrice={totalPrice}
            dispatch={dispatch}
          />
        </div>
      </main>
    </div>
  )
}

export default App
