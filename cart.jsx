const shoppingCartStore = {
  setLocalStorage(product) {
    localStorage.setItem('shoppingCart', JSON.stringify(product))
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || []
  },
  removeLocalStorage() {
    return localStorage.removeItem('shoppingCart')
  },
  clearLocalStorage() {
    localStorage.clear()
  }
}

const productInCart = (id, price, count, thumbnail, title, pricePerOne) => {
  let shoppingCartArr = shoppingCartStore.getLocalStorage()
  // id 값을 찾음
  const existingItem = shoppingCartArr.find(item => item.id === id)
  // 새로운 상품인 경우 추가
  if (!existingItem) {
    shoppingCartArr.push({ id, price, count, thumbnail, title, pricePerOne })
    shoppingCartStore.setLocalStorage(shoppingCartArr)

    return
  } else if (existingItem) {
    // 이미 있는 상품인 경우 수량과 가격을 누적하여 추가
    existingItem.count += count
    existingItem.price += pricePerOne * count
    shoppingCartStore.setLocalStorage(shoppingCartArr)
    return
  }
}
