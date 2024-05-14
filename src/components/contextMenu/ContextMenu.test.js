import React from 'react';
import { render, screen } from '@testing-library/react';
import ContextMenu from './ContextMenu';
import userEvent from '@testing-library/user-event';

describe('ContextMenu Component', () => {
  it('calls the appropriate click handler when an option is clicked', () => {
    const onViewMoviewSelect = jest.fn();
    const onEditMoviewSelect = jest.fn();
    const onDeleteMoviewSelect = jest.fn();

    render(
      <ContextMenu
        MENU_ID="context-menu"
        menuData={{  }}
        onViewMoviewSelect={onViewMoviewSelect}
        onEditMoviewSelect={onEditMoviewSelect}
        onDeleteMoviewSelect={onDeleteMoviewSelect}
      />
    );

    const button = screen.getByTestId('context-menu-button');
    
    userEvent.click(button);
    const viewOption = screen.getByTestId('view');
    userEvent.click(viewOption);

    userEvent.click(button);
    const editOption = screen.getByTestId('edit');
    userEvent.click(editOption);

    userEvent.click(button);
    const deleteOption = screen.getByTestId('delete');
    userEvent.click(deleteOption);

    expect(onViewMoviewSelect).toHaveBeenCalledTimes(1);
  });
});
