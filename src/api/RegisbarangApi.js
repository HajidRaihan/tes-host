import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getbarang = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try {
      const response = await RequestApi(
        'GET',
        'item',
        {},
        headers,
        'Mencoba mengambil barang',
      );
  
      return response.data;
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil lokasi', error);
      throw error;
    }
  };
const addregisBarang = async (data) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try {
      const response = await RequestApi(
        'POST',
        'regisbarang',
        data,
        headers,
        'Mencoba mengirim barang',
      );
  
      return response.data;
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil barang', error);
      throw error;
    }
  };


const deleteregisBarang = async(id) =>{
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      };
      try {
        const response = await RequestApi(
          'DELETE',
          `regisbarang/${id}`,
          {},
          headers,
          'Mencoba delete kategori',
        );
    
        return response.data;
      } catch (error) {
        console.error('Terjadi kesalahan saat delete barang', error);
        throw error;
      }
}

const updateregisBarang = async(id) =>{
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      };
      try {
        const response = await RequestApi(
          'PUT',
          `regisbarang/${id}`,
          {},
          headers,
          'Mencoba update barang',
        );
    
        return response.data;
      } catch (error) {
        console.error('Terjadi kesalahan saat update barang', error);
        throw error;
      }
}
  
  
  
  export {addregisBarang,getbarang,deleteregisBarang,updateregisBarang};



