import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getJadwal = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      'jadwal-maintenance',
      {},
      headers,
      'Mencoba mengambil jadwal',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil jadwal', error);
    throw error;
  }
};




const addJadwal = async (data) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try {
      const response = await RequestApi(
        'POST',
        'jadwal-maintenance',
        data,
        headers,
        'Mencoba mengirim jadwal',
      );
  
      return response.data;
    } catch (error) {
      console.error('Terjadi kesalahan saat menambhkan jadwal', error);
      throw error;
    }
  };

  const updateStatusjadwal = async(id,data) => {
    const headers = {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try{
        const response = await RequestApi(
            'PUT',
            `jadwal-maintenancestatus/${id}`,
            data,
            headers,
            'mencoba mengupdate status jadwal' 

        );

        return response.data;
    }catch(error){
        console.error("Terjadi Kesalahan",error);
        throw error;
    }
}

  const updatejadwal = async(id,data) => {
    const headers = {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try{
        const response = await RequestApi(
            'PUT',
            `jadwal-maintenance/${id}`,
            data,
            headers,
            'mencoba mengupdate jadwal' 

        );

        return response.data;
    }catch(error){
        console.error("Terjadi Kesalahan",error);
        throw error;
    }
}

const deleteJadwal = async(id) =>{
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      };
      try {
        const response = await RequestApi(
          'DELETE',
          `jadwal-maintenance/${id}`,
          {},
          headers,
          'Mencoba delete jadwal',
        );
    
        return response.data;
      } catch (error) {
        console.error('Terjadi kesalahan saat delete jadwal', error);
        throw error;
      }
}
  
  export { addJadwal,getJadwal,updatejadwal,deleteJadwal,updateStatusjadwal };