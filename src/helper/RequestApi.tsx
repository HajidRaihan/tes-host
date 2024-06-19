import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleErrorResponse = (error: any, action: string) => {
  console.error(`Error: saat ${action}`, error);
  if (error.response.data.message === 'Unauthenticated.') {
    Cookies.remove('access_token');
    Cookies.remove('role');
    Cookies.remove('userId');
    window.location.href = '/auth/signin';
  }
  throw error;
};

const RequestApi = async (
  method: string,
  url: string,
  data: any = {},
  headers: any = {},
  action: string,
) => {
  try {
    const response = await axios({
      method: method,
      url: `${API_BASE_URL}/${url}`,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    return response;
  } catch (error) {
    return handleErrorResponse(error, action);
  }
};

export { RequestApi };
