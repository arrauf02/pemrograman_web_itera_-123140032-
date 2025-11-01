import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../BookForm/BookForm';

const statusDisplay = {
  milik: 'Sudah Dimiliki',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
};

const BookItem = ({ book }) => {
  const { deleteBook } = useBooks();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Yakin ingin menghapus buku "${book.judul}"?`)) {
      deleteBook(book.id);
    }
  };
  
  const itemStyle = { 
    border: '1px solid #ddd', 
    padding: '15px', 
    marginBottom: '10px', 
    borderRadius: '4px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#fff'
  };
  const buttonStyle = { padding: '8px 12px', cursor: 'pointer', border: 'none', borderRadius: '4px' };

  const getStatusColor = (status) => {
    switch (status) {
      case 'milik': return 'green';
      case 'baca': return 'blue';
      case 'beli': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <li style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
      {isEditing ? (
        <BookForm 
          bookToEdit={book} 
          onFormSubmit={() => setIsEditing(false)} 
        />
      ) : (
        <div style={itemStyle}>
          <div className="book-details">
            <h3 style={{ margin: '0 0 5px 0' }}>{book.judul}</h3>
            <p style={{ margin: '0' }}>Penulis: {book.penulis}</p>
            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>
              Status: <span style={{ color: getStatusColor(book.status) }}>{statusDisplay[book.status]}</span>
            </p>
          </div>
          <div className="book-actions">
            <button onClick={() => setIsEditing(true)} style={{ ...buttonStyle, backgroundColor: '#007bff', color: '#fff' }}>Edit</button>
            <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: '#dc3545', color: '#fff', marginLeft: '10px' }}>Hapus</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default BookItem;