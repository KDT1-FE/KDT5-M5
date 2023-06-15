import { API_URL, HEADERS } from '@/constants/constants';

// 1. 로그인
export const signIn = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });
    // 로그인 성공
    if (res.ok) {
      const user: UserResponseValue = await res.json();
      return { data: user, statusCode: res.status };
    }
    // 로그인 실패(없는 이메일 or 비번 입력 오류 or 유효성 오류(클라이언트에서 유효성검사함) or api키가 잘못된 경우)
    const errorMessage: string = await res.json();
    return { data: errorMessage, statusCode: res.status };

    // 기타 오류(서버 문제, url이 잘못된 경우)
  } catch (error) {
    console.log('Error while login: ', error);
    return {
      data: '로그인 도중 오류발생, 잠시 후 다시 시도해 주세요.',
      statusCode: 400,
    };
  }
};

// 2. 회원가입
export const signUp = async (signUpData: {
  email: string;
  password: string;
  displayName: string;
  profileImgBase64?: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        email: signUpData.email,
        password: signUpData.password,
        displayName: signUpData.displayName,
        profileImgBase64: signUpData.profileImgBase64,
      }),
    });
    // 회원가입 성공
    if (res.ok) {
      const user: UserResponseValue = await res.json();
      return { data: user, statusCode: res.status };
    }
    // 회원가입 실패(이미 등록된 이메일 or 유효성 오류(클라이언트 유효성에서 막음) or apikey오류)
    const errorMessage: string = await res.json();
    return { data: errorMessage, statusCode: res.status };

    // 기타 오류(서버 문제, url이 잘못된 경우)
  } catch (error) {
    console.log('Error while signup: ', error);
    return {
      data: '회원가입 도중 에러 발생, 잠시 후 다시 시도해 주세요.',
      statusCode: 400,
    };
  }
};

// 3. 로그아웃
export const logOut = async (accessToken: string) => {
  // accessToken 이 없다면 로그아웃상태이므로 함수 종료
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      const isLoggedOut: boolean = await res.json(); // 당연히 true
      return { data: isLoggedOut, statusCode: res.status };
    }
    const errorMessage: string = await res.json();
    return { data: errorMessage, statusCode: res.status };
  } catch (error) {
    return {
      data: '로그아웃 도중 에러 발생, 잠시 후 다시 시도해 주세요.',
      statusCode: 400,
    };
  }
};

// 4. 인증확인

export const authenticate = async (accessToken: string | null) => {
  // 토큰이 없는 경우
  if (!accessToken) {
    localStorage.removeItem('user');
    return;
  }

  // 토큰이 있는경우
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 유효한 토큰이 맞는 경우
    if (res.ok) {
      const user: AuthenticateResponseValue = await res.json();
      return { data: user, statusCode: res.status };
    }

    // 유효한 토큰이 아닌경우(expired 또는 임의의 토큰을 입력한 경우)
    const errorMessage: string = await res.json();
    return { data: errorMessage, statusCode: res.status };
    // 기타 오류(서버 문제, url이 잘못된 경우)
  } catch (error) {
    console.log('Error while authenticate: ', error);
    return {
      data: '로그아웃 도중 에러 발생, 잠시 후 다시 시도해 주세요.',
      statusCode: 400,
    };
  }
};

//사용자 정보수정

//수정 성공시 응답값의 타입
// interface EditUserResponseValue {
//   email: string;
//   displayName: string;
//   profileImg: string | null;
// }

export const editUser = async (
  accessToken: string,
  editData: {
    displayName?: string;
    profileImgBase64?: string;
    oldPassword?: string;
    newPassword?: string;
  }
) => {
  if (!accessToken) {
    return;
  }
  try {
    const res = await fetch(`${API_URL}/auth/user`, {
      method: 'PUT',
      headers: {
        ...HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        displayName: editData.displayName,
        oldPassword: editData.oldPassword,
        newPassword: editData.newPassword,
        profileImgBase64: editData.profileImgBase64,
      }),
    });
    if (res.ok) {
      console.log({ res });
      return true;
    }
    // 기존 비번이 안맞는경우
    const error: string = await res.json();
    console.log({ error });
    return error;
  } catch (error) {
    console.log('Error while EditUser: ', error);
    return '회원정보 수정 도중 오류발생, 잠시 후 다시 시도해 주세요.';
  }
};
