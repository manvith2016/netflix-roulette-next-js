import { useState } from "react";
import PropTypes from 'prop-types';
// import './searchForm.css';

export const SearchForm = ({ initalString, onSearch }) => {
    const [searchString, setSearchString] = useState(initalString);

    const handleChange = (event) => {
        setSearchString(event.target.value);
    }

    return (
        <div className="search-component">
            <input
                placeholder="Search"
                data-testId= 'searchBox'
                value={searchString}
                className="searchBar"
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        onSearch(searchString);
                }}
            ></input>
            <button className="button" onClick={() => onSearch(searchString)}>Enter</button>
        </div>
    );
}


SearchForm.propTypes = {
    initalString: PropTypes.string.isRequired,
    onSearch: PropTypes.func,
};

SearchForm.defaultProps = {
    initalString: '',
    onSearch: undefined,
};
