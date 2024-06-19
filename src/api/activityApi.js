import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const addActivity = async (data) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'POST',
      'toll',
      data,
      headers,
      'Mencoba menambahkan acitvity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menambahkan activity', error);
    throw error;
  }
};

const getAllActivity = async (lokasi, kategori, company, status, page) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  let params = [];
  if (page) {
    params.push(`page=${page}`);
  }
  if (lokasi) {
    params.push(`lokasi_id=${lokasi}`);
  }
  if (kategori) {
    params.push(`kategori_id=${kategori}`);
  }
  if (company) {
    params.push(`company=${company}`);
  }
  if (status) {
    params.push(`status=${status}`);
  }
  if (params.length > 0) {
    params = '?' + params.join('&');
  }

  try {
    const response = await RequestApi(
      'GET',
      `toll${params}`,
      {},
      headers,
      'Mencoba menampilkan acitvity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan activity', error);
    throw error;
  }
};

const getDetailActivity = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      `toll/${id}`,
      {},
      headers,
      'Mencoba menampilkan acitvity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan activity', error);
    throw error;
  }
};

const deleteActivity = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'DELETE',
      `toll/delete/${id}`,
      {},
      headers,
      'Mencoba delete acitvity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat delete activity', error);
    throw error;
  }
};

const editActivity = async (data, id) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'PUT',
      `toll/update/${id}`,
      data,
      headers,
      'Mencoba edit acitvity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat edit activity', error);
    throw error;
  }
};

const changeStatus = async (data, id) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'POST',
      `activity_workers/end/admin/${id}`,
      data,
      headers,
      'Mencoba change status activity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat change status activity', error);
    throw error;
  }
};

const getAllActivityList = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'GET',
      `toll/all`,
      {},
      headers,
      'Mencoba menampilkan acitvity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan activity', error);
    throw error;
  }
};

const getActivityWorker = async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };

  try {
    const response = await RequestApi(
      'GET',
      `activity_workers/${id}`,
      {},
      headers,
      'Mencoba menampilkan acitvity',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat menureen activity', error);
    throw error;
  }
};
export {
  addActivity,
  getAllActivity,
  deleteActivity,
  getDetailActivity,
  editActivity,
  getAllActivityList,
  changeStatus,
  getActivityWorker,
};
