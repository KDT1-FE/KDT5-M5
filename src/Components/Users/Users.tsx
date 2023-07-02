import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './Users.scss';

const { VITE_USER_APIKEY, VITE_USER_USERNAME } = import.meta.env;

type ResponseValue = User[];

interface User {
  email: string; // 사용자 아이디
  displayName: string; // 사용자 표시 이름
  profileImg?: string; // 사용자 프로필 이미지 URL
}

export default function Users() {
  const [list, setList] = useState<ResponseValue>([]);
  const [pagination, setPagination] = useState<number[]>();
  const userArray = useRef<ResponseValue>();
  async function userList() {
    const res = await axios.get(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/users',
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: VITE_USER_APIKEY,
          username: VITE_USER_USERNAME,
          masterKey: true,
        },
      }
    );
    console.log(res);
    userArray.current = res.data;
    if (userArray.current) {
      const page = new Array(Math.ceil(userArray.current.length / 10)).fill(1);
      setPagination(page);
      setList(userArray.current.slice(0, 10));
    }
  }

  useEffect(() => {
    userList();
  }, []);
  return (
    <>
      <h1>회원 리스트</h1>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>프로필 사진</th>
              <th>이메일</th>
              <th>닉네임</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((v) => (
                <tr className="" key={v.email}>
                  <td>
                    <div className="profile">
                      <img
                        src={v.profileImg ? v.profileImg : '/profile.png'}
                        alt={v.email}
                      />
                    </div>
                  </td>
                  <td>{v.email}</td>
                  <td>{v.displayName}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="list-footer pagination">
          <ul
            onClick={(e) => {
              if (e.target instanceof HTMLLIElement) {
                userArray.current &&
                  setList(
                    userArray.current.slice(
                      e.target.value * 10 - 9,
                      e.target.value * 10
                    )
                  );
                window.scrollTo(0, 0);
              }
            }}
          >
            {pagination &&
              pagination.map((_, i) => (
                <li key={i} value={i + 1}>
                  {i + 1}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
