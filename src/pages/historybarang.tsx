import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getBarangid } from '../api/BarangApi';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment-timezone';
const HistoryBarang = () => {
  const [data, setData] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { id } = useParams();

  // Function to handle date filtering
  const handleFilter = () => {
    let filteredData = data;

    // Filter by start and end date
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDate >= start && itemDate <= end;
      });
    }

    // Filter by status
    if (statusFilter) {
      filteredData = filteredData.filter(
        (item) => item.adddata_string === statusFilter,
      );
    }

    setFilteredRecords(filteredData);
  };
  useEffect(() => {
    handleFilter();
  }, [startDate, endDate, statusFilter, data]);

  useEffect(() => {
    const fetchBarang = async () => {
      const res = await getBarangid(id);
      setData(res.data.data);
    };
    fetchBarang();
  }, [id]);
  const calculateStock = () => {
    if (filteredRecords.length === 0) return 0; // Return 0 if there are no records

    const lastIndex = filteredRecords.length - 1;
    const latestStock = parseInt(filteredRecords[lastIndex].stock);
    return latestStock;
  };

  const namabarang = () => {
    // Directly attempt to access the last item in the array
    const lastItem = filteredRecords[filteredRecords.length - 1];
    // Check if the item exists before accessing its property
    if (lastItem) {
      return lastItem.nama_equipment;
    }
    return 'No records'; // Fallback if no items exist
  };

  const merk = () => {
    if (filteredRecords.length === 0) return 'NO records';
    return filteredRecords[filteredRecords.length - 1].merk;
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Barang" />
      <div className="flex justify-center bg-gray-100 p-4 rounded-md shadow-md mb-6">
        <div className="flex items-center mr-8">
          <h4 className="text-base font-semibold text-black dark:text-white mr-2">
            Nama Barang:
          </h4>
          <p className="text-sm text-blue-600 font-semibold">{namabarang()}</p>
        </div>
        <div className="flex items-center mr-8">
          <h4 className="text-base font-semibold text-black dark:text-white mr-2">
            Merk:
          </h4>
          <p className="text-sm text-blue-600 font-semibold">{merk()}</p>
        </div>
        <div className="flex items-center">
          <h4 className="text-base font-semibold text-black dark:text-white mr-2">
            Stock:
          </h4>
          <p className="text-sm text-blue-600 font-semibold">
            {calculateStock()}
          </p>
        </div>
      </div>

      <div
        style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            padding: '8px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
        <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
          End Date:
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: '8px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
        <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
          Status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '8px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        >
          <option value="">Select Status</option>
          <option value="masuk">Masuk</option>
          <option value="keluar">Keluar</option>
        </select>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                NO
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Nama Equipment
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Stock Value
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Catatan
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Tanggal Activity
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200 py-5 px-4">
                    {index + 1}
                  </td>
                  <td className="border-b border-gray-200 py-5 px-4">
                    <button
                      className={`rounded-full py-1 px-3 text-sm font-medium ${
                        item.adddata_string === 'masuk'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.adddata_string}
                    </button>
                  </td>
                  <td className="border-b border-gray-200 py-5 px-4">
                    {item.nama_equipment}
                  </td>
                  <td className="border-b border-gray-200 py-5 px-4">
                    {item.addata}
                  </td>
                  <td className="border-b border-gray-200 py-5 px-4">
                    {item.spesifikasi}
                  </td>
                  <td className="border-b border-gray-200 py-5 px-4">
                    {moment(item.created_at)
                      .tz('Asia/Makassar')
                      .format('DD-MM-YYYY')}
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default HistoryBarang;
