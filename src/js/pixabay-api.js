import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54492402-008c237b79b4e7660b85c858e';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => res.data)
    .catch(err => {
      const msg =
        err?.response?.data?.message ||
        (typeof err?.response?.data === 'string' ? err.response.data : '') ||
        err.message ||
        'Unknown error';
      throw new Error(msg);
    });
}
