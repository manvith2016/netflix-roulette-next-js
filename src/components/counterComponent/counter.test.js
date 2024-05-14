import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from './counter';

describe('test counter component', () => {
  test("Render with initial value", () => {
    render(<Counter initialValue='0' />);
    const counterValue = screen.getByTestId("counter-value");
    expect(counterValue).toHaveTextContent(0);
  });

  test("Value to be increased by 1 when up-counter button is clicked", () => {
    render(<Counter initialValue='0' />);
    const counterValue = screen.getByTestId("counter-value");
    fireEvent.click(screen.getByTestId("up-counter"));
    expect(counterValue).toHaveTextContent(1);
  });
  
  test("Value to be decreased by 1 when up-counter button is clicked", () => {
    render(<Counter initialValue='0' />);
    const counterValue = screen.getByTestId("counter-value");
    fireEvent.click(screen.getByTestId("down-counter"));
    expect(counterValue).toHaveTextContent(-1);
  });
});
