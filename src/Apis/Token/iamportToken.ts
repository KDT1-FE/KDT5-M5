import axios from 'axios';

const { VITE_IMP_KEY, VITE_IMP_SECRET } = import.meta.env;

const iamport = axios.create({
  baseURL: '/iamport',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ResponseToken {
  code: number;
  message: string;
  response: {
    access_token: string;
    expired_at: number;
    now: number;
  };
}

export async function getIamportToken() {
  try {
    const res = await iamport.post('/users/getToken', {
      imp_key: VITE_IMP_KEY,
      imp_secret: VITE_IMP_SECRET,
    });
    console.log(res);
    const data: ResponseToken = res.data;
    console.log(new Date(data.response.expired_at * 1000).toUTCString());
    document.cookie = `iamportToken=${
      data.response.access_token
    }; path=/; expires=${new Date(
      data.response.expired_at * 1000
    ).toUTCString()}`;
  } catch (err) {
    console.log(err);
  }
  //return res.data;
}
