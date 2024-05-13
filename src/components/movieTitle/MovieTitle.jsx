import React from 'react';
// import  './MovieTitle.css';
import PropTypes from 'prop-types';
import ContextMenu from '../contextMenu/ContextMenu';


const MovieTitle = ({ movieTileData, onViewMovieSelect, onEditMovieSelect, onDeleteMovieSelect, onTileSelected }) => {
    return (
        <div className="col-sm-12 col-md-3 col-lg-2 movieTile" onClick={()=>onTileSelected(movieTileData)}>
            <div className="item d-flex flex-column">
                <img src={movieTileData?.imageURL} onError={(e) => e.target.src='/Batman.jpeg'} className="card-img-top" alt="..." />
                <div className="d-flex flex-column px-2">
                    <div className="d-flex justify-content-between">
                        <span className="title" data-testid="movieName">{movieTileData?.movieName}</span>
                        <span className="year" data-testid="year">{movieTileData?.releaseYear}</span>
                    </div>
                    <span className="genere" data-testid="genere">{movieTileData?.generes?.join(", ")}</span>
                </div>
                <ContextMenu
                    MENU_ID={movieTileData.id}
                    menuData={movieTileData} 
                    onViewMovieSelect={onViewMovieSelect} 
                    onEditMovieSelect={onEditMovieSelect} 
                    onDeleteMovieSelect={onDeleteMovieSelect}>
                </ContextMenu>
            </div>
        </div>
    );
}


MovieTitle.propTypes = {
    movieTileData: PropTypes.any,
    onViewMovieSelect: PropTypes.func,
    onEditMovieSelect: PropTypes.func,
    onDeleteMovieSelect: PropTypes.func,
    onTileSelected: PropTypes.func,
};

MovieTitle.defaultProps = {
    movieTileData: {
        id: 1,
        imageUrl: "https://netflix-roulette.com"
    },
    onViewMovieSelect: (data) => {},
    onEditMovieSelect: (data) => {},
    onDeleteMovieSelect: (data) => {},
    onTitleSelected: (data) => {},
};


export default MovieTitle;
