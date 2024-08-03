import React from "react";

const SearchBar = ({ searchTerms, setSearchTerms }) => {
  return (
    <div className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerms.name}
        onChange={(e) =>
          setSearchTerms({ ...searchTerms, name: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Search by cuisine"
        value={searchTerms.cuisine}
        onChange={(e) =>
          setSearchTerms({ ...searchTerms, cuisine: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Search by tags"
        value={searchTerms.tags}
        onChange={(e) =>
          setSearchTerms({ ...searchTerms, tags: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
