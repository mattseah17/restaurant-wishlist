// src/App.js
import React, { useState, useEffect } from "react";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";
import ConfirmationModal from "./components/ConfirmationModal";

const App = () => {
  // State declarations
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  // Add a new restaurant
  const addRestaurant = (restaurant) => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = [...prevRestaurants, restaurant];
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
        r.id === updatedRestaurant.id ? updatedRestaurant : r
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
      <h1 className="mb-4 text-2xl font-bold text-center">DineDiscovery</h1>
      {/* Button to open add restaurant modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full p-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Upload restaurant details
      </button>
      {/* Restaurant list component */}
      <RestaurantList
        restaurants={restaurants}
        onDelete={deleteRestaurant}
        onEdit={editRestaurant}
        sortBy={sortBy}
        onSort={handleSort}
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
