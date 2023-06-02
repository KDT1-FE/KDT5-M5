import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store';
import { signUp } from '../../api/authApi';
import { EMAIL_REGEX } from '../../constants/constants';

export default function SignUp() {
  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);

  const [message, setMessage] = useState('');
  const [signUpData, setSignData] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 이메일 or 비밀번호 or 이름을 입력하지 않은경우
    if (
      signUpData.email.trim() === '' ||
      signUpData.password.trim() === '' ||
      signUpData.displayName.trim() === ''
    ) {
      setMessage('이메일와 비번, 이름을 입력해주세요');
      return;
    }
    // 이메일의 유효성 검사
    if (!EMAIL_REGEX.test(signUpData.email)) {
      setMessage('올바른 이메일을 입력해주세요');
      return;
    }
    // 비번 8자리 유효성검사
    if (signUpData.password.length < 7) {
      setMessage('비밀번호를 8자리 이상 입력해주세요');
      return;
    }
    // 이름 유효성검사
    if (signUpData.displayName.length > 20) {
      setMessage('이름은 20자 이하로 작성해주세요');
      return;
    }
    const res = await signUp(signUpData);
    if (res.accessToken) {
      localStorage.setItem('token', res.accessToken);
      setUser(res);
    } else {
      setMessage(res);
      return;
    }
    navigate('/', { replace: true });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        name="email"
        onChange={handleChange}
        value={signUpData.email}
      />
      <label htmlFor="password">비밀번호(8자 이상)</label>
      <input
        id="password"
        type="password"
        name="password"
        onChange={handleChange}
        value={signUpData.password}
      />
      <label htmlFor="displayName">이름(20자 이하)</label>
      <input
        id="displayName"
        type="text"
        name="displayName"
        onChange={handleChange}
        value={signUpData.displayName}
      />
      <div className="flex-space"></div>
      {/* <span>프로필 사진</span>
      <input type="file" /> */}
      <button>회원가입</button>
      <div>{message}</div>
    </form>
  );
}