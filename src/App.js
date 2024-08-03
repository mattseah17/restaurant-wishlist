// src/App.js
import React, { useState, useEffect } from "react";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";
import ConfirmationModal from "./components/ConfirmationModal";
import SearchBar from "./components/SearchBar";

const App = () => {
  // State declarations
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    cuisine: "",
    tags: "",
  });

  // Add a new restaurant
  const addRestaurant = (restaurant) => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = [
        ...prevRestaurants,
        { ...restaurant, tags: restaurant.tags || [] },
      ];
      return sortRestaurants(newRestaurants, sortBy);
    });
  };

  // Initiate delete process
  const deleteRestaurant = (id) => {
    setRestaurantToDelete(id);
    setIsConfirmModalOpen(true);
  };

  // Confirm and execute delete
  const confirmDelete = () => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((r) => r.id !== restaurantToDelete)
    );
    setIsConfirmModalOpen(false);
    setRestaurantToDelete(null);
  };

  // Initiate edit process
  const editRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  };

  // Update existing restaurant
  const updateRestaurant = (updatedRestaurant) => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = prevRestaurants.map((r) =>
        r.id === updatedRestaurant.id
          ? { ...updatedRestaurant, tags: updatedRestaurant.tags || [] }
          : r
      );
      return sortRestaurants(newRestaurants, sortBy);
    });
    setEditingRestaurant(null);
  };

  // Sort restaurants based on criteria
  const sortRestaurants = (restaurantList, criteria) => {
    return [...restaurantList].sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return b.id - a.id; // Assuming id represents date, larger is more recent
      }
    });
  };

  // Filter by matches
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const nameMatch = restaurant.name
      .toLowerCase()
      .includes(searchTerms.name.toLowerCase());
    const cuisineMatch = restaurant.cuisine
      .toLowerCase()
      .includes(searchTerms.cuisine.toLowerCase());
    const tagMatch = restaurant.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerms.tags.toLowerCase())
    );
    return nameMatch && cuisineMatch && (searchTerms.tags === "" || tagMatch);
  });

  const isSearching =
    searchTerms.name !== "" ||
    searchTerms.cuisine !== "" ||
    searchTerms.tags !== "";

  // Handle sort change
  const handleSort = (criteria) => {
    setSortBy(criteria);
    setRestaurants((prevRestaurants) =>
      sortRestaurants(prevRestaurants, criteria)
    );
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRestaurant(null);
  };

  // Initial sort on component mount
  useEffect(() => {
    setRestaurants((prevRestaurants) =>
      sortRestaurants(prevRestaurants, "name")
    );
  }, []);

  return (
    <div className="max-w-md p-4 mx-auto mt-10">
      <h1 className="mb-4 text-3xl font-bold text-center">DineDiscovery</h1>
      <SearchBar searchTerms={searchTerms} setSearchTerms={setSearchTerms} />

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label
            htmlFor="sort-select"
            className="mr-2 font-medium text-gray-700"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="block w-40 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="name">Name</option>
            <option value="date">Date (Latest)</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Upload Restaurant Details
        </button>
      </div>

      {isSearching && (
        <p className="mb-4 text-sm text-gray-600">
          {filteredRestaurants.length === 1
            ? "1 result found"
            : `${filteredRestaurants.length} results found`}
        </p>
      )}

      <RestaurantList
        restaurants={filteredRestaurants}
        onDelete={deleteRestaurant}
        onEdit={editRestaurant}
        isSearching={isSearching}
      />
      {/* Modal for adding/editing restaurant */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          editingRestaurant
            ? "Edit Restaurant Details"
            : "Upload Restaurant Details"
        }
      >
        <RestaurantForm
          onAddRestaurant={addRestaurant}
          onUpdateRestaurant={updateRestaurant}
          editingRestaurant={editingRestaurant}
          onClose={closeModal}
        />
      </Modal>
      {/* Confirmation modal for delete action */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to remove details of this restaurant?"
      />
    </div>
  );
};

export default App;
