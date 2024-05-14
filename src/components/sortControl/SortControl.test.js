import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SortControl, { RELEASE_DATE, TITLE } from './SortControl';
import userEvent from '@testing-library/user-event';

  describe("SortControl Component", () => {
    it("renders correctly with default value", () => {
      render(
        <SortControl
          onSortSelection={() => {}}
          defaultSortSelection={RELEASE_DATE}
        />
      );
  
      expect(screen.getByText("Sort by:")).toBeInTheDocument();
      expect(screen.getByText("Release Date")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
    });
  
    it("calls onSortSelection when the selection changes", () => {
      const mockOnSortSelection = jest.fn();
      render(
        <SortControl
          onSortSelection={mockOnSortSelection}
          defaultSortSelection={RELEASE_DATE}
        />
      );
  
      const select = screen.getByTestId("sort-select");
      userEvent.selectOptions(select, TITLE)
      expect(mockOnSortSelection).toHaveBeenCalledWith(TITLE);
    });

});