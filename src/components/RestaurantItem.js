// src/components/RestaurantItem.js
import React from "react";

const RestaurantItem = ({ restaurant, onDelete, onEdit }) => {
  return (
    <div className="flex flex-col p-2 mb-2 bg-white border rounded">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">{restaurant.name}</h3>
          <p className="text-sm text-gray-600">{restaurant.address}</p>
          <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
        </div>
        <div>
          <button
            onClick={() => onEdit(restaurant)}
            className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(restaurant.id)}
            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      {restaurant.tags && restaurant.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {restaurant.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantItem;
