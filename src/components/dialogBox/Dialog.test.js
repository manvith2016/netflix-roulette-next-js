import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Dialog from './Dialog';


describe('Dialog Component', () => {

  test('Dialog renders correctly with title and content', () => {
    const onClose = jest.fn();
    const title = 'Sample Title';
    const content = 'Sample Content';

    render(<Dialog title={title} onClose={onClose}>{content}</Dialog>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('Dialog calls onClose when close header button is clicked', () => {
    const onClose = jest.fn();
    const title = 'Sample Title';
    const content = 'Sample Content';

    render(<Dialog title={title} onClose={onClose}>{content}</Dialog>);

    const closeButton = screen.getByText('×');
    userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  test('Dialog calls onClose when close footer button is clicked', () => {
    const onClose = jest.fn();
    const title = 'Sample Title';
    const content = 'Sample Content';

    render(<Dialog title={title} onClose={onClose}>{content}</Dialog>);

    const closeButton = screen.getByText('Close');
    userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});