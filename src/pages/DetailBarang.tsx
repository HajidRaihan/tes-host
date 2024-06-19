import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getListBarangid } from '../api/BarangApi';
import 'react-toastify/dist/ReactToastify.css';

const Itemdetail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await getListBarangid(id);
      setData(res.data);
    };
    fetchActivity();
  }, [id]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Barang" />
      <div className="max-w-4xl mx-auto p-5">
        {data.map((item) => (
          <div key={item.id} className="flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex gap-4">
              <div className="w-1/2">
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${item.gambar}`}
                  alt={item.catatan}
                  className="w-full h-auto rounded-l-lg"
                />
              </div>
              <div className="w-1/2 p-4">
                <h3 className="text-xl font-bold mb-2">Item Details</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Nama Equipment:</span>{' '}
                  {item.nama_equipment}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Merk:</span> {item.merk}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Company:</span>{' '}
                  {item.perusahaan}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Stok Terakhir:</span>{' '}
                  {item.stock}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Catatan:</span> {item.catatan}
                </p>
                {/* You can add more details here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Itemdetail;
