import axios from 'axios';
export const getScheduleData = async () => {
    try {
        const response = await axios.get('/api/schedule');
        return response.data;
    } catch (error) {
        console.eror ('Error fetching template data:', error);
        throw error;
    }
};