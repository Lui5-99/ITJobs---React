import React from "react";

const Search = () => {
  return (
    <div className="searcher">
      <form action="#">
        <input type="text" className="search" />
        <input type="submit" value="Buscar" />
      </form>
    </div>
  );
};

export default Search;
