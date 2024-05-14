import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as yup from "yup";
import { HOST, fetchGenreList } from "../../services/genreService";
// import "./MovieForm.css";

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    release_date: yup.string().required("release_date is required"),
    poster_path: yup.string().required("poster_path is required"),
    vote_average: yup.string().required("vote_average is required"),
    genres: yup.array().required("genres is required"),
    runtime: yup.string().required("runtime is required"),
    tagline: yup.string().required("tagline is required"),
    overview: yup.string().required("overview is required"),
  })
  .required()


const MovieForm = ({ initialMovieInfo, successHandler, failureHandler }) => {
  const garbageInfo = ["genre","generes", "imageURL","movieName","releaseYear"]
  const [genreList, setGenreList] = useState([]);

  useEffect(()=>{
    let tempList = [];
    fetchGenreList()
    .then((response) => {
      response.data.data.map(i=>{
        tempList = tempList.concat(i.genres)
        return i.genres;
      });
      tempList = Array.from(new Set(tempList));
      setGenreList(tempList.toSorted())
      return tempList;
    })
    .catch((err) => {
      console.log('error', err)
     });
  },[])

  useEffect(()=>{
    reset(initialMovieInfo)
  },[initialMovieInfo])

  const { handleSubmit, control, reset, watch, formState: { errors }, setValue } = useForm({
    defaultValues: initialMovieInfo || {},
    resolver: yupResolver(schema)
  });

  const handleGenreChange = (selectedGenres) => {
    const selectedGenreValues = selectedGenres.map((genre) => genre.value);
    setValue('genres', selectedGenres.length>0?selectedGenreValues:null);
  };

  const beforeOnSubmit = (formUserData) => {
    formUserData = {...initialMovieInfo, ...formUserData, vote_average: Number(formUserData.vote_average), runtime: Number(formUserData.runtime)}
    garbageInfo.forEach((key)=>delete formUserData[key])
    console.log(formUserData)
    handleMovieFormSubmit(formUserData)
  }

  const handleMovieFormSubmit = (formData) => {
    // Handle form submission (e.g., save or update movie data)
    console.log('Form data submitted:', formData);
    let promise;
    if(initialMovieInfo){
      console.log("Editing new Movie")
      promise = axios.put(HOST+"/movies", formData);
    }else {
      console.log("Adding existing Movie")
      promise = axios.post(HOST+"/movies", formData);
    }
    promise.then((response) => {
      const msg = initialMovieInfo? "The movie has been updated into database successfully": "The movie has been added to database successfully";
      successHandler(msg)
    })
    .catch((err) => {
      console.log('error', err)
      failureHandler(err.response.data.messages.join(",\n"))
     }).finally(()=>{
        
     });
  }


  const genreOptions = genreList.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <form onSubmit={handleSubmit(beforeOnSubmit)}>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} type="text" data-testid="title"  className="form-control" id="title" placeholder="Enter title" />}
            />
            {errors.title && <p className="errorMsg">{errors.title.message}</p>}
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="release_date">Release Date:</label>
            <Controller
              name="release_date"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} type="date" data-testid="release_date" className="form-control" id="release_date" placeholder="Select Date"/>}
            />
            {errors.release_date && <p className="errorMsg">{errors.release_date.message}</p>}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="poster_path">Movie URL:</label>
            <Controller
              name="poster_path"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} type="text" data-testid="poster_path"  className="form-control" id="poster_path" placeholder="https://www.google.com"/>}
            />
            {errors.poster_path && <p className="errorMsg">{errors.poster_path.message}</p>}
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="vote_average">Rating:</label>
            <Controller
              name="vote_average"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field}  type="number" data-testid="vote_average" min="0" max="10" step="0.1"  className="form-control" id="vote_average" placeholder="7.8" />}
            />
            {errors.vote_average && <p className="errorMsg">{errors.vote_average.message}</p>}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <Controller
              name="genres"
              control={control}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="form-control"
                  data-testid="genre"
                  id="genre"
                  isMulti
                  rules={{ required: true }}
                  options={genreOptions}
                  value={genreOptions.filter(
                    (option) => {
                      if(!value) return false
                      return value.includes(option.value)
                    }
                  )}
                  onChange={handleGenreChange}
                />
              )}
            />
            {errors.genres && <p className="errorMsg">{errors.genres.message}</p>}
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="runtime">Runtime:</label>
            <Controller
              name="runtime"
              control={control}
              rules={{ required: true, min: 10, max: 1000 }}
              render={({ field }) => <input {...field} type="number"  data-testid="runtime" step="1"  className="form-control" id="runtime" placeholder="120"/>}
            />
            {errors.runtime && <p className="errorMsg">{errors.runtime.message}</p>}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="tagline">Tagline:</label>
            <Controller
              name="tagline"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} type="text" data-testid="tagline"  className="form-control" id="tagline" placeholder="Enter tagline"/>}
            />
            {errors.tagline && <p className="errorMsg">{errors.tagline.message}</p>}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="overview">Overview:</label>
            <Controller
              name="overview"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <textarea {...field} data-testid="overview"  className="form-control" id="overview" placeholder="Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart." />}
            />
            {errors.overview && <p className="errorMsg">{errors.overview.message}</p>}
          </div>
        </div>
      </div>

      <div className="movieForm-Btn">
        <button type="button" data-testid="resetBtn" className="btn btn-primary mt-3" onClick={() => reset(initialMovieInfo)}>
          Reset
        </button>
        <button type="submit" data-testid="submitBtn" className="btn btn-primary mt-3">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
