import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY, USER_NAME } from './src/store/Base'
import { addProduct } from './src/store/AdminAPI'

const AddProductPage = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    tags: '',
    thumbnailFile: null,
    photoFile: null,
    discountRate: ''
  })

  const [addedProducts, setAddedProducts] = useState([])

  useEffect(() => {
    // Fetch and set the added products here if needed
  }, [])

  const HEADERS = {
    'content-type': 'application/json',
    apikey: API_KEY,
    username: USER_NAME,
    masterKey: 'true'
  }

  const PRODUCT = `${BASE_URL}/products`

  const handleInputChange = e => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleFileChange = e => {
    const { name, files } = e.target
    setProduct({ ...product, [name]: files[0] })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let thumbnailBase64 = ''
      if (product.thumbnailFile) {
        thumbnailBase64 = await convertFileToBase64(product.thumbnailFile)
      }

      let photoBase64 = ''
      if (product.photoFile) {
        photoBase64 = await convertFileToBase64(product.photoFile)
      }

      const requestBody = {
        title: product.title,
        price: parseFloat(product.price),
        description: product.description,
        tags: product.tags.split(','),
        thumbnailBase64,
        photoBase64,
        discountRate: parseInt(product.discountRate)
      }

      const addedProduct = await addProduct(requestBody)
      setAddedProducts([...addedProducts, addedProduct])
      console.log(addedProduct)

      // Reset the form fields after successful addition
      setProduct({
        title: '',
        price: '',
        description: '',
        tags: '',
        thumbnailFile: null,
        photoFile: null,
        discountRate: ''
      })

      // Do something with the added product, e.g., redirect to a success page
    } catch (error) {
      console.error('An error occurred while adding the product.', error)
      alert('Failed to add product. Please try again.')
      throw error
    }
  }

  const convertFileToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = error => reject(error)
    })
  }

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleInputChange}
          required
        />
        <br />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          required
        />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          required></textarea>
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={product.tags}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="thumbnailFile">Thumbnail Image:</label>
        <input
          type="file"
          id="thumbnailFile"
          name="thumbnailFile"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br />

        <label htmlFor="photoFile">Photo Image:</label>
        <input
          type="file"
          id="photoFile"
          name="photoFile"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br />

        <label htmlFor="discountRate">Discount Rate:</label>
        <input
          type="number"
          id="discountRate"
          name="discountRate"
          value={product.discountRate}
          onChange={handleInputChange}
        />
        <br />

        <button type="submit">Add Product</button>
      </form>

      <h2>Added Products</h2>
      {addedProducts.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <ul>
          {addedProducts.map(addedProduct => (
            <li key={addedProduct.id}>
              {addedProduct.title} - {addedProduct.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddProductPage
