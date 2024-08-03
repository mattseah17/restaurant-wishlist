// src/App.js
import React, { useState, useEffect } from "react";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";
import ConfirmationModal from "./components/ConfirmationModal";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  const addRestaurant = (restaurant) => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = [...prevRestaurants, restaurant];
      return sortRestaurants(newRestaurants, sortBy);
    });
  };

  const deleteRestaurant = (id) => {
    setRestaurantToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((r) => r.id !== restaurantToDelete)
    );
    setIsConfirmModalOpen(false);
    setRestaurantToDelete(null);
  };

  const editRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const updateRestaurant = (updatedRestaurant) => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = prevRestaurants.map((r) =>
        r.id === updatedRestaurant.id ? updatedRestaurant : r
      );
      return sortRestaurants(newRestaurants, sortBy);
    });
    setEditingRestaurant(null);
  };

  const sortRestaurants = (restaurantList, criteria) => {
    return [...restaurantList].sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return b.id - a.id;
      }
    });
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    setRestaurants((prevRestaurants) =>
      sortRestaurants(prevRestaurants, criteria)
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRestaurant(null);
  };

  useEffect(() => {
    setRestaurants((prevRestaurants) =>
      sortRestaurants(prevRestaurants, "name")
    );
  }, []);

  return (
    <div className="max-w-md p-4 mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold text-center">
        Restaurant Wishlist
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full p-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Upload restaurant details
      </button>
      <RestaurantList
        restaurants={restaurants}
        onDelete={deleteRestaurant}
        onEdit={editRestaurant}
        sortBy={sortBy}
        onSort={handleSort}
      />
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
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to remove this restaurant?"
      />
    </div>
  );
};

export default App;
