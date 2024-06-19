import { getLokasi } from '../../api/lokasiApi.js';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';



function UpdateLokasiModal({ isUpdateOpen, onUpdateClose, onAdd, value, onChange }) {

  return (
    <>
      <Modal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="mb-2.5 block text-black dark:text-white">
              Update Lokasi
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
              <Button color="danger" variant="flat" onPress={onUpdateClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Update
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function UpdateKategoriModal({
  isUpdateOpen,
  onUpdateClose,
  onAdd,
  value,
  onChange,
}) {
  return (
    <>
      <Modal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Kategori
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={value}
                onChange={onChange}
                label="Kategori"
                className=" bg-transparent p text-black  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter your Kategori"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onUpdateClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Update
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}


function UpdateBarangModal({ isUpdateOpen, onUpdateClose, onAdd,
  valueUpdateStock,valueUpdateSpesifikasi,onUpdatespesifikasi, onUpdateStock, }) {
return (
    <>
      <Modal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Tambah Stock</ModalHeader>
            <ModalBody>
                    <ModalHeader className="mb-2.5 block text-black dark:text-white">
                      Stock
                    </ModalHeader>
                    <Input
                      value={valueUpdateStock}
                      onChange={onUpdateStock}
                      placeholder="Enter New Stock"
                      type='number'
                      min='0'
                    />
                   <ModalHeader className="mb-2.5 block text-black dark:text-white">
                      Catatan
                    </ModalHeader>
                    <Input
                      value={valueUpdateSpesifikasi}
                      onChange={onUpdatespesifikasi}
                      placeholder="Enter spesifikasi"
                      type="text"
                    />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onUpdateClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Update
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function UpdateBarangModalMin({ isUpdateOpen, onUpdateClose,
   onAdd, valueUpdateStock, onUpdateStock,valueUpdateSpesifikasi,onUpdatespesifikasi }) {
  return (
    <>
      <Modal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Kurangi Stock
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={valueUpdateStock}
                onChange={onUpdateStock}
                label="Stock"
                className=" bg-transparent p text-black  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Update your Stock"
                type="number"
                min="0"
              />
                <ModalHeader className="mb-2.5 block text-black dark:text-white">
                      Catatan
                    </ModalHeader>
                    <Input
                      value={valueUpdateSpesifikasi}
                      onChange={onUpdatespesifikasi}
                      placeholder="Enter spesifikasi"
                      type="text"
                    />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onUpdateClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Update
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function UpdateJadwalModal({
  isUpdateOpen,
  onUpdateClose,
  onAdd,
  onChangeUpdateJenisPerusahaan,
  onChangeUpdateLokasi,
  onChangeUpdateUraianKegiatan,
  onChangeUpdateWaktu,
  onChangeUpdateFrekuensi,
  onChangeUpdateTahun,
  valueUpdateLokasi,
  valueUpdateJenisPerusahaan,
  valueUpdateWaktu,
  valueUpdateUraianKegiatan,
  valueUpdateFrekuensi,
  valueUpdateTahun,
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
    if (!valueUpdateFrekuensi) return null;
    const jumlahTanggal = parseInt(
      valueUpdateFrekuensi.replace('x pertahun', ''),
    );
    const inputs = [];
    for (let i = 0; i < jumlahTanggal; i++) {
      inputs.push(
        <div key={i} className="flex flex-col gap-2">
          <label htmlFor={`tanggal${i}`} className="text-black">
            Tanggal {i + 1}
          </label>
          <Input
            id={`tanggal${i}`}
            type="date"
            value={valueUpdateWaktu[i] || ''}
            onChange={(e) => onChangeUpdateWaktu(i, e)}
            className="bg-transparent text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder={`Pilih Tanggal ${i + 1}`}
          />
        </div>,
      );
    }
    return inputs;
  };

  return (
    <Modal 
    className="border-stroke bg-whiter shadow-default dark:border-strokedark dark:bg-black h-fit"
    isOpen={isUpdateOpen} onClose={onUpdateClose}  size="2xl"
    >
     <ModalContent style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {(onClose) => (
            <>
            <ModalHeader className="dark:text-white flex flex-col gap-1">
                Update Jadwal
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-5">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Jenis Perusahaan
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={valueUpdateJenisPerusahaan}
                      onChange={onChangeUpdateJenisPerusahaan}
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
                      value={valueUpdateUraianKegiatan}
                      onChange={onChangeUpdateUraianKegiatan}
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
                      value={valueUpdateLokasi}
                      onChange={onChangeUpdateLokasi}
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
                      value={valueUpdateTahun}
                      onChange={onChangeUpdateTahun}
                    >
                  </input>
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Frekuensi 
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"                      
                      value={valueUpdateFrekuensi}
                      onChange={onChangeUpdateFrekuensi}
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
  );
}

function UpdateRegisbarangModal({ isUpdateOpen, onUpdateClose, onAdd, value, onChange }) {
  return (
    <>
      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="mb-2.5 block text-black dark:text-white">Update Barang</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={value}
                onChange={onChange}
                className=" bg-transparent p text-black  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                label="Barang"
                placeholder="Update your barang"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onUpdateClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAdd}>
                Update
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
export  {UpdateKategoriModal,UpdateLokasiModal,UpdateBarangModal,UpdateBarangModalMin,UpdateJadwalModal,UpdateRegisbarangModal};
