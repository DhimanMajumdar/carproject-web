import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import Carlist from '../Car/Carlist';

function HomePage({ token }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Your Cars</h1>
        <button
          onClick={() => navigate('/add-car')}
          className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition"
        >
          Add New Car
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />
      <Carlist token={token} searchKeyword={searchKeyword} />
    </div>
  );
}

export default HomePage;
