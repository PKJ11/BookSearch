import React from 'react';
import PropTypes from 'prop-types';

const SelfBookCard = ({ book, onAdd }) => (
  <div className="book-card">
    <img src={book.cover_img} alt={book.title} className="book-cover" />
    <div className="book-details">
      <h3>{book.title}</h3>
      <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
      {book.edition && <p>Edition: {book.edition}</p>}
      
    </div>
  </div>
);

SelfBookCard.propTypes = {
  book: PropTypes.shape({
    cover_img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author_name: PropTypes.arrayOf(PropTypes.string),
    edition: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SelfBookCard;
