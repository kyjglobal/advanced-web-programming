import ProductCard from './ProductCard.jsx'

function ProductList({ products, dispatch }) {
  return (
    <section className="product-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <p className="section-kicker">PRODUCTS</p>
          <h2 id="products-heading">상품 목록 <span className="heading-count">{products.length}</span></h2>
        </div>
        <p className="section-note">마음에 드는 상품을 담아보세요</p>
      </div>

      <ul className="product-list">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            dispatch={dispatch}
          />
        ))}
      </ul>
    </section>
  )
}

export default ProductList
