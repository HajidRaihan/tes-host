import React, { useEffect, useState } from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartFour from '../../components/Charts/ChartFour';
import ChartTwo from '../../components/Charts/ChartTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { getGrafikWorkDuration } from '../../api/grafikApi';
import WorkDurationChart from '../../components/Charts/WorkDurationChart';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import GrafikSkeleton from '../../components/Skeleton/GrafikSkeleton';

const Dashboard: React.FC = () => {
  const [dataGrafikWork, setDataGrafikWork] = useState();
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    const getGrafik = async () => {
      const res = await getGrafikWorkDuration(selectedYear, 'true');

      setDataGrafikWork(res);
      const yearSet = new Set();

      for (let i = res.start_year; i <= res.end_year; i++) {
        yearSet.add(i);
      }

      setYear([...yearSet]);
    };
    getGrafik();
  }, [selectedYear]);

  const selectedYearHanlder = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <DefaultLayout>
      <div className="col-span-12 rounded-sm border border-stroke p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 mb-5">
        <h4 className="text-xl font-bold text-black dark:text-white mb-5">
          Grafik Waktu Kerja
        </h4>
        <div className="flex-1 w-32 mb-5 ">
          <select
            value={selectedYear}
            onChange={selectedYearHanlder}
            style={{
              width: '100%',
              padding: '5px',
              border: '',
              borderRadius: '5px',
            }}
            className="dark:bg-boxdark dark:border-strokedark border border-[#ccc]"
          >
            {year.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-10 flex flex-wrap">
          {dataGrafikWork ? (
            dataGrafikWork.data.map((data, index) => {
              return (
                <>
                  <div className="lg:w-full w-full mb-4" key={index}>
                    <div className="rounded-sm border border-stroke p-3 shadow-default dark:border-strokedark dark:bg-boxdark">
                      <WorkDurationChart data={data} />
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <GrafikSkeleton />
          )}
        </div>
        <div className="flex justify-end items-center">
          <Button
            onClick={() => navigate('grafik-kerja')}
            className="border text-xs font-medium flex justify-center items-center border-stroke rounded-lg px-4 py-2 bg-blue-500 dark:bg-boxdark shadow-default dark:border-strokedark text-white"
          >
            <p>Selengkapnya</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="green-light-icon text-md"
            />
          </Button>
        </div>
      </div>

      {/* ChartOne */}
      <div className="col-span-12 xl:col-span-6 mx-4 mb-5">
        <ChartOne />
      </div>

      {/* ChartTwo */}
      <div className="col-span-12 xl:col-span-6 mx-4 mb-5">
        <ChartTwo />
      </div>

      {/* ChartThree */}
      <div className="col-span-12 xl:col-span-6 mx-4 mb-5">
        <ChartThree />
      </div>

      {/* ChartFour */}
      <div className="col-span-12 xl:col-span-6 mx-4 mb-5">
        <ChartFour />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
