import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import BookCard from '../components/BookCard';
import './BookSearchPage.css';

const coverImg = '/path/to/default/cover/image.jpg'; 
const BookSearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bestsellers, setBestsellers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      fetchBooks(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchBooks = async (query) => {
    try {
      console.log('Fetching books for query:', query);
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      console.log('Data fetched:', response.data);
      const booksWithCovers = response.data.docs.map((singleBook) => ({
        ...singleBook,
        id: singleBook.key.replace('/works/', ''),
        cover_img: singleBook.cover_i
          ? `https://covers.openlibrary.org/b/id/${singleBook.cover_i}-L.jpg`
          : coverImg,
      }));
      setSearchResults(booksWithCovers);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchBestsellers = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=bestsellers&limit=10&page=1`);
      const booksWithCovers = response.data.docs.map((singleBook) => ({
        ...singleBook,
        id: singleBook.key.replace('/works/', ''),
        cover_img: singleBook.cover_i
          ? `https://covers.openlibrary.org/b/id/${singleBook.cover_i}-L.jpg`
          : coverImg,
      }));
      setBestsellers(booksWithCovers);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBestsellers(); 
  }, []);

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    const bookExists = bookshelf.some((item) => item.id === book.id);

    if (bookExists) {
      toast.warn('The book is already added to your bookshelf.');
    } else {
      localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
      toast.success('The book has been added to your bookshelf.');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`book-search-page ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Book Search</h1>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="carousel-container">
        <Carousel showThumbs={false} infiniteLoop autoPlay interval={5000} showStatus={false} stopOnHover>
          {bestsellers.map((book, index) => (
            <div key={index} className="carousel-item">
              <img src={book.cover_img} alt={book.title} />
              <p className="legend">{book.title}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="search-bar"
        />
        <button className="bookshelf-button" onClick={() => window.location.href = '/bookshelf'}>
        Go to My Bookshelf
      </button>
      </div>
      <h2 className="all-books-heading">All Books</h2>
      <div className="search-results">
        {searchResults.map((book, index) => (
          <BookCard key={index} book={book} onAdd={addToBookshelf} />
        ))}
      </div>

      

      <ToastContainer />
    </div>
  );
};

export default BookSearchPage;
