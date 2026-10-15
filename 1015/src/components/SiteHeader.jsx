function SiteHeader({ itemCount }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <span className="brand">1015<span className="brand-dot">.</span></span>
        <span className="topbar-label">Shopping Cart</span>
        <span className="cart-count" aria-label={`장바구니 상품 ${itemCount}개`}>
          장바구니 <strong>{itemCount}</strong>
        </span>
      </div>
    </header>
  )
}

export default SiteHeader
