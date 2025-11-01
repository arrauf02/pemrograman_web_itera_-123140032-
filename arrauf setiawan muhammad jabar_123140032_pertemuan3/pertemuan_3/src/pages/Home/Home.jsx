import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';

const Home = () => {
  const { books, isReady } = useBooks();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSearchedBooks = books.filter(book => {
    const statusMatch = filterStatus === 'all' || book.status === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    const searchMatch = book.judul.toLowerCase().includes(searchLower) || 
                        book.penulis.toLowerCase().includes(searchLower);
    
    return statusMatch && searchMatch;
  });

  if (!isReady) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Memuat data...</div>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <BookForm />
      
      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #ccc' }} />
      
      <h2>Daftar Koleksi Buku ({filteredAndSearchedBooks.length} item)</h2>
      
      <BookFilter 
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
      />
      
      <BookList books={filteredAndSearchedBooks} />
    </div>
  );
};

export default Home;