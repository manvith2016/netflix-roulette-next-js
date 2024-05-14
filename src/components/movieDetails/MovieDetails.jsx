import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import  './MovieDetails.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HOST } from '../app/App';


const MovieDetails = () => {
    const [selectedMovieData, setSelectedMovieData] = useState({});
    let { movieId } = useParams();
    const navigate = useNavigate();
    const [isMovieFound, setIsMovieFound] = useState(true); 

    useEffect(() => {
        console.log("useEffect Setting Genre Menu's")
        axios.get(HOST+"/movies/"+movieId)
        .then((response) => {
            setIsMovieFound(true)
            setSelectedMovieData(response.data)
            return response.data;
        })
        .catch((err) => {
            setIsMovieFound(false)
            console.log('error', err)
         });
      }, [movieId])

    return (
        <header className="w-100 h-100 d-flex flex-column justify-content-start">
            {isMovieFound===true?
                <>
                        
                        <div className="movieInfoPanelItem d-flex flex-row">
                            <img src={selectedMovieData?.poster_path} onError={(e) => e.target.src='/Batman.jpeg'} className="card-img-top" alt="..." />
                            <div className='movieInfoPanel card-img-top'>
                                <h2 data-testid="movieName">{selectedMovieData.title}</h2>
                                <div className="year" data-testid="year">{selectedMovieData?.release_date}</div>
                                <div className="year" data-testid="generes">{selectedMovieData?.genres?.join(", ")}</div>
                                <div className="year" data-testid="overview"><b>{selectedMovieData?.overview}</b></div>
                                <div className="year" data-testid="runtime"><b>{selectedMovieData?.runtime}</b></div>
                                <div className="year" data-testid="revenue"><b>{selectedMovieData?.revenue}</b></div>
                                <div className="year" data-testid="budget"><b>{selectedMovieData?.budget}</b></div>
                                <div className="year" data-testid="vote_count"><b>{selectedMovieData?.vote_count}</b></div>
                                <div className="year" data-testid="vote_average"><b>{selectedMovieData?.vote_average}</b></div>
                                <div className="year" data-testid="tagline"><b>{selectedMovieData?.tagline}</b></div>
                            </div>
                        </div>
                        <button className="btn-add-more" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                </>:
                 <div className="movieInfoPanelItem d-flex flex-row">
                    <div className='movieInfoPanel card-img-top'>
                        <h1 style={{textAlign: 'center', color: 'blue', cursor: 'pointer'}} onClick={()=>navigate("/")}>Movie Not found for ID {movieId}. Click here to go HomePage</h1>
                    </div>
                </div>
             }
        </header>
        
    );
}


export default MovieDetails;
