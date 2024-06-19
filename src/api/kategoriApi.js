import Cookies from 'js-cookie';
import { RequestApi } from '../helper/RequestApi';

const getKategori = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  };
  try {
    const response = await RequestApi(
      'GET',
      'kategori',
      {},
      headers,
      'Mencoba mengambil kategori',
    );

    return response.data;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil kategori', error);
    throw error;
  }
};




const addKategori = async (data) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try {
      const response = await RequestApi(
        'POST',
        'kategori',
        data,
        headers,
        'Mencoba mengirim kategori',
      );
  
      return response.data;
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil kategori', error);
      throw error;
    }
  };

  const updateKategori = async(id,data) => {
    const headers = {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
    };
    try{
        const response = await RequestApi(
            'PUT',
            `kategori/${id}`,
            data,
            headers,
            'mencoba mengupdate kategori' 

        );


        return response.data;
    }catch(error){
        console.error("Terjadi Kesalahan",error);
        throw error;
    }
}

const deleteKategori = async(id) =>{
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      };
      try {
        const response = await RequestApi(
          'DELETE',
          `kategori/${id}`,
          {},
          headers,
          'Mencoba delete kategori',
        );
    
        return response.data;
      } catch (error) {
        console.error('Terjadi kesalahan saat delete kategori', error);
        throw error;
      }
}
  
  
  
  export { addKategori, getKategori,updateKategori, deleteKategori };



