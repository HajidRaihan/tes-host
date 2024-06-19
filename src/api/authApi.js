import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { RequestApi } from '../helper/RequestApi';

const loginUser = async (credentials) => {
  try {
    const responseLogin = await RequestApi(
      'POST',
      'login',
      credentials,
      {},
      'Mencoba Login',
    );

    const access_token = responseLogin.data.token;
    Cookies.set('access_token', access_token, { expires: 7 });

    return responseLogin.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat mencoba login ', error);
    throw error;
  }
};

const registerUser = async (data) => {
  try {
    const responseLogin = await RequestApi(
      'POST',
      'register',
      data,
      {},
      'Mencoba register user',
    );

    return responseLogin.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat mencoba regist ', error);
    throw error;
  }
};

const registerAdmin = async (data) => {
  try {
    const responseRegisterAdmin = await RequestApi(
      'POST',
      'register/admin',
      data,
      {},
      'Mencoba register admin',
    );

    return responseRegisterAdmin.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat mencoba register admin ', error);
    throw error;
  }
};

const getUserLogin = async () => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'GET',
      `user`,
      {},
      headers,
      'Mencoba mengambil user login',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat user login', error);
    throw error;
  }
};

export { loginUser, registerUser, registerAdmin, getUserLogin };
