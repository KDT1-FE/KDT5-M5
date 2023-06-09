import { BASE_URL, API_KEY, USER_NAME } from './Base'

const HEADERS = {
  'content-type': 'application/json',
  apikey: API_KEY,
  username: USER_NAME
}

const AUTH = `${BASE_URL}/auth`

// 제품 검색
export const searchProducts = async requestBody => {
  try {
    const res = await fetch(`${PRODUCT}/search`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(requestBody)
    })
    // 제품 검색이 성공적으로 동작
    if (res.ok) {
      const searchResults = await res.json()
      console.log(searchResults)
      return searchResults
    } else {
      // 제품 검색 실패
      throw new Error('제품 검색에 실패했습니다.')
    }
  } catch (error) {
    // 에러 코드 추출
    console.error('제품 검색 중 오류가 발생했습니다.', error)
    alert('제품 검색에 실패했습니다. 다시 시도해 주세요.')
    throw error
  }
}

// 회원 가입
export const signUp = async UserSignUpData => {
  const res = await fetch(`${AUTH}/signup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      email: UserSignUpData.email,
      password: UserSignUpData.password,
      displayName: UserSignUpData.displayName
    })
  })
  // 회원 가입 성공
  if (res.ok) {
    const userSignUp = await res.json()
    const accessToken = userSignUp.accessToken
    saveAccessToken(accessToken) // accessToken을 localStorage에 저장
    console.log(userSignUp)
    return userSignUp
  }
  try {
    // 에러 메시지 추출
    const err = await res.json()
    return err
  } catch (err) {
    // 에러 메시지 반환
    console.log(err)
    return alert('로그인에 실패했습니다. 다시 시도해주세요.')
  }
}

// 로그인
export const logIn = async UserLogInData => {
  const res = await fetch(`${AUTH}/login`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      email: UserLogInData.email,
      password: UserLogInData.password
    })
  })
  // 로그인 성공
  if (res.ok) {
    const userLoggedIn = await res.json()
    const accessToken = userLoggedIn.accessToken
    saveAccessToken(accessToken) // accessToken을 localStorage에 저장
    console.log(userLoggedIn)
    return userLoggedIn
  }
  try {
    const err = await res.json()
    return err
  } catch (err) {
    console.log(err)
    return alert('로그인에 실패했습니다. 다시 시도해주세요.')
  }
}

// 로그아웃
export const logOut = async () => {
  const accessToken = getAccessToken() // localStorage에서 accessToken 검색
  const res = await fetch(`${AUTH}/logout`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${accessToken}`
    }
  })
  // 로그아웃 성공
  if (res.ok) {
    const userLoggedOut = await res.json()
    removeAccessToken() // localStorage에서 accessToken 제거
    console.log(userLoggedOut)
    return userLoggedOut
  }
  try {
    const err = await res.json()
    return err
  } catch (err) {
    console.log(err)
    return alert('로그아웃에 실패했습니다. 다시 시도해주세요.')
  }
}

// 사용자 정보 변경
export const userInfo = async () => {
  const accessToken = getAccessToken() // localStorage에서 accessToken 검색
  const res = await fetch(`${AUTH}/user`, {
    method: 'PUT',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${accessToken}`
    }
  })
  if (res.ok) {
    const userData = await res.json()
    console.log(userData)
    return userData
  }
  try {
    const err = await res.json()
    return err
  } catch (err) {
    console.log(err)
    return alert('사용자 정보 변경에 실패했습니다. 다시 시도해주세요.')
  }
}

// accessToken을 localStorage에 저장
const saveAccessToken = accessToken => {
  localStorage.setItem('accessToken', accessToken)
}

// localStorage에서 accessToken 검색
const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

// localStorage에서 accessToken 제거
const removeAccessToken = () => {
  localStorage.removeItem('accessToken')
}
