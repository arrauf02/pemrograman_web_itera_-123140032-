import React from 'react';

const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'milik', label: 'Sudah Dimiliki' },
    { value: 'baca', label: 'Sedang Dibaca' },
    { value: 'beli', label: 'Ingin Dibeli' },
];

const BookFilter = ({ filterStatus, onFilterChange, searchTerm, onSearchChange }) => {
  const controlStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
      
      <div className="filter-group">
        <label htmlFor="filterStatus" style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter Status:</label>
        <select 
          id="filterStatus"
          value={filterStatus} 
          onChange={(e) => onFilterChange(e.target.value)}
          style={controlStyle}
        >
          {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      {/* Pencarian Buku */}
      <div className="search-group">
        <label htmlFor="searchTerm" style={{ marginRight: '10px', fontWeight: 'bold' }}>Cari Judul/Penulis:</label>
        <input 
          type="text" 
          id="searchTerm"
          placeholder="Cari buku..."
          value={searchTerm} 
          onChange={(e) => onSearchChange(e.target.value)}
          style={controlStyle}
        />
      </div>
    </div>
  );
};

export default BookFilter;