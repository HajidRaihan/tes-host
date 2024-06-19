import React, {useState, useEffect } from 'react';
import { getScheduleData } from '../api/Schedule';

const Schedule = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        // Memanggil fungsi getTemplateData() dari file api
        getTemplateData()
            .then(data => {
                // Menyimpan data ke dalam state
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>{data.title}</h1>
            <h1>{data.content}</h1>
        </div>
    );
    };

    export default Schedule;