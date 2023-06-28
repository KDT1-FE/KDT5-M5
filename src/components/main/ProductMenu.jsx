import React, { useState, useEffect } from 'react'
import './productMenu.css'
import ProductList from './ProductList'
import { getProducts } from '../../store/AdminAPI'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ProductMenu = ({ category }) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function productData() {
      const res = await getProducts()

      let productsCategory = res
      if (category) {
        productsCategory = res.filter(product => product.tags[0] === category)
      }

      setProducts(productsCategory)
      setIsLoading(false)
    }

    productData()
  }, [category])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  const handleCategoryClick = () => {
    navigate(`/product/${category}`)
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable: false
  }

  return (
    <>
      <div className="product-category">
        <h2 onClick={handleCategoryClick}>{category}</h2>
      </div>
      <div className="product-container">
        <Slider {...settings}>
          {products.map(product => (
            <ProductList
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
              tags={product.tags}
            />
          ))}
        </Slider>
      </div>
    </>
  )
}

export default ProductMenu
