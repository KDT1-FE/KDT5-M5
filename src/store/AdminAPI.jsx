import { adminHEADERS, AUTH, PRODUCT } from './Base'

// 사용자 목록 조회
export const getUserList = async () => {
  try {
    const res = await fetch(`${AUTH}/users`, {
      method: 'GET',
      headers: adminHEADERS
    })
    if (res.ok) {
      const userList = await res.json()
      console.log(userList)
      return userList
    } else {
      throw new Error('사용자 목록 조회에 실패했습니다.')
    }
  } catch (error) {
    console.error('사용자 목록을 불러오는 동안 오류가 발생했습니다.', error)
    alert('사용자 목록을 불러오는데 실패했습니다. 다시 시도해주세요.')
    throw error
  }
}

// 상품 추가
export const addProduct = async product => {
  try {
    const res = await fetch(`${PRODUCT}`, {
      method: 'POST',
      headers: adminHEADERS,
      body: JSON.stringify(product)
    })
    if (res.ok) {
      const addedProduct = await res.json()
      console.log(addedProduct)
      return addedProduct
    } else {
      throw new Error('상품 추가에 실패했습니다.')
    }
  } catch (error) {
    console.error('상품을 추가하는 동안 오류가 발생했습니다.', error)
    alert('상품을 추가하는데 실패했습니다. 다시 시도해주세요.')
    throw error
  }
}

// 상품 수정
export const updateProduct = async (productId, updatedData) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: adminHEADERS,
      body: JSON.stringify(updatedData)
    })
    if (res.ok) {
      const updatedProduct = await res.json()
      console.log(updatedProduct)
      return updatedProduct
    } else {
      throw new Error('상품 수정에 실패했습니다.')
    }
  } catch (error) {
    console.error('상품을 수정하는 동안 오류가 발생했습니다.', error)
    alert('상품을 수정하는데 실패했습니다. 다시 시도해주세요.')
    throw error
  }
}

// 상품 삭제
export const deleteProduct = async productId => {
  try {
    const res = await fetch(`${PRODUCT}/${productId}`, {
      method: 'DELETE',
      headers: adminHEADERS
    })
    if (res.ok) {
      return true
    } else {
      throw new Error('상품 삭제에 실패했습니다.')
    }
  } catch (error) {
    console.error('상품을 삭제하는 동안 오류가 발생했습니다.', error)
    alert('상품을 삭제하는데 실패했습니다. 다시 시도해주세요.')
    throw error
  }
}

// 모든 상품 조회
export const getProducts = async () => {
  try {
    const res = await fetch(`${PRODUCT}`, {
      method: 'GET',
      headers: adminHEADERS
    })
    if (res.ok) {
      const products = await res.json()
      console.log(products)
      return products
    } else {
      throw new Error('상품 조회에 실패했습니다.')
    }
  } catch (error) {
    console.error('상품을 불러오는 동안 오류가 발생했습니다.', error)
    alert('상품을 불러오는데 실패했습니다. 다시 시도해주세요.')
    throw error
  }
}
