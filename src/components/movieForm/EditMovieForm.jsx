// AddMovieForm.js
import React, { useEffect, useState } from 'react';
import Dialog from '../dialogBox/Dialog';
import MovieForm from './MovieForm';
import MovieFormResult from './MovieFormResult';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HOST } from "../../services/genreService";

const EditMovieForm = () => {
  // Your form logic here
  const [movieFormResult, setMovieFormResult] = useState({
    msg: null,
    isOpen: false,
    isSuccess: true
  })
  const [initialMovieInfo, setInitialMovieInfo] = useState({});

  let { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      console.log("useEffect Setting Genre Menu's")
      axios.get(HOST+"/movies/"+movieId)
      .then((response) => {
          setInitialMovieInfo(response.data)
          return response.data;
      })
      .catch((err) => {
          console.log('error', err)
       });
    }, [movieId])


  const successHandler = (msg) =>{
    setMovieFormResult({msg: msg, isOpen: true, isSuccess: true})
  }

  const failureHandler = (msg) =>{
    setMovieFormResult({msg: msg, isOpen: true, isSuccess: false})
  }

  useEffect(()=>{
    console.log("initialMovieInfo fetched1: ",initialMovieInfo)
  },[initialMovieInfo])

  return (
    <>
        <Dialog title="EDIT MOVIE">
            <MovieForm initialMovieInfo={initialMovieInfo} successHandler={successHandler} failureHandler={failureHandler} />
        </Dialog>
        {movieFormResult.isOpen && <Dialog title={""} onClose={()=>{movieFormResult.isSuccess?navigate(-1):setMovieFormResult({isOpen: false})}}>
            <MovieFormResult movieFormResult={movieFormResult}></MovieFormResult>
        </Dialog>}
    </>
  );
};

export default EditMovieForm;
