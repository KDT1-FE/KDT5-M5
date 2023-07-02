import axios from 'axios'

const requestAdmin = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api',
  headers: {
    'content-type': 'application/json',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Team4',
    masterKey: true,
  },
})

//사용자 목록 조회 // auth/users
export const getUserList = async (): Promise<User[]> => {
  try {
    const { data } = await requestAdmin.get('auth/users')
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to load user list')
    return []
  }
}

//모든 제품 조회 // products
export const getProductList = async (): Promise<Product[]> => {
  try {
    const { data } = await requestAdmin.get('products')
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to load product list')
    return []
  }
}

// 전체 거래 내역 조회 // products/transactions/all
export const getPurchaseList = async (): Promise<TransactionDetail[]> => {
  try {
    const { data } = await requestAdmin.get('products/transactions/all')
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to load transaction list')
    return []
  }
}

//거래 내역 완료/취소/해제 // products/transactions/:detailId
export const editPurchase = async (
  id: string,
  { isCanceled, done }: { isCanceled: boolean; done: boolean },
): Promise<boolean> => {
  try {
    const { data } = await requestAdmin.put('products/transactions/' + id, {
      isCanceled: isCanceled,
      done: done,
    })
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to edit purchase')
    return false
  }
}

//단일제품상세조회 // products/:productId
export const getProduct = async (id: string): Promise<ProductDetails | boolean> => {
  try {
    const { data } = await requestAdmin.get('products/' + id)
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to load product')
    return false
  }
}

//제품 추가 // products
export const addProduct = async (payload: AddProduct): Promise<Product | boolean> => {
  try {
    const { data } = await requestAdmin.post('products', payload)
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to add product')
    return false
  }
}

//제품 수정 // products/:productId
export const editProduct = async (id: string, payload: EditProduct): Promise<Product | boolean> => {
  try {
    const { data } = await requestAdmin.put('products/' + id, payload)
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to edit product')
    return false
  }
}

//제품 삭제 // products/:productId
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { data } = await requestAdmin.delete('products/' + id)
    return data
  } catch (error) {
    console.warn(error)
    console.warn('fail to delete product')
    return false
  }
}

//사용자 목록 조회 응답
export interface User {
  email: string // 사용자 아이디
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}

//단일 제품 상세 응답
export interface ProductDetails {
  // 제품의 상세 내용
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 상세 설명
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  photo: string | null // 제품 상세 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부
  reservations: Reservation[] // 제품의 모든 예약 정보 목록
  discountRate: number // 제품 할인율
}

//모든 제품 조회 응답
export interface Product {
  // 제품 정보
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 설명(최대 100자)
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  photo: string | null
  isSoldOut: boolean // 제품 매진 여부
  discountRate: number // 제품 할인율
}

//전체 거래 내역 조회 응답
export interface TransactionDetail {
  // 거래 내역 정보
  detailId: string // 거래 내역 ID
  user: {
    // 거래한 사용자 정보
    email: string
    displayName: string
    profileImg: string | null
  }
  account: {
    // 거래한 사용자의 계좌 정보
    bankName: string
    bankCode: string
    accountNumber: string
  }
  product: {
    // 거래한 제품 정보
    productId: string
    title: string
    price: number
    description: string
    tags: string[]
    thumbnail: string | null
    discountRate: number
  }
  reservation: Reservation | null // 거래한 제품의 예약 정보
  timePaid: string // 제품을 거래한 시간
  isCanceled: boolean // 거래 취소 여부
  done: boolean // 거래 완료 여부
}

interface Reservation {
  start: string // 예약 시작 시간
  end: string // 예약 종료 시간
  isCanceled: boolean // 예약 취소 여부
  isExpired: boolean // 예약 만료 여부
}

//거래 내역 완료/취소/해제 요청 타입
export interface PurchaseList {
  isCanceled?: boolean // 거래 취소 여부 (사용자의 '제품 거래(구매) 취소' 상태와 같습니다)
  done?: boolean // 거래 완료 여부 (사용자의 '제품 거래(구매) 확정' 상태와 같습니다)
}

//제품 추가 요청 타입
export interface AddProduct {
  title: string // 제품 이름 (필수!)
  price: number // 제품 가격 (필수!)
  description: string // 제품 상세 설명 (필수!)
  tags?: string[] // 제품 태그
  thumbnailBase64?: string // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
  discountRate?: number // 제품 할인율
}

//제품 수정 요청 타입
export interface EditProduct {
  title?: string // 제품 이름
  price?: number // 제품 가격
  description?: string // 제품 상세 설명
  tags?: string[] // 제품 태그
  thumbnailBase64?: string // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
  isSoldOut?: boolean // 제품 매진 여부
  discountRate?: number // 제품 할인율
}
