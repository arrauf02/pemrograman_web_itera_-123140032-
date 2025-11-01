import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = { 
    padding: '15px 40px', 
    borderBottom: '1px solid #eee', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#f8f8f8'
  };
  const linkStyle = { margin: '0 15px', textDecoration: 'none', color: '#333' };

  return (
    <header style={headerStyle}>
      <h1 style={{ fontSize: '1.5em' }}>Arrauf Library Management</h1>
      <nav>
        <Link to="/" style={linkStyle}>Daftar & Input</Link>
        <Link to="/stats" style={linkStyle}>Statistik</Link>
      </nav>
    </header>
  );
};

export default Header;