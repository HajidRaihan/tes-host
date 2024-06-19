import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getlogBarang } from '../../api/BarangApi';
import moment from 'moment-timezone';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'pie', // Change the chart type to 'pie'
  },
  colors: ['#00008B', '#ADD8E6'], // Colors for 'masuk' and 'keluar' statuses
  labels: ['Masuk', 'Keluar'], // Labels for 'masuk' and 'keluar' statuses
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      startAngle: 0, // Set start angle to 0 degrees
      endAngle: 360, // Set end angle to 360 degrees
      expandOnClick: false, // Disable expanding on click
    },
  },
  dataLabels: {
    enabled: false,
  },
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [0, 0], // Initialize series with 0 for 'masuk' and 'keluar' statuses
  });

  useEffect(() => {
    getlogBarang()
      .then((res) => {
        const masukCount = res.filter(
          (item) => item.adddata_string === 'masuk',
        ).length;
        const keluarCount = res.filter(
          (item) => item.adddata_string === 'keluar',
        ).length;
        setState({ series: [masukCount, keluarCount] });
      })
      .catch((error) => {
        console.error('Error fetching barang data:', error);
      });
  }, []);

  const totalBarang = state.series.reduce((acc, curr) => acc + curr, 0);

  const handleReset = () => {
    setState({ series: [0, 0] }); // Reset series to 0 for 'masuk' and 'keluar' statuses
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-bold text-black dark:text-white">
            Stock Barang
          </h5>
        </div>
        <div>{/* Additional controls can be added here if needed */}</div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={state.series} type="pie" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full sm:w-1/3 px-8">
          <div className="flex items-center">
            <span className="mr-2 block h-3 w-3 rounded-full bg-primary"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span>Masuk</span>
              <span>
                {state.series[0]} (
                {((state.series[0] / totalBarang) * 100).toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/3 px-8">
          <div className="flex items-center">
            <span className="mr-2 block h-3 w-3 rounded-full bg-[#ADD8E6]"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span>Keluar</span>
              <span>
                {state.series[1]} (
                {((state.series[1] / totalBarang) * 100).toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/3 px-8">
          <div className="flex items-center">
            <span className="mr-2 block h-3 w-3 rounded-full bg-gray-400"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span>Total Barang</span>
              <span>{totalBarang}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
