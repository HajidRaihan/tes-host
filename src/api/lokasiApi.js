import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getLokasi = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      'lokasi',
      {},
      headers,
      'Mencoba mengambil lokasi',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil lokasi', error);
    throw error;
  }
};




const addLokasi = async (data) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try {
      const response = await RequestApi(
        'POST',
        'lokasi',
        data,
        headers,
        'Mencoba mengirim lokasi',
      );
  
      return response.data;
    } catch (error) {
      console.error('Terjadi kesalahan saat mengupdate lokasi', error);
      throw error;
    }
  };

  const updateLokasi = async(id,data) => {
    const headers = {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try{
        const response = await RequestApi(
            'PUT',
            `lokasi/${id}`,
            data,
            headers,
            'mencoba mengupdate lokasi' 

        );


        return response.data;
    }catch(error){
        console.error("Terjadi Kesalahan",error);
        throw error;
    }
}

const deleteLokasi = async(id) =>{
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      };
      try {
        const response = await RequestApi(
          'DELETE',
          `lokasi/${id}`,
          {},
          headers,
          'Mencoba delete kategori',
        );  
    
        return response.data;
      } catch (error) {
        console.error('Terjadi kesalahan saat delete lokasi', error);
        throw error;
      }
}
  
  
  
  export { addLokasi,getLokasi,updateLokasi,deleteLokasi };