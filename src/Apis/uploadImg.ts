import axios from 'axios';

const { VITE_IMGUR_ID } = import.meta.env;
export async function getImgLink(formdata: FormData) {
  try {
    const res = axios.post('/imgur', formdata, {
      headers: {
        Authorization: `Client-ID ${VITE_IMGUR_ID}`,
        Accept: 'application/json',
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
