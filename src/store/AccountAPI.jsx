import { userHEADERS, ACCOUNT } from './Base'
import { getAccessToken } from './localStorage'

// 은행 목록 조회
export const getBanks = async () => {
  try {
    const accessToken = getAccessToken()

    const res = await fetch(`${ACCOUNT}/banks`, {
      method: 'GET',
      headers: {
        ...userHEADERS,
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (res.ok) {
      const banks = await res.json()
      return banks
    } else {
      throw new Error('은행 목록을 불러오는데 실패했습니다.')
    }
  } catch (error) {
    console.error('은행 목록을 불러오는 동안 오류가 발생했습니다.', error)
    throw error
  }
}

export const getAccounts = async () => {
  try {
    const accessToken = getAccessToken()

    const res = await fetch(`${ACCOUNT}`, {
      method: 'GET',
      headers: {
        ...userHEADERS,
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (res.ok) {
      const response = await res.json()
      const { accounts } = response

      if (Array.isArray(accounts)) {
        return accounts
      } else {
        throw new Error('Invalid account data: accounts is not an array')
      }
    } else {
      throw new Error('Account lookup failed.')
    }
  } catch (error) {
    throw error
  }
}

// 계좌 연결
export const connectAccounts = async bankAccount => {
  try {
    const accessToken = getAccessToken()

    const res = await fetch(`${ACCOUNT}`, {
      method: 'POST',
      headers: {
        ...userHEADERS,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        bankCode: bankAccount.bankCode, // 연결할 은행 코드 (필수!)
        accountNumber: bankAccount.accountNumber, // 연결할 계좌번호 (필수!)
        phoneNumber: bankAccount.phoneNumber, // 사용자 전화번호 (필수!)
        signature: bankAccount.signature // 사용자 서명 (필수!)
      })
    })
    if (res.ok) {
      const connected = await res.json()
      return connected
    } else {
      throw new Error('계좌를 연결하는데 실패했습니다.')
    }
  } catch (error) {
    throw error
  }
}

// 계좌 해지
export const deleteAccount = async (accountId, signature) => {
  try {
    const accessToken = getAccessToken()

    const res = await fetch(`${ACCOUNT}`, {
      method: 'DELETE',
      headers: {
        ...userHEADERS,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        accountId: accountId,
        signature: signature
      })
    })
    if (res.ok) {
      const responseValue = await res.json()
      return responseValue
    } else {
      throw new Error('Failed to delete the account.')
    }
  } catch (error) {
    throw error
  }
}
