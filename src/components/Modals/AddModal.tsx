import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
 
// const modalStyles = {
//   maxHeight: 'calc(100vh - 100px)',
//   overflowY: 'auto',
// };
import { getLokasi } from '../../api/lokasiApi.js';

function AddStuffModal({ isOpen, onClose, onAdd, value, onChange, title }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="mb-2.5 block text-black dark:text-white">
              {title}
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={value}
                onChange={onChange}
                className=" bg-transparent p text-black  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                label={title}
                placeholder={`Enter your ${title}`}
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Add
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function ItemModal({
  isOpen,
  onClose,
  onAdd,
  options,
  onChangeEquipment,
  onChangeCatatan,
  valueCatatan,
  onChangeMerk,
  onChangeStock,
  onChangePicture,
  onChangeCompany,
  valueEquipment,
  valueMerk,
  valueStock,
  valueCompany,
}) {
  const isEquipmentSelected = !!valueEquipment;
  const isCompanySelected = !!valueCompany;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent >
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Barang
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Equipment
                  </ModalHeader>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Merk
                  </ModalHeader>
                  <Input
                    value={valueMerk}
                    onChange={onChangeMerk}
                    placeholder="Enter merk"
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Picture
                  </ModalHeader>
                  <Input onChange={onChangePicture} type="file" />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Unit
                  </ModalHeader>
                  <Input
                    value={valueStock}
                    onChange={onChangeStock}
                    placeholder="Enter unit"
                    type="number"
                    min="0"
                    disabled={!isEquipmentSelected || !isCompanySelected}
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Catatan
                  </ModalHeader>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Catatan jika diperlukan"
                    value={valueCatatan}
                    onChange={onChangeCatatan}
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Company
                  </ModalHeader>
                  <select
                    id="perusahaan"
                    value={valueCompany}
                    onChange={onChangeCompany}
                    className="bg-transparent text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Pilih Perusahaan</option>
                    <option value="PT Makassar Metro Network">PT MMN</option>
                    <option value="PT Jalan Tol Seksi Empat">PT MAN</option>
                  </select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Add
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function KategoriModal({
  isOpen,
  onClose,
  onAdd,
  valuecategory,
  onChangeKategori,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent >
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Kategori
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={valuecategory}
                onChange={onChangeKategori}
                className=" bg-transparent p text-black  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                label="Kategori"
                placeholder="Enter your kategori"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Add
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function LokasiModal({ isOpen, onClose, onAdd, value, onChange }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="mb-2.5 block text-black dark:text-white">
              Add Lokasi
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={value}
                onChange={onChange}
                className=" bg-transparent p text-black  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                label="Lokasi"
                placeholder="Enter your lokasi"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Add
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function JadwalModal({
  isOpen,
  onClose,
  onAdd,
  onChangeJenisPerusahaan,
  onChangeUraianKegiatan,
  onChangeLokasi,
  onChangeWaktu,
  onChangeFrekuensi,
  onChangeTahun,
  valueLokasi,
  valueJenisPerusahaan,
  valueUraianKegiatan,
  valueWaktu,
  valueFrekuensi,
  valueTahun,
}) {
  const [JadwalOptions, setJadwalOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLokasi();
        if (Array.isArray(res)) {
          setJadwalOptions(res);
        } else {
          // Handle incorrect response
          console.error('Invalid response:', res);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const renderTanggalInputs = () => {
    if (!valueFrekuensi) return null;
    const jumlahTanggal = parseInt(valueFrekuensi.replace('x pertahun', ''));
    const inputs = [];
    for (let i = 0; i < jumlahTanggal; i++) {
      inputs.push(
        <div key={i} className="flex flex-col gap-2">
          <label htmlFor={`tanggal${i}`} className="text-black">
            Tanggal {i + 1}
          </label>
          <input
            id={`tanggal${i}`}
            type="date"
            value={valueWaktu[i] || ''}
            onChange={(e) => onChangeWaktu(i, e)}
            className="bg-transparent text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder={`Pilih Tanggal ${i + 1}`}
          />
        </div>,
      );
    }
    return inputs;
  };

  return (  
    <>
          <Modal
        className="border-stroke bg-whiter shadow-default dark:border-strokedark dark:bg-black h-fit"
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalContent style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {(onClose) => (
            <>
            <ModalHeader className="dark:text-white flex flex-col gap-1">
                Add Jadwal
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-5">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Perusahaan
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={valueJenisPerusahaan}
                      onChange={onChangeJenisPerusahaan}
                    >
                      <option value="">Select Perusahaan</option>
                      <option value="tol">Tol</option>
                      <option value="non tol">Non Tol</option>
                    </select>

                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Uraian Kegiatan 
                    </label>
                    <textarea
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={valueUraianKegiatan}
                      onChange={onChangeUraianKegiatan}
                      placeholder="Masukkan Uraian Kegiatan"
                      rows={2}
                    >
                  </textarea>
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Lokasi 
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={valueLokasi}
                      onChange={onChangeLokasi}
                    >
                       <option value="">Select Lokasi</option>
                        {JadwalOptions.map((option) => (
                          <option key={option.id} value={option.nama_lokasi}>
                            {option.nama_lokasi}
                          </option>
                        ))}
                  </select>
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tahun
                    </label>
                    <input
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"                     
                      id="tahun"
                      type="number"
                      placeholder="Masukkan Tahun"
                      min="2024" 
                      value={valueTahun}
                      onChange={onChangeTahun}
                    >
                  </input>
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Frekuensi 
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"                      
                      value={valueFrekuensi}
                      onChange={onChangeFrekuensi}
                    >
                      <option value="">Pilih Frekuensi</option>
                        {[...Array(2).keys()].map((i) => (
                          <option key={i} value={`${i + 1}x pertahun`}>{`${
                            i + 1
                          }x pertahun`}</option>
                        ))}
                  </select>
                  </div>
        {renderTanggalInputs()}
                  

                  </form>
              </ModalBody>
              <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={onAdd}>
                Add
              </Button>
            </ModalFooter>
            </>
            )}
        </ModalContent>

      </Modal>
    </>

      );
};


function BarangListModal({
  isOpen,
  onChangeBarang,
  onChangeMerk,
  onChangeStock,
  valueStock,
  onChangeCompany,
  onChangeSpesifikasi,
  onChangePicture,
  onClose,
  onAdd,
  valueBarang,
  valueCompany,
  valueSpesifikasi,
  valueMerk,
}) {
  const isEquipmentSelected = !!valueBarang;
  const isCompanySelected = !!valueCompany;
  const isPictureSelected = !!onChangePicture;
  const isMerkSelected = !!valueMerk;
  const isStockSelected = !!valueStock;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Barang
            </ModalHeader>
            <ModalBody className="">
              <div className="flex flex-wrap justify-around items-start gap-4">
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Company
                  </ModalHeader>
                  <select
                    id="perusahaan"
                    value={valueCompany}
                    onChange={onChangeCompany}
                    className="bg-transparent text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Pilih Perusahaan</option>
                    <option value="PT Makassar Metro Network">PT MMN</option>
                    <option value="PT Makassar Airport Network">PT MAN</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Equipment
                  </ModalHeader>
                  <Input
                    type="text"
                    value={valueBarang}
                    onChange={onChangeBarang}
                    placeholder="Enter Barang"
                    disabled={!isCompanySelected}
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Merk
                  </ModalHeader>
                  <Input
                    value={valueMerk}
                    onChange={onChangeMerk}
                    placeholder="Enter merk"
                    disabled={!isEquipmentSelected}
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Picture
                  </ModalHeader>
                  <Input
                    onChange={onChangePicture}
                    type="file"
                    disabled={!isMerkSelected}
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Stock
                  </ModalHeader>
                  <Input
                    value={valueStock}
                    onChange={onChangeStock}
                    placeholder="Enter New Stock"
                    type="number"
                    min="0"
                    disabled={!isPictureSelected}
                  />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <ModalHeader className="mb-2.5 block text-black dark:text-white">
                    Spesifikasi
                  </ModalHeader>
                  <textarea
                    value={valueSpesifikasi}
                    onChange={onChangeSpesifikasi}
                    placeholder="Enter spesifikasi"
                    disabled={!isStockSelected}
                    className="bg-transparent  border-1 border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-full h-32 resize-none" // Adjust height as needed
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Add
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

// function BarangListModal({
//   isOpen, onChangeBarang, onChangeMerk, onChangeCompany, onChangespesifikasi,
//   onChangeStock, valueStock, onClose, onAdd, valueBarang, valueCompany,
//   valueSpesifikasi, valueMerk
// }) {
//     const [equipmentOptions, setEquipmentOptions] = useState([]);
//     const [filteredMerkOptions, setFilteredMerkOptions] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await getbarang();
//                 if (Array.isArray(res)) {
//                     setEquipmentOptions(res);
//                 } else {
//                     console.error("Invalid response:", res);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         // When valueBarang changes, update the filtered Merk options
//         if (valueBarang) {
//             const selectedEquipment = equipmentOptions.find(equipment => equipment.nama_barang === valueBarang);
//             if (selectedEquipment) {
//                 setFilteredMerkOptions(equipmentOptions.filter(option => option.nama_barang === valueBarang));
//             }
//         } else {
//             setFilteredMerkOptions([]);
//         }
//     }, [valueBarang, equipmentOptions]);

//     const isEquipmentSelected = !!valueBarang;
//     const isCompanySelected = !!valueCompany;
//     const isStockSelected = !!onChangeStock;
//     const isMerkSelected = !!valueMerk;

//     return (
//       <>
//         <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
//           <ModalContent>
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Add Barang
//               </ModalHeader>
//               <ModalBody>
//                 <div className="flex flex-wrap gap-4">
//                   <div className="w-full sm:w-1/2 md:w-1/3">
//                     <ModalHeader className="mb-2.5 block text-black dark:text-white">
//                       Company
//                     </ModalHeader>
//                     <select
//                       id="perusahaan"
//                       value={valueCompany}
//                       onChange={onChangeCompany}
//                       className="bg-transparent text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     >
//                       <option value="">Pilih Perusahaan</option>
//                       <option value="PT Makassar Metro Network">PT MMN</option>
//                       <option value="PT Jalan Tol Seksi Empat">PT MAN</option>
//                     </select>
//                   </div>
//                   <div className="w-full sm:w-1/2 md:w-1/3">
//                     <ModalHeader className="mb-2.5 block text-black dark:text-white">
//                       Equipment
//                     </ModalHeader>
//                     <select
//                       value={valueBarang}
//                       onChange={onChangeBarang}
//                       className="w-full p-2 border rounded"
//                       disabled={!isCompanySelected}
//                     >
//                       <option value="">Select equipment</option>
//                       {equipmentOptions.map(option => (
//                         <option key={option.id} value={option.nama_barang}>
//                           {option.nama_barang}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-full sm:w-1/2 md:w-1/3">
//                     <ModalHeader className="mb-2.5 block text-black dark:text-white">
//                       Merk
//                     </ModalHeader>
//                     <select
//                       value={valueMerk}
//                       onChange={onChangeMerk}
//                       className="w-full p-2 border rounded"
//                       disabled={!isEquipmentSelected}
//                     >
//                       <option value="">Select Merk</option>
//                       {filteredMerkOptions.map(option => (
//                         <option key={option.id} value={option.merk}>
//                           {option.merk}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="w-full sm:w-1/2 md:w-1/3">
//                     <ModalHeader className="mb-2.5 block text-black dark:text-white">
//                       Stock
//                     </ModalHeader>
//                     <Input
//                       type='number'
//                       value={valueStock}
//                       onChange={onChangeStock}
//                       placeholder="Enter Unit"
//                       disabled={!isMerkSelected}
//                     />
//                   </div>
//                   <div className="w-full sm:w-1/2 md:w-1/3">
//                     <ModalHeader className="mb-2.5 block text-black dark:text-white">
//                       Spesifikasi
//                     </ModalHeader>
//                     <Input
//                       value={valueSpesifikasi}
//                       onChange={onChangespesifikasi}
//                       placeholder="Enter spesifikasi"
//                       type="text"
//                       disabled={!isStockSelected}
//                     />
//                   </div>
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="flat" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onAdd}>
//                   Add
//                 </Button>
//               </ModalFooter>
//             </>
//           </ModalContent>
//         </Modal>
//       </>
//     );
//   }

export {
  LokasiModal,
  KategoriModal,
  BarangListModal,
  AddStuffModal,
  JadwalModal,
  ItemModal,
};
