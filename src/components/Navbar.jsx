import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ()=>{

    const [searchQuery,setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e)=>{
        e.preventDefault();
        console.log(searchQuery.trim());
        if(searchQuery.trim()){
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/top-rated" className="nav-link">Top Rated</Link>
                <Link to="/upcoming" className="nav-link">Upcoming</Link>
            </div>
            
            <form onSubmit={handleSearch} className="search-form">

                <input type="text" value={searchQuery} onChange={(e)=>{
                    setSearchQuery(e.target.value)
                }} placeholder="Search movie..." className="search-input"/>
                
                <button type="submit" className="search-btn">Search</button>

            </form>
        </nav>
    )
}

export default Navbar;
