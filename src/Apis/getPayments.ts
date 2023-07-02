import { getIamportToken } from './Token/iamportToken';
import axios from 'axios';

const ajax = axios.create({
  baseURL: '/iamport',
  headers: {
    'Content-Type': 'application/json',
  },
});

ajax.interceptors.request.use(async (config) => {
  const key = new RegExp(`iamportToken=([^;]*)`);
  if (!key.test(document.cookie)) {
    await getIamportToken();
  }
  console.log(key.test(document.cookie));
  config.headers['Authorization'] = `Bearer ${
    key.test(document.cookie) ? RegExp.$1 : ''
  }`;
  return config;
});

export default async function getPayments(method: string, num = 1) {
  try {
    const res = await ajax.get(`/payments/status/${method}`, {
      params: {
        limit: 20,
        sorting: '-started',
        page: num,
      },
    });
    console.log(res);
    const data: PaymentsResponse = res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}
