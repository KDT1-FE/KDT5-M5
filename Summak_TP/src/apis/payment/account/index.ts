import api from '@/apis'
import { AccountConnectionRequest, AccountClouserRequest, AccountsBalance } from '@/types/account'

// 선택가능한 계좌목록 조회(계좌연결 전에)
export const getSelectableAccounts = async (accessToken: string) => {
  try {
    const response = await api({
      method: 'GET',
      url: '/api/account/banks',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

// 연결된 계좌 조회
export const getConnectedAccounts = async (accessToken: string) => {
  try {
    const response = await api({
      method: 'GET',
      url: '/api/account',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    return {}
  }
}

// 계좌 연결하기
export const postConnectAccount = async (accessToken: string, requestBody: AccountConnectionRequest) => {
  try {
    const response = await api({
      method: 'POST',
      url: '/api/account',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: requestBody
    })
    return response.data
  } catch (error) {
    console.error(error)
    return {}
  }
}

// 계좌 해지하기
export const deleteAccount = async (accessToken: string, requestBody: AccountClouserRequest) => {
  try {
    if (!requestBody.accountId || !requestBody.signature) throw new Error('계좌 아이디가 없습니다.')
    const response = await api({
      method: 'DELETE',
      url: '/api/account',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: requestBody
    })
    return response.data as boolean
  } catch (error) {
    console.error(error)
    return false
  }
}
