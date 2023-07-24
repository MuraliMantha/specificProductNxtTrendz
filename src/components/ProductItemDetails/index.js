// Write your code here
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import SimilarProducts from '../SimilarProductItem'

import Header from '../Header'
import './index.css'

const apiStats = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    status: apiStats.initial,
    productItemList: {},
    similarProductList: [],
    count: 1,
  }

  componentDidMount() {
    this.getProductItem()
  }

  getProductItem = async () => {
    const {productItemList, similarProductList} = this.state
    this.setState({status: apiStats.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        title: fetchedData.title,
        price: fetchedData.price,
        description: fetchedData.description,
        brand: fetchedData.brand,
        totalReviews: fetchedData.total_reviews,
        rating: fetchedData.rating,
        availability: fetchedData.availability,
        similarProducts: fetchedData.similar_products,
      }

      const updatedSimilarProduct = fetchedData.similar_products.map(
        eachProduct => ({
          id: eachProduct.id,
          imageUrl: eachProduct.image_url,
          style: eachProduct.style,
          title: eachProduct.title,
          price: eachProduct.price,
          description: eachProduct.description,
          brand: eachProduct.brand,
          totalReviews: eachProduct.total_reviews,
          rating: eachProduct.rating,
          availability: eachProduct.availability,
        }),
      )

      this.setState({
        status: apiStats.success,
        productItemList: updatedData,
        similarProductList: updatedSimilarProduct,
      })
      console.log(productItemList)
      console.log(similarProductList)
    } else {
      this.setState({status: apiStats.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onPlus = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDash = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  renderProductItemView = () => {
    const {productItemList, similarProductList, count} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productItemList

    return (
      <>
        <Header />
        <div>
          <div className="bg-product-item-container">
            <img
              src={imageUrl}
              className="image-icon"
              alt={`product ${title}`}
            />

            <div className="product-text-container">
              <h1 className="head">{title}</h1>
              <p className="rate">Rs. {price}/-</p>
              <div className="ratings-reviews">
                <div className="rating-container1">
                  <p className="rating1">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star1"
                  />
                </div>
                <p className="reviews">{totalReviews} Reviews</p>
              </div>
              <p className="description">{description}</p>
              <p className="availability">Available: {availability}</p>
              <p className="similarProducts">Brand: {brand}</p>
              <hr />
              <div className="increase-decrease">
                <button
                  type="button"
                  className="buttonbtn"
                  data-testid="minus"
                  onClick={this.onDash}
                >
                  <BsDashSquare className="dash" />
                </button>
                <p className="count">{count}</p>
                <button
                  type="button"
                  className="buttonbtn"
                  data-testid="plus"
                  onClick={this.onPlus}
                >
                  <BsPlusSquare className="plus" />
                </button>
              </div>
              <button type="button" className="add-to-cart">
                Add To Cart
              </button>
            </div>
          </div>
          <h1 className="similar-products">Similar Products</h1>
          <ul className="similar-container">
            {similarProductList.map(eachProduct => (
              <SimilarProducts eachProduct={eachProduct} key={eachProduct.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <>
      <Header />
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          className="failure-image"
          alt="failure view"
        />
        <h1>Product Not Found</h1>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case apiStats.success:
        return this.renderProductItemView()
      case apiStats.failure:
        return this.renderFailure()
      case apiStats.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default ProductItemDetails
