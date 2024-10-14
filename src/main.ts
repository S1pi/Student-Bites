import "./components/map";
import { fetchData } from "./components/fetchdata";
import { Restaurant } from "./interfaces/Restaurant";
import { createMarker } from "./components/map";
import { restaurantInfo } from "./components/restaurantModal";

const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const restaurants: Restaurant[] = await fetchData("/restaurants");
    return restaurants;
  } catch (err) {
    throw new Error(`Error fetching restaurants: + ${err}`);
  }
};

const createRestaurantMarkers = async (): Promise<void> => {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);
  restaurants.map(async (restaurant) => {
    const coords = restaurant.location.coordinates;
    createMarker(coords[1], coords[0], await restaurantInfo(restaurant));
  });
};

createRestaurantMarkers();
