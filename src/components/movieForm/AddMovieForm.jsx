// AddMovieForm.js
import React, { useState } from 'react';
import Dialog from '../dialogBox/Dialog';
import MovieForm from './MovieForm';
import MovieFormResult from './MovieFormResult';
import { useNavigate } from 'react-router-dom';

const AddMovieForm = () => {
  // Your form logic here
  const [movieFormResult, setMovieFormResult] = useState({
    msg: null,
    isOpen: false,
    isSuccess: true
  })
  const navigate = useNavigate();
  console.log("From AddMovieForm")

  const successHandler = (msg) =>{
    setMovieFormResult({msg: msg, isOpen: true, isSuccess: true})
  }

  const failureHandler = (msg) =>{
    setMovieFormResult({msg: msg, isOpen: true, isSuccess: false})
  }

  return (
    <>
        <Dialog title="ADD MOVIE">
            <MovieForm successHandler={successHandler} failureHandler={failureHandler} />
        </Dialog>
        {movieFormResult.isOpen && <Dialog title={""}  onClose={()=>{movieFormResult.isSuccess?navigate("/"):setMovieFormResult({isOpen: false})}}>
            <MovieFormResult movieFormResult={movieFormResult}></MovieFormResult>
        </Dialog>}
    </>
  );
};

export default AddMovieForm;
