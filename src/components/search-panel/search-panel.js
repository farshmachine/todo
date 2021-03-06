import React from "react";

import "./search-panel.css";

const SearchPanel = ({ itemsFilter }) => {
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      onChange={itemsFilter}
    />
  );
};

export default SearchPanel;
