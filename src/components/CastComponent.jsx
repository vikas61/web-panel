import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CastComponent.css';


const CastComponent = ({movieId})=>{
    console.log("Id:",movieId)
    const [cast,setCast] = useState([]);

    useEffect(()=>{
        fetchMovieCast();
    },[movieId])

    const fetchMovieCast = async ()=>{
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=49a20b1d4bd4e33100c400e05bdcc2fd&language=en-US`);
            setCast(response.data.cast.slice(0,10));
            console.log(cast)
        }catch(err){
            console.error("Error fetching movie cast",err)
        }
    };

    if(cast.length === 0){
        return <div>Loading Cast...</div>
    }

    return (
        <div className="cast-container">
            <h2>Cast</h2>
            <div className="cast-list">
                {cast.map((actor)=>(
                        <div key={actor.id} className="cast-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                alt={actor.name}
                                className="cast-image"
                            />
                            <p>{actor.name}</p>
                            <p>as {actor.character}</p>
                        </div>
                ))}
            </div>
                
        </div>
    )

}

export default CastComponent;