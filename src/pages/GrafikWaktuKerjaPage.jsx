import React, { useEffect, useState } from 'react';
import { getGrafikWorkDuration } from '../api/grafikApi';
import WorkDurationChart from '../components/Charts/WorkDurationChart';
import DefaultLayout from '../layout/DefaultLayout';

const GrafikWaktuKerjaPage = () => {
  const [dataGrafikWork, setDataGrafikWork] = useState();
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const getGrafik = async () => {
      const res = await getGrafikWorkDuration(selectedYear, 'false');

      setDataGrafikWork(res);
      const yearSet = new Set();

      for (let i = res.start_year; i <= res.end_year; i++) {
        yearSet.add(i);
      }

      // Konversi Set menjadi Array
      setYear([...yearSet]);
    };
    getGrafik();
  }, [selectedYear]);

  const selectedYearHanlder = (e) => {
    setSelectedYear(e.target.value);
  };
  return (
    <DefaultLayout>
      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 mb-5">
        <h4 className="text-xl font-bold text-black dark:text-white mb-5">
          Grafik Waktu Kerja
        </h4>
        <div className="flex-1 w-32 ml-3">
          <select
            value={selectedYear}
            onChange={selectedYearHanlder}
            style={{
              width: '100%',
              padding: '5px',
              border: '2px solid #ccc',
              borderRadius: '5px',
            }}
          >
            {year.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-10 flex flex-wrap">
          {dataGrafikWork &&
            dataGrafikWork.data.map((data, index) => {
              return (
                <div className="w-1/2">
                  <WorkDurationChart data={data} key={index} />
                </div>
              );
            })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GrafikWaktuKerjaPage;
