import React from 'react';

const CurrencySelector = ({ label, value, onChange, options }) => {
  return (
    <div className="w-full mb-4">
      <label className="text-gray-400 mb-2 block">{label}:</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        {options.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
