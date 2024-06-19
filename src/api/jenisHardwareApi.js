import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getJenisHardware = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      'jenisHardware',
      {},
      headers,
      'Mencoba menampilkan jenis hardware',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan jenis hardware', error);
    throw error;
  }
};

const addJenisHardware = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'POST',
      'jenisHardware',
      data,
      headers,
      'Mencoba menambahkan jenis hardware',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menambahkan jenis hardware', error);
    throw error;
  }
};

const deleteJenisHardware = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'DELETE',
      `jenisHardware/${id}`,
      {},
      headers,
      'Mencoba hapus jenis hardware',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat hapus jenis hardware', error);
    throw error;
  }
};

export { getJenisHardware, addJenisHardware, deleteJenisHardware };
