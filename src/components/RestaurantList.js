import React from "react";
import RestaurantItem from "./RestaurantItem";

const RestaurantList = ({ restaurants, onDelete, onEdit, sortBy, onSort }) => {
  return (
    <div>
      {/* Sorting dropdown */}
      <div className="mb-4 flex items-center">
        <label htmlFor="sort-select" className="mr-2 font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSort(e.target.value)}
          className="block w-40 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="name">Name</option>
          <option value="date">Date (Latest)</option>
        </select>
      </div>
      {/* List of restaurants */}
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
