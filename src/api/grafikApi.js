import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getGrafikWorkDuration = async (year, limit) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'GET',
      `activity_workers/grafik/${year}?limit=${limit}`,
      {},
      headers,
      'Mencoba menampilkan grafik  work duration',
    );

    return response.data;
  } catch (error) {
    console.error(
      'Terjadi kesalahan saat menampilkan grafik  work duration',
      error,
    );
    throw error;
  }
};

export { getGrafikWorkDuration };
