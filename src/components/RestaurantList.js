import React from "react";
import RestaurantItem from "./RestaurantItem";

const RestaurantList = ({ restaurants, onDelete, onEdit, isSearching }) => {
  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">
          {isSearching ? "No results found" : "No restaurants added yet"}
        </p>
        {isSearching && (
          <p className="text-sm text-gray-500 mt-2">
            Try adjusting your search criteria
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
