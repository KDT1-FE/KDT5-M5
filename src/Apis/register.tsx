import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'apikey': 'KDT5_nREmPe9B',
  'username': 'KDT5_TeamWink',
};

const axiosInstance = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth',
  headers,
});

export const JoinForm = async (email: string, displayName: string, password: string, profileImg:string) => {
  const URL = '/signup';
  const res = await axiosInstance.post(URL, { email, displayName, password, profileImg });
  return res.data;
};

export const LoginForm = async (email: string, password: string) => {
  const LOGINURL = '/login';
  const res = await axiosInstance.post(LOGINURL, { email, password });
  return res.data;
};

export const LogoutForm = async () => {
  const LOGOUTURL = '/logout';
  const token = localStorage.getItem('token') as string;
  const res = await axiosInstance.post(LOGOUTURL, {}, { headers: { ...headers, 'Authorization': `Bearer ${token}` } });
  return res.data;
};
