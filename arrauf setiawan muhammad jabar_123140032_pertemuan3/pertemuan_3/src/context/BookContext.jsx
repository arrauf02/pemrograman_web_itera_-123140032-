import React, { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return action.payload; 
    case 'ADD_BOOK':
      return [...state, { ...action.payload, id: Date.now() }];
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.payload);
    case 'EDIT_BOOK':
      return state.map(book => 
        book.id === action.payload.id ? { ...book, ...action.payload.updates } : book
      );
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [localStorageBooks, setLocalStorageBooks] = useLocalStorage('personalBooks', []);
  const [state, dispatch] = useReducer(bookReducer, []);
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_BOOKS', payload: localStorageBooks });
    setIsReady(true);
  }, []); 

  useEffect(() => {
    if (isReady) {
      setLocalStorageBooks(state);
    }
  }, [state, isReady, setLocalStorageBooks]);

  // Fungsi-fungsi CRUD
  const addBook = (book) => dispatch({ type: 'ADD_BOOK', payload: book });
  const deleteBook = (id) => dispatch({ type: 'DELETE_BOOK', payload: id });
  const editBook = (id, updates) => dispatch({ type: 'EDIT_BOOK', payload: { id, updates } });

  const value = {
    books: state,
    addBook,
    deleteBook,
    editBook,
    isReady
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);