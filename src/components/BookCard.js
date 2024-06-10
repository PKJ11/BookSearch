import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css'; // Ensure the CSS file is imported

const BookCard = ({ book, onAdd }) => (
  <div className="book-card">
    <img src={book.cover_img} alt={book.title} className="book-cover" />
    <div className="book-details">
      <h3>{book.title}</h3>
      <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
      {book.edition && <p>Edition: {book.edition}</p>}
      <button onClick={() => onAdd(book)}>Add to Bookshelf</button>
    </div>
  </div>
);

BookCard.propTypes = {
  book: PropTypes.shape({
    cover_img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author_name: PropTypes.arrayOf(PropTypes.string),
    edition: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default BookCard;
