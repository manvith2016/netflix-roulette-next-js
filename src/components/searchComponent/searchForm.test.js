import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import userEvent from '@testing-library/user-event';

describe('test search form component', () => {
  test("renders with initialString", () => {
    render(<SearchForm initalString='test' />);
    const searchBox = screen.getByTestId("searchBox");
    expect(searchBox).toHaveValue('test');
  });

  test("onSearch is called with search box value on keydown of ENTER", () => {
    const onSearchMock = jest.fn();
    render(<SearchForm initalString='' onSearch={onSearchMock} />);
    const searchBox = screen.getByTestId("searchBox");
    userEvent.type(searchBox, "test value");
    userEvent.keyboard('{Enter}');
    expect(onSearchMock).toHaveBeenCalledWith("test value");
  });
});
