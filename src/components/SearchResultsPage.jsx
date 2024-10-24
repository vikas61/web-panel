import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchResultsPage.css';  // Optional: create a separate CSS file

const SearchResultsPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Extract the search query from the URL
    const query = new URLSearchParams(location.search).get('query');
    console.log(query);
    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=49a20b1d4bd4e33100c400e05bdcc2fd&query=${query}`);
            setMovies(response.data.results);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching search results:', err);
            setError('Could not fetch search results.');
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading search results...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="search-results-container">
            <h2>Search Results for: "{query}"</h2>
            {movies.length > 0 ? (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-link">
                            <div className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-rating">Rating: {movie.vote_average}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No movies found for your search.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;
