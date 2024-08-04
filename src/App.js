/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";
import ConfirmationModal from "./components/ConfirmationModal";
import SearchBar from "./components/SearchBar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import backgroundImage from "./background2.png";

const App = () => {
  // State declarations
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [sortBy, setSortBy] = useState("date");
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
        { ...restaurant, tags: restaurant.tags || [], id: Date.now() },
        ...prevRestaurants,
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
        return b.id - a.id; // Date sorting is now the default
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
      sortRestaurants(prevRestaurants, "date")
    );
  }, []);

  return (
    <div
      className="App mx-auto min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-4 mx-auto">
        <h1 className="mt-10 mb-10 text-5xl text-center roboto-slab-header">
          DineDiscovery
        </h1>
        <SearchBar searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
        <div className="flex flex-col items-center justify-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600"
          >
            Upload Restaurant Details
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mb-4 mt-4">
          <div className="flex items-center">
            <label
              htmlFor="sort-select"
              className="mr-2 font-medium text-gray-700 roboto-slab-label"
            >
              Sort by:
            </label>
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {sortBy === "name" ? "Name" : "Date (Latest)"}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block px-4 py-2 text-sm`}
                        onClick={() => handleSort("date")}
                      >
                        Date (Latest)
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block px-4 py-2 text-sm`}
                        onClick={() => handleSort("name")}
                      >
                        Name
                      </a>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>

        {isSearching && (
          <p className="mb-4 text-base text-gray-600">
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
    </div>
  );
};

export default App;
