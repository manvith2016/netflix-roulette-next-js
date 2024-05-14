import React from 'react';
// import './MovieForm.css';


const DeleteMovie = ({ movieInfo, onDeleteMovie }) => {
  return (
    <div className='movieFormResultContainer'>
      <div>
        Are you sure you want to delete this movie?
      </div>
      <div className='deleteMovie-Btn'>
        <button type="button" className="btn btn-primary mt-3" onClick={() => onDeleteMovie(movieInfo)}>CONFIRM</button>
      </div>
    </div>
  );
}


export default DeleteMovie;
