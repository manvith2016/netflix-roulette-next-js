import { fireEvent, render, screen } from '@testing-library/react';
import { GenreSelection } from './GenreSelection';

describe('test genre selection component', () => {
  test("Renders genres with All being the selected test.", () => {
    render(<GenreSelection genres={['All', 'Documentary']} selectedGenre='All' />);
    const genre = screen.getByTestId("genre-list");
    expect(genre).toBeDefined();
    expect(screen.getByText("All")).toHaveClass("selected-genre");
  });

  test("onSelect event is triggered when a genre is selected.", () => {
    const onSelectMock = jest.fn();
    render(<GenreSelection genres={['All', 'Documentary']} selectedGenre='All' onSelect={onSelectMock} />);
    fireEvent.click(screen.getByText("Documentary"));
    expect(onSelectMock).toHaveBeenCalledWith("Documentary");
  });
});
