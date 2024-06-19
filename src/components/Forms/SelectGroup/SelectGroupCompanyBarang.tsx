import React, { useState } from 'react';

const SelectGroupCompanyBarang: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        Select Company
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Company
          </option>
          <option value="USA" className="text-body dark:text-bodydark">
            PT Makassar Metro Network
          </option>
          <option value="UK" className="text-body dark:text-bodydark">
            PT Jalan Tol Seksi Empat
          </option>
        </select>
      </div>
    </div>
  );
};

export default SelectGroupCompanyBarang;
