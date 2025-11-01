import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import InputField from './InputField';

const initialFormData = {
  judul: '',
  penulis: '',
  status: 'milik',
};

const BookForm = ({ bookToEdit = null, onFormSubmit = () => {} }) => {
  const { addBook, editBook } = useBooks();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    } else {
      setFormData(initialFormData);
    }
  }, [bookToEdit]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.judul.trim()) tempErrors.judul = "Judul buku wajib diisi.";
    if (!formData.penulis.trim()) tempErrors.penulis = "Penulis wajib diisi.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { id, ...newBookData } = formData;
      
      if (bookToEdit) {
        editBook(bookToEdit.id, newBookData);
      } else {
        addBook(newBookData);
      }
      
      setFormData(initialFormData); 
      onFormSubmit(); 
    }
  };
  
  const formStyle = { 
    padding: '20px', 
    border: '1px solid #ddd', 
    borderRadius: '8px', 
    marginBottom: '30px', 
    backgroundColor: '#fff' 
  };
  const buttonStyle = { padding: '10px 15px', cursor: 'pointer', border: 'none', borderRadius: '4px' };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>{bookToEdit ? '✏️ Edit Buku' : '➕ Tambah Buku Baru'}</h3>
      
      <InputField
        label="Judul Buku"
        id="judul"
        name="judul"
        value={formData.judul}
        onChange={handleChange}
        error={errors.judul}
      />
      
      <InputField
        label="Penulis"
        id="penulis"
        name="penulis"
        value={formData.penulis}
        onChange={handleChange}
        error={errors.penulis}
      />

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="status" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} style={{ padding: '8px' }}>
          <option value="milik">Sudah Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <button type="submit" style={{ ...buttonStyle, backgroundColor: bookToEdit ? '#ffc107' : '#28a745', color: '#fff' }}>
        {bookToEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
      </button>
      {bookToEdit && (
        <button type="button" onClick={onFormSubmit} style={{ ...buttonStyle, backgroundColor: '#6c757d', color: '#fff', marginLeft: '10px' }}>
          Batal
        </button>
      )}
    </form>
  );
};

export default BookForm;