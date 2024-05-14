import { useState } from "react";
export const RELEASE_DATE = "release_date";
export const TITLE = "title";
const SortControl = ({ onSortSelection, defaultSortSelection }) => {
  const [value, setValue] = useState(defaultSortSelection);

  const handleChange = (event) => {
    setValue(event.target.value)
    onSortSelection(event.target.value)

  }
  return (
    <div style={{ height: "82px" }}>
      <label style={{ color: "white", padding: "10px" }}>Sort by: </label>
      <select
        data-testid="sort-select"
        className="p-1"
        value={value}
        onChange={handleChange}
        style={{ width: "66%" }}
      >
        <option value={RELEASE_DATE}>Release Date</option>
        <option value={TITLE}>Title</option>
      </select>
    </div>
  );
};

export default SortControl;
