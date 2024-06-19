import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getlogBarang } from '../api/BarangApi';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

const LogBarang = () => {
  const [data, setData] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  // Load all data initially
  useEffect(() => {
    getlogBarang()
      .then(res => {
        setData(res);
        setFilteredRecords(res); // Initially, filtered records are all records
      })
      .catch(error => {
        console.error('Error fetching barang data:', error);
      });
  }, []);


  const handleFilter = () => {
    let filteredData = data;
    
    // Filter by start and end date
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        filteredData = filteredData.filter(item => {
            const itemDate = new Date(moment(item.created_at).format('YYYY-MM-DD'));
            return itemDate >= start && itemDate <= end;
        });
    }

    // Filter by status
    if (statusFilter) {
        filteredData = filteredData.filter(item => item.adddata_string === statusFilter);
    }

    setFilteredRecords(filteredData);
};

  // When dates are set, trigger filtering
  useEffect(() => {
    handleFilter();
  }, [startDate,statusFilter,data, endDate]);


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Log Barang" />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
    <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Start Date:</label>
    <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        style={{
            padding: '8px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
        }}
    />
    <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>End Date:</label>
    <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        style={{
            padding: '8px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
        }}
    />
    <label style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Status:</label>
    <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        style={{
            padding: '8px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
        }}
    >
        <option value="">Select Status</option>
        <option value="masuk">Masuk</option>
        <option value="keluar">Keluar</option>
    </select>
</div>

      <div className="max-w-full overflow-x-auto">
        {filteredRecords.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
               <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
                   Company
                 </th>
                 <th className="py-4 px-4 font-medium text-black dark:text-white">
                   Stock Value
                 </th>
                 <th className="py-4 px-4 font-medium text-black dark:text-white">
                   Tanggal Activity
                 </th>
               </tr>
             </thead>
              <tbody>
                {filteredRecords.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                      <p className="text-sm">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <button className={`rounded-full py-1 px-3 text-sm font-medium ${
                            item.adddata_string === 'masuk' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                            {item.adddata_string}
                        </button>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item && item.nama_equipment}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item && item.perusahaan}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item && (item.adddata !== null ? item.addata : item.mindata)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p>
                        {item &&
                          moment(item.created_at)
                            .tz("Asia/Makassar")
                            .format("DD-MM-YYYY ")}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (
          <table className="w-full table-auto">
          <thead>
               <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
                   Company
                 </th>
                 <th className="py-4 px-4 font-medium text-black dark:text-white">
                   Stock Value
                 </th>
                 <th className="py-4 px-4 font-medium text-black dark:text-white">
                   Tanggal Activity
                 </th>
               </tr>
             </thead>
      
           </table>
        )}
      </div>
    </DefaultLayout>
  );
};

export default LogBarang;
