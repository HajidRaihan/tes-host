import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAllActivityList } from '../../api/activityApi';

interface ActivityData {
  jenis_hardware: string;
  updated_at: string;
}

interface ChartThreeState {
  categories: string[];
  series: { name: string; data: number[] }[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#1E90FF'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        colors: ['#304758'],
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Total Unit Pengerjaan Hardware',
      style: {
        color: '#304758',
        fontSize: '14px',
      },
    },
    labels: {
      style: {
        colors: ['#304758'],
        fontSize: '12px',
      },
      formatter: (value) => Math.floor(value),
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} unit`,
    },
  },
  grid: {
    borderColor: '#f1f1f1',
  },
};

const ChartTwo: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    categories: [],
    series: [
      {
        name: 'Count',
        data: [],
      },
    ],
  });
  const [startYear, setStartYear] = useState<number>(2020);
  const [endYear, setEndYear] = useState<number>(2024);

  useEffect(() => {
    getAllActivityList({ startYear, endYear })
      .then((res) => {
        const data: ActivityData[] = res.data;
        const categoryCountsMap: Map<string, number> = new Map();

        const filteredData = data.filter((item) => {
          const updatedAtYear = new Date(item.updated_at).getFullYear();
          return updatedAtYear >= startYear && updatedAtYear <= endYear;
        });

        filteredData.forEach((item) => {
          const categories = item.jenis_hardware
            .split(',')
            .map((cat) => cat.trim());
          categories.forEach((cat) => {
            if (categoryCountsMap.has(cat)) {
              categoryCountsMap.set(cat, categoryCountsMap.get(cat)! + 1);
            } else {
              categoryCountsMap.set(cat, 1);
            }
          });
        });

        const uniqueCategories = Array.from(categoryCountsMap.keys());
        const categoryCounts = uniqueCategories.map(
          (cat) => categoryCountsMap.get(cat)!,
        );

        setState({
          categories: uniqueCategories,
          series: [
            {
              name: 'Count',
              data: categoryCounts,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching activity data:', error);
      });
  }, [startYear, endYear]);

  const totalCategories = state.series[0].data.reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 flex flex-col md:flex-row justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-bold text-black dark:text-white">
            Hardware Performance
          </h5>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center ">
            <label className="text-black dark:text-white">Start Year</label>
            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value, 10))}
              className="border rounded p-1 w-24 text-center transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col items-center ">
            <label className="text-black dark:text-white">End Year</label>
            <input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(parseInt(e.target.value, 10))}
              className="border rounded p-1 w-24 text-center transition duration-200 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{
              ...options,
              xaxis: {
                ...options.xaxis,
                categories: state.categories.map(String),
              },
            }}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/3">
          <div className="flex items-center w-full">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span>Categories</span>
              <span>{totalCategories}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
