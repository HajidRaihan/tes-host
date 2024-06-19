import React, { useEffect, useState } from 'react';
import ListActivityTable from '../components/Tables/ListActivityTable';
import DefaultLayout from '../layout/DefaultLayout';
import { getAllActivity, deleteActivity } from '../api/activityApi';
import Loader from '../common/Loader';
import { toast, ToastContainer } from 'react-toastify';
import { Pagination, Select } from '@mui/material';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const getDefaultDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const ListActivity = () => {
  const [data, setData] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [lokasiFilter, setLokasiFilter] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  // const [tanggalFilter, setTanggalFilter] = useState('');
  const [perusahaanFilter, setPerusahaanFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hapusLoading, setHapusLoading] = useState(false);

  const handleFilter = () => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    const filtered = data.filter((item) => {
      const lokasiFillter = lokasiFilter
        ? (item.location_name || '')
            .toLowerCase()
            .includes(lokasiFilter.toLowerCase())
        : true;
      const kategoriFillter = kategoriFilter
        ? (item.category_name || '')
            .toLowerCase()
            .includes(kategoriFilter.toLowerCase())
        : true;
      const statusFillter = statusFilter
        ? (item.status || '').toLowerCase().includes(statusFilter.toLowerCase())
        : true;
      const perusahaanFillter = perusahaanFilter
        ? (item.company || '')
            .toLowerCase()
            .includes(perusahaanFilter.toLowerCase())
        : true;
      // const tanggalFillter = tanggalFilter.match(/^\d{4}-\d{2}-\d{2}$/);

      return (
        lokasiFillter && kategoriFillter && statusFillter && perusahaanFillter
      );
    });

    setFilteredRecords(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [lokasiFilter, kategoriFilter, statusFilter, perusahaanFilter, data]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivity();
        if (response && response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
          setTotalPage(response.data.last_page); // Mengatur total halaman dari respons
        } else {
          console.error('Expected an array but got:', response);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setData([]);
      }
    };

    fetchActivities();
  }, [page]);

  const deleteHandler = async (id) => {
    setHapusLoading(true);
    try {
      const res = await deleteActivity(id);
      if (res) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        toast.success('Successfully deleted activity');
      }
    } catch (error) {
      toast.error('Error deleting activity: ' + error.message);
    } finally {
      setHapusLoading(false);
    }
  };

  const clearFilter = () => {
    setLokasiFilter('');
    setKategoriFilter('');
    setStatusFilter('');
    // setTanggalFilter(getDefaultDate());
  };

  const dropdownLokasi = Array.from(
    new Set(data.map((item) => item.location_name)),
  );
  const dropdownKategori = Array.from(
    new Set(data.map((item) => item.category_name)),
  );
  const dropdownStatus = Array.from(new Set(data.map((item) => item.status)));
  const dropdownPerusahaan = Array.from(
    new Set(data.map((item) => item.company)),
  );

  return (
    <DefaultLayout>
      <ToastContainer />
      <Breadcrumb pageName="Activity" />
      <div className="py-1 px-4 md:px-6 xl:px-7.5 flex justify-between items-center"></div>
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Filter Activity
        </h4>
        <div
          className="flex flex-grow items-center space-x-4"
          style={{ padding: '0 20px', fontFamily: 'Arial, sans-serif' }}
        >
          <div className="flex-1">
            <select
              value={perusahaanFilter}
              onChange={(e) => setPerusahaanFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '2px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <option value="">Pilih Jenis Perusahaan</option>
              {dropdownPerusahaan.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '2px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <option value="">Pilih status</option>
              {dropdownStatus.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <input
              type="text"
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              placeholder="Pilih Kategori"
              list="KategoriList"
              style={{
                width: '100%',
                padding: '5px',
                border: '2px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <datalist id="KategoriList">
              {dropdownKategori.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </datalist>
          </div>

          {/* <div className="flex-1">
            <input
              type="text"
              value={tanggalFilter}
              onChange={(e) => setTanggalFilter(e.target.value)}
              placeholder="YYYY-MM-DD"
              style={{
                width: '100%',
                padding: '5px',
                border: '2px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div> */}

          <div className="flex-1">
            <input
              type="text"
              value={lokasiFilter}
              onChange={(e) => setLokasiFilter(e.target.value)}
              placeholder="Pilih Lokasi"
              list="LokasiList"
              style={{
                width: '100%',
                padding: '5px',
                border: '2px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <datalist id="LokasiList">
              {dropdownLokasi.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </datalist>
          </div>
        </div>
      </div>
      <div>
        {filteredRecords.length > 0 ? (
          <>
            <ListActivityTable
              data={filteredRecords}
              setData={setFilteredRecords}
              deleteHandler={deleteHandler}
              hapusLoading={hapusLoading}
              toastSuccess={() =>
                toast.success('Berhasil menambahkan activity')
              }
              toastError={(message) => toast.error('Error: ' + message)}
            />
            <div className="w-full flex justify-center mt-5">
              <Pagination
                count={totalPage}
                page={page}
                onChange={(event, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default ListActivity;
