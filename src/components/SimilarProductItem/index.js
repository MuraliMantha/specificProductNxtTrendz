// Write your code here
import './index.css'

const SimilarProducts = props => {
  const {eachProduct} = props
  const {imageUrl, title, price, brand, rating} = eachProduct

  return (
    <li className="similar-products-container">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-product-image"
      />
      <h1 className="head-title">{title}</h1>
      <p className="brand-para">by {brand}</p>
      <div className="ratings-price">
        <p className="rate">Rs {price}/- </p>
        <div className="rating-container2">
          <p className="rating2">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star2"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProducts
