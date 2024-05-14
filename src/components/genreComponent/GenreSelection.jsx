import PropTypes from 'prop-types';
// import './genreSelection.css';

export const GenreSelection = ({ genres, selectedGenre, onSelect }) => {

    return (
        <div className="genre-list" data-testid="genre-list">
            {genres.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <button
                    className={selectedGenre === item ? 'selected-genre' : ''}
                    data-testid={selectedGenre === item ? 'selected-genre' : ''}
                    onClick={() => onSelect(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}


GenreSelection.propTypes = {
    selectedGenre: PropTypes.string.isRequired,
    genres: PropTypes.array,
    onSelect: PropTypes.func,
};

GenreSelection.defaultProps = {
    selectedGenre: 'All',
    genres: ['All', 'Documentary', 'Comedy', 'Horror'],
    onSelect: (genre) => { console.log(genre) },
};
