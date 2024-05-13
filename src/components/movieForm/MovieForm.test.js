import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MovieForm from './MovieForm';


describe('MovieForm Component', () => {

  test('MovieForm renders correctly with initial data', () => {
    const onSubmit = jest.fn();
    const genreList = ['Action', 'Drama', 'Comedy'];
    const initialMovieInfo = {
      title: 'Sample Title',
      release_date: '2022-01-01',
      poster_path: 'https://www.sample.com/sample.jpg',
      vote_average: 7.5,
      genres: ['Action'],
      runtime: 120,
      overview: 'Sample Overview',
      tagline: "tagline"
    };

    render(
      <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} genreList={genreList} />
    );

    expect(screen.getByTestId('title')).toHaveValue(initialMovieInfo.title)
    expect(screen.getByTestId("release_date")).toHaveValue(initialMovieInfo.release_date)
    expect(screen.getByTestId('poster_path')).toHaveValue(initialMovieInfo.poster_path)
    expect(screen.getByTestId('vote_average')).toHaveValue(initialMovieInfo.vote_average)
    expect(screen.getByTestId('runtime')).toHaveValue(initialMovieInfo.runtime)
    expect(screen.getByTestId('overview')).toHaveValue(initialMovieInfo.overview)
    expect(screen.getByTestId('tagline')).toHaveValue(initialMovieInfo.tagline)
  });

  test('MovieForm calls onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn();
    const genreList = ['Action', 'Drama', 'Comedy'];
    render(<MovieForm onSubmit={onSubmit} genreList={genreList} />);

    const submitButton = screen.getByTestId('submitBtn');
    userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
  });

  test('MovieForm calls handleReset when the Reset button is clicked', () => {
    const genreList = ['Action', 'Drama', 'Comedy'];
    const initialMovieInfo = {
      title: 'Sample Title',
      release_date: '2022-01-01',
      poster_path: 'https://www.sample.com/sample.jpg',
      vote_average: 7.5,
      genres: ['Action'],
      runtime: 120,
      overview: 'Sample Overview',
      tagline: "tagline"
    };
    const spy = jest.spyOn(console, 'log');
    render(
      <MovieForm initialMovieInfo={initialMovieInfo} genreList={genreList} />
    );

    const resetButton = screen.getByTestId('resetBtn');
    userEvent.click(resetButton);

    expect(spy).toHaveBeenCalledWith('handleReset called');
  });

});