import React, { useState, useEffect } from 'react';
import SelfBookCard from '../components/SelfBookCard';
import './BookshelfPage.css';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(savedBookshelf);
  }, []);

  return (
    <div className="bookshelf-page">
      <h1>My Bookshelf</h1>
      <div className="bookshelf">
        {bookshelf.map((book, index) => (
          <SelfBookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookshelfPage;
