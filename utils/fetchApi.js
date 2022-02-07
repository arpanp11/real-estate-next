import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';
const apikey = process.env.NEXT_PUBLIC_REAL_ESTATE_API_KEY;

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': apikey,
    },
  });
  return data;
};
