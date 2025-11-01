import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const containerStyle = {
    padding: '50px',
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };
  const titleStyle = {
    fontSize: '4em',
    color: '#dc3545', 
    margin: '0 0 10px 0'
  };
  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p style={{ fontSize: '1.2em', margin: '20px 0' }}>
        Maaf, alamat yang Anda cari tidak ada di aplikasi ini.
      </p>
      <Link to="/" style={linkStyle}>
        ← Kembali ke Halaman Utama
      </Link>
    </div>
  );
};

export default NotFound;