import React from 'react';
// import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { SearchForm } from '../searchComponent/SearchForm';
import { useParams, useSearchParams } from 'next/navigation';

const Header = ({ selectedMovieData, showMovieInfoPanel, toggleMovieInfoPanel, onSearch, addMovie }) => {
    let { movieId } = useParams();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || "Guardians of the Galaxy Vol. 3";
    return (
        <header className="w-100 h-100 d-flex flex-column justify-content-start">
            {!movieId &&
                <SearchForm inputTextVal={query} onSearch={onSearch} ></SearchForm>
            }
            <button onClick={()=>{addMovie()}}>Add Movie</button>
        </header>
    );
}


export default Header;
