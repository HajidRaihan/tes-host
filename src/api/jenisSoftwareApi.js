import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getJenisSoftware = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      'jenisSoftware',
      {},
      headers,
      'Mencoba menampilkan jenis Software',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan Standart aplikasi', error);
    throw error;
  }
};

const addJenisSoftware = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'POST',
      'jenisSoftware',
      data,
      headers,
      'Mencoba menambahkan Standart aplikasi ',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menambahkan Standart aplikasi', error);
    throw error;
  }
};

const deleteJenisSoftware = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'DELETE',
      `jenisSoftware/${id}`,
      {},
      headers,
      'Mencoba hapus Standart aplikasi',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat hapus Standart aplikasi', error);
    throw error;
  }
};

export { getJenisSoftware, addJenisSoftware, deleteJenisSoftware };
 