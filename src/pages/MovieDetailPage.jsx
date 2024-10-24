import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MovieDetailPage.css';
import CastComponent from '../components/CastComponent';
import axios from 'axios';



const MovieDetailPage = ()=>{

    const {id} = useParams(); //geting id from URL
    const [movie,setMovie] = useState(null);
    
    useEffect(()=>{
        fetchMovieDetails();
    },[id]);

    const fetchMovieDetails = async ()=>{
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
            console.log(response.data);
            setMovie(response.data);
        }catch(err){
            console.error("Error while fetching movie details",err);
        }
    }

    if(!movie){
        return <div>Loading....</div>
    }

    return (
        <div className="movie-details-section">
            <div className="movie-background">
                <div class="movie-details" style={{
                    backgroundImage:`url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '500px', 
                    color: 'white',}}> 
                    
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                        className="movie-poster"
                    />
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                        <p class="movie-overview"><strong>Overview:</strong> {movie.overview}</p>
                    </div>
                </div>
                
                
            </div>
            
            <div class="cast-section">
                <CastComponent movieId={id} />
            </div>
                       

        </div>
    )

}


export default MovieDetailPage;
