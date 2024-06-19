import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getEmployee = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'GET',
      `employee`,
      {},
      headers,
      'Mencoba mengambil user employee',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat user employee', error);
    throw error;
  }
};

const addEmployee = async (data) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'POST',
      `employee`,
      data,
      headers,
      'Mencoba mengambil user employee',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat user employee', error);
    throw error;
  }
};
const deleteEmployee = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'DELETE',
      `employee/${id}`,
      {},
      headers,
      'Mencoba mengambil user employee',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat user employee', error);
    throw error;
  }
};
export { getEmployee, addEmployee, deleteEmployee };
