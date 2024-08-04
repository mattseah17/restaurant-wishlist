import React from "react";

const SearchBar = ({ searchTerms, setSearchTerms }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl flex flex-wrap justify-center gap-2">
        <input
          type="text"
          name="name"
          value={searchTerms.name}
          onChange={handleChange}
          placeholder="Search by name"
          className="flex-1 min-w-[200px] px-3 py-2 border rounded-md mr-3"
        />
        <input
          type="text"
          name="cuisine"
          value={searchTerms.cuisine}
          onChange={handleChange}
          placeholder="Search by cuisine"
          className="flex-1 min-w-[200px] px-3 py-2 border rounded-md mr-3 ml-3"
        />
        <input
          type="text"
          name="tags"
          value={searchTerms.tags}
          onChange={handleChange}
          placeholder="Search by tags"
          className="flex-1 min-w-[200px] px-3 py-2 border rounded-md ml-3"
        />
      </div>
    </div>
  );
};

export default SearchBar;
