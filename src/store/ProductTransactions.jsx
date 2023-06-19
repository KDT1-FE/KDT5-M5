import { adminHEADERS, TRANJACTION, PRODUCT, userHEADERS } from './Base'
import { getAccessToken } from './localStorage'

const accessToken = getAccessToken()

// 제품 구매 신청
export const buyProducts = async (productId, accountId) => {
  try {
    const res = await fetch(`${PRODUCT}/buy`, {
      method: 'POST',
      headers: {
        ...userHEADERS,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        productId,
        accountId
      })
    })

    if (res.ok) {
      const buyProduct = await res.json()
      return buyProduct
    } else {
      const err = await res.json()
      throw new Error(
        err.message || '제품 구매에 실패했습니다. 다시 시도해주세요.'
      )
    }
  } catch (err) {
    alert('제품 구매에 실패했습니다. 다시 시도해주세요.')
    throw err
  }
}

// 제품 구매 취소
export const cancelProducts = async detailId => {
  try {
    const res = await fetch(`${PRODUCT}/cancel`, {
      method: 'POST',
      headers: {
        ...userHEADERS,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        detailId
      })
    })

    if (res.ok) {
      const cancelProduct = await res.json()
      return cancelProduct
    } else {
      const err = await res.json()
      throw new Error(
        err.message || '제품 구매 취소에 실패했습니다. 다시 시도해주세요.'
      )
    }
  } catch (err) {
    alert('제품 구매 취소에 실패했습니다. 다시 시도해주세요.')
    throw err
  }
}

// 제품 구매 확정
export const confirm = async detailId => {
  try {
    const res = await fetch(`${PRODUCT}/ok`, {
      method: 'POST',
      headers: {
        ...userHEADERS,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        detailId
      })
    })

    if (res.ok) {
      const confirmData = await res.json()
      return confirmData
    } else {
      const err = await res.json()
      throw new Error(
        err.message || '제품 구매 확정에 실패했습니다. 다시 시도해주세요.'
      )
    }
  } catch (err) {
    alert('제품 구매 확정에 실패했습니다. 다시 시도해주세요.')
    throw err
  }
}

// 전체 제품 판매 내역
export const transactionsAll = async () => {
  try {
    const res = await fetch(`${TRANJACTION}/all`, {
      method: 'GET',
      headers: {
        ...adminHEADERS
      }
    })

    if (res.ok) {
      const transactionData = await res.json()
      return transactionData
    } else {
      const err = await res.json()
      throw new Error(
        err.message ||
          '전체 제품 판매 내역을 불러오는데 실패했습니다. 다시 시도해주세요.'
      )
    }
  } catch (err) {
    alert('전체 제품 판매 내역을 불러오는데 실패했습니다. 다시 시도해주세요.')
    throw err
  }
}

// 판매내역 완료/취소 해제
export const transactionsDetail = async (detailId, isCanceled, done) => {
  try {
    const res = await fetch(`${TRANJACTION}/${detailId}`, {
      method: 'PUT',
      headers: {
        ...adminHEADERS
      },
      body: JSON.stringify({
        isCanceled,
        done
      })
    })

    if (res.ok) {
      const data = await res.json()
      return data
    } else {
      const err = await res.json()
      throw new Error(err.message || '거래 업데이트에 실패했습니다.')
    }
  } catch (err) {
    alert('상품 거래 완료 정보를 가져오는데 실패했습니다. 다시 시도해주세요.')
    throw err
  }
}
