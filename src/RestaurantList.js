import React, { useState } from "react";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    cuisine: "",
  });

  const addRestaurant = (e) => {
    e.preventDefault();
    if (newRestaurant.name && newRestaurant.address && newRestaurant.cuisine) {
      setRestaurants([...restaurants, { ...newRestaurant, id: Date.now() }]);
      setNewRestaurant({ name: "", address: "", cuisine: "" });
    }
  };

  const deleteRestaurant = (id) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
  };

  return (
    <div>
      <h2>Restaurant Wishlist</h2>
      <form onSubmit={addRestaurant}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={newRestaurant.name}
          onChange={(e) =>
            setNewRestaurant({ ...newRestaurant, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={newRestaurant.address}
          onChange={(e) =>
            setNewRestaurant({ ...newRestaurant, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Cuisine"
          value={newRestaurant.cuisine}
          onChange={(e) =>
            setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })
          }
        />
        <button type="submit">Add Restaurant</button>
      </form>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.cuisine} - {restaurant.address}
            <button onClick={() => deleteRestaurant(restaurant.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
