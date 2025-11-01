import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p style={{ padding: '20px', border: '1px solid #eee', textAlign: 'center' }}>Tidak ada buku yang ditemukan.</p>;
  }

  return (
    <ul style={{ padding: '0', margin: '0' }}>
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
};

export default BookList;