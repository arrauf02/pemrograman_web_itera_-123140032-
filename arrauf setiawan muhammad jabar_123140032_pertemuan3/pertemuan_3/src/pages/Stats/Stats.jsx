import React from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';

const Stats = () => {
  const { books, isReady } = useBooks();
  const stats = useBookStats(books); 

  if (!isReady) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Memuat data...</div>;
  }
  
  const cardStyle = { 
    padding: '20px', 
    borderRadius: '8px', 
    textAlign: 'center', 
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    flex: '1', 
    minWidth: '200px'
  };
  const countStyle = { fontSize: '2.5em', margin: '10px 0' };

  return (
    <div style={{ padding: '40px' }}>
      <h2>📊 Statistik Koleksi Buku</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        
        <div className="stat-card total" style={{ ...cardStyle, backgroundColor: '#e9ecef' }}>
          <h3>Total Buku</h3>
          <p style={countStyle}>{stats.totalBooks}</p>
        </div>
        
        <div className="stat-card owned" style={{ ...cardStyle, backgroundColor: '#d4edda' }}>
          <h3>Sudah Dimiliki</h3>
          <p style={countStyle}>{stats.milik}</p>
        </div>
        
        <div className="stat-card reading" style={{ ...cardStyle, backgroundColor: '#cce5ff' }}>
          <h3>Sedang Dibaca</h3>
          <p style={countStyle}>{stats.baca}</p>
        </div>
        
        <div className="stat-card wishlist" style={{ ...cardStyle, backgroundColor: '#fff3cd' }}>
          <h3>Ingin Dibeli</h3>
          <p style={countStyle}>{stats.beli}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Stats;