import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getAplikasiTol = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      'aplikasi_it_tol',
      {},
      headers,
      'Mencoba menampilkan aplikasi IT Tol',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan aplikasi IT Tol', error);
    throw error;
  }
};

const addAplikasiTol = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'POST',
      'aplikasi_it_tol',
      data,
      headers,
      'Mencoba menambahkan aplikasi IT Tol',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menambahkan aplikasi IT Tol', error);
    throw error;
  }
};

const deleteAplikasiTol = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'DELETE',
      `aplikasi_it_tol/${id}`,
      {},
      headers,
      'Mencoba hapus aplikasi IT Tol',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat hapus aplikasi IT Tol', error);
    throw error;
  }
};

export { getAplikasiTol, addAplikasiTol, deleteAplikasiTol };
