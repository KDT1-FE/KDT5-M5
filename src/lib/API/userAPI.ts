// import client, { testClient } from "./client";

interface IUserUpdate {
  displayName?: string;
  profileImgBase64?: string;
  oldPassword?: string;
  newPassword?: string;
}

// fetch headers
const headers = {
  "content-type": "application/json",
  apikey: "KDT5_nREmPe9B",
  username: "KDT5_TeamAirPod8",
};

// 로그인
// 로그인
const login = async (email: string, password?: string) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    const result = await response.json();
    localStorage.setItem("Token", result.accessToken);
    localStorage.setItem("username", result.user.displayName);
    return result;
  } catch (e) {
    console.error(e, "로그인에 실패했습니다!");
  }
};

// 회원가입
const register = async (
  email: string,
  password: string,
  displayName: string,
  profileImgBase64: string,
) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          password,
          displayName,
          profileImgBase64,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e, "회원가입에 실패했습니다!");
  }
};

// 인증확인
const check = async () => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 로그아웃
const logout = async () => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 사용자 정보 수정
const userUpdate = async (user: IUserUpdate) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
      {
        method: "PUT",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify(user),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 선택 가능한 은행 목록 조회
const accountList = async () => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks",
      {
        method: "GET",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 계좌 목록 및 잔액 조회
const myAccount = async () => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
      {
        method: "GET",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 계좌 연결
const accountConnect = async (
  bankCode: string,
  accountNumber: string,
  phoneNumber: string,
  signature: boolean,
) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          bankCode,
          accountNumber,
          phoneNumber,
          signature,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 계좌 해지
const accountDisconnect = async (accountId: string, signature: boolean) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
      {
        method: "DELETE",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          accountId,
          signature,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 제품 구매 신청

const orderApply = async (productId: string, accountId: string) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/buy",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          productId,
          accountId,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 제품 거래(구매) 취소
const orderCancel = async (detailId: string) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          detailId,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 제품 거래(구매) 확정
const orderConfirm = async (detailId: string) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          detailId,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 제품 전체 거래(구매) 내역
const orderDetailsAll = async () => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details",
      {
        method: "GET",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

// 단일 제품 상세 거래(구매) 내역
const orderDetail = async (detailId: string) => {
  try {
    const response = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail",
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          detailId,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

export {
  login,
  register,
  check,
  logout,
  userUpdate,
  accountList,
  myAccount,
  accountConnect,
  accountDisconnect,
  orderApply,
  orderCancel,
  orderConfirm,
  orderDetailsAll,
  orderDetail,
};
