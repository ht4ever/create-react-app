import React, { useState, useEffect } from 'react';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConvertButton from './components/ConvertButton';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
      });

    // Set initial dark mode based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleConvert = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        setConversionResult(amount * rate);
      });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-inter ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      
      {/* Toggle Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className={`p-8 rounded-lg shadow-lg w-full max-w-xs ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-2xl text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-800'} font-bold`}>
          Currency Converter
        </h1>

        <CurrencySelector
          label="From"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          options={currencies}
        />
        <CurrencySelector
          label="To"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          options={currencies}
        />
        <AmountInput value={amount} onChange={(e) => setAmount(e.target.value)} />
        <ConvertButton onClick={handleConvert} />

        {conversionResult && (
          <p className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            Converted Amount: {conversionResult}
          </p>
        )}
      </div>
      
      <footer className={`absolute bottom-2 text-center ${darkMode ? 'text-gray-500' : 'text-gray-700'}`}>
        HishamTouati design
      </footer>
    </div>
  );
};

export default App;
