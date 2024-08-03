// src/components/RestaurantForm.js
import React, { useState, useEffect } from "react";

const RestaurantForm = ({
  onAddRestaurant,
  onUpdateRestaurant,
  editingRestaurant,
  onClose,
}) => {
  // State for form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editingRestaurant) {
      setName(editingRestaurant.name);
      setAddress(editingRestaurant.address);
      setCuisine(editingRestaurant.cuisine);
    }
  }, [editingRestaurant]);

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Restaurant Name is required";
    if (name.length > 50)
      newErrors.name = "Restaurant Name should not exceed 50 characters";
    if (!address.trim()) newErrors.address = "Address is required";
    if (address.length > 80)
      newErrors.address = "Address should not exceed 80 characters";
    if (!cuisine.trim()) newErrors.cuisine = "Cuisine is required";
    if (cuisine.length > 50)
      newErrors.cuisine = "Cuisine should not exceed 50 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const restaurant = {
        name,
        address,
        cuisine,
        id: editingRestaurant ? editingRestaurant.id : Date.now(),
      };
      if (editingRestaurant) {
        onUpdateRestaurant(restaurant);
      } else {
        onAddRestaurant(restaurant);
      }
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">All fields with * are required.</p>
      {/* Restaurant Name input */}
      <div>
        <label className="block mb-1 text-sm font-bold text-gray-700">
          Restaurant Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          maxLength={50}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>
      {/* Address input */}
      <div>
        <label className="block mb-1 text-sm font-bold text-gray-700">
          Address *
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          maxLength={80}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address}</p>
        )}
      </div>
      {/* Cuisine input */}
      <div>
        <label className="block mb-1 text-sm font-bold text-gray-700">
          Cuisine *
        </label>
        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full p-2 border rounded"
          maxLength={50}
        />
        {errors.cuisine && (
          <p className="text-xs text-red-500">{errors.cuisine}</p>
        )}
      </div>
      {/* Submit button */}
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        {editingRestaurant ? "Update" : "Upload"}
      </button>
    </form>
  );
};

export default RestaurantForm;
