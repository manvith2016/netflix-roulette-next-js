import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieDetails from './MovieDetails';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Mocking the axios get function
jest.mock('axios');

describe('MovieTile Component', () => {
  test('that component renders all movie data passed in props', async () => {
    const key = "123";
    const imageURL = "http://localhost/dummy_poster.jpeg";
    const movieName = "Black Panther";
    const releaseYear = "2023";
    const generes = ["Action", "Adventure", "Fantasy"];

    // Mocking the axios response
    axios.get.mockResolvedValue({
      data: {
        poster_path: imageURL,
        title: movieName,
        release_date: releaseYear,
        genres: generes,
        overview: "overview",
        runtime: "runtime",
        revenue: "revenue",
        budget: "budget",
        vote_count: "1000",
        vote_average: "222",
        tagline: "tagLine",
      },
    });

    render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Routes>
          <Route path="/movies/:movieId" element={<MovieDetails
            key={key}
            selectedMovieData={{
              id: "12345",
              imageURL: imageURL,
              movieName: movieName,
              releaseYear: releaseYear,
              generes: generes,
              overview: "overview",
              runtime: "runtime",
              revenue: "revenue",
              budget: "budget",
              vote_count: "1000",
              vote_average: "222",
              tagline: "tagLine",
            }}
          />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the asynchronous axios call to complete
    await waitFor(() => {
      const img = screen.getByRole("img");
      expect(img).toBeInTheDocument();
      expect(img.src).toBe(imageURL);
      expect(screen.getByTestId("movieName").textContent).toContain(movieName);
      expect(screen.getByTestId("year").textContent).toContain(releaseYear);
      expect(screen.getByTestId("generes").textContent).toContain(
        generes.join(", ")
      );
      expect(screen.getByTestId("overview").textContent).toContain("overview");
      expect(screen.getByTestId("runtime").textContent).toContain("runtime");
      expect(screen.getByTestId("revenue").textContent).toContain("revenue");
      expect(screen.getByTestId("budget").textContent).toContain("budget");
      expect(screen.getByTestId("vote_count").textContent).toContain("1000");
      expect(screen.getByTestId("vote_average").textContent).toContain("222");
      expect(screen.getByTestId("tagline").textContent).toContain("tagLine");
    });
  });
});
