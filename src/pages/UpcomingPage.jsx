import React,{useState,useEffect} from "react";
import '../styles/UpcomingPage.css';
import { Link } from 'react-router-dom';
import axios from "axios";


const UpcomingPage = ()=>{

    const [movies,setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=>{
        fetchUpcomingMovies();
    },[page])

    const fetchUpcomingMovies = async ()=>{
        try{    
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`);
            console.log(response.data.results)
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        }catch(err){
            console.log("Error while fetching upcoming movies",err)
        }
    }

    const handleNextPage =()=>{
        if(page < totalPages){
            setPage(page+1);
        }
    }


    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };



    return (
        <div className="upcoming-page-container">
            <div className="movies-grid">
                {movies.map((movie)=>{
                    return (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-link">
                            <div key={movie.id} className="movie-card">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                className="movie-poster"/>

                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-rating">Release Date: {movie.release_date}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>

        </div>
    )
}

export default UpcomingPage;
