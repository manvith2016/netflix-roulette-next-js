import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieTile from './MovieTile';
describe('MovieTile Component', () => {
  test('that component renders all movie data passed in props', () => {
    const key="123";
    const imageURL="http://localhost/dummy_poster.jpeg";
    const movieName="Black Panther";
    const releaseYear="2023";
    const generes=["Action","Adventure","Fantasy"]

    render(
      <MovieTile
        key={key}
        movieTileData={{
          id: "12345",
          imageURL: imageURL,
          movieName: movieName,
          releaseYear: releaseYear,
          generes: generes,
        }}
      ></MovieTile>
    );
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imageURL)
    expect(screen.getByTestId('movieName').textContent).toContain(movieName)
    expect(screen.getByTestId('year').textContent).toContain(releaseYear)
    expect(screen.getByTestId('genere').textContent).toContain(generes.join(", "))
  });

});