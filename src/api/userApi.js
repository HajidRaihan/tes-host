import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getAllUser = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      'users',
      {},
      headers,
      'Mencoba menampilkan barang',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan barang', error);
    throw error;
  }
};

const getUser = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      `user/${id}`,
      {},
      headers,
      'Mencoba menemukan user',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menemukan user', error);
    throw error;
  }
};
const deleteUser = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'DELETE',
      `user/delete/${id}`,
      {},
      headers,
      'Mencoba delete user',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat delete user', error);
    throw error;
  }
};
export { getAllUser, getUser, deleteUser };
