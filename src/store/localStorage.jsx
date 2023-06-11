// accessToken을 localStorage에 저장
export const saveAccessToken = accessToken => {
  localStorage.setItem('accessToken', accessToken)
}

// localStorage에서 accessToken 검색
export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

// localStorage에서 accessToken 제거
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken')
}
