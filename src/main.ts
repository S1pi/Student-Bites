import "./components/map";
import { fetchData } from "./components/fetchdata";
import { Restaurant } from "./interfaces/Restaurant";
import { changeView, createMarker, deleteMarkers } from "./components/map";
import { restaurantInfo } from "./components/restaurantInfo";
import "./components/logInModal";

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

const sortedMarkers = async (city: string) => {
  deleteMarkers();
  const restaurants = await fetchRestaurants();

  restaurants.map(async (restaurant) => {
    if (restaurant.city === city) {
      const coords = restaurant.location.coordinates;
      createMarker(coords[1], coords[0], await restaurantInfo(restaurant));
      changeView(coords[1], coords[0]);
    } else if (city === "Kaikki") {
      const coords = restaurant.location.coordinates;
      createMarker(coords[1], coords[0], await restaurantInfo(restaurant));
    }
  });
};

const delBtns = document.querySelectorAll(".sortBtn");

delBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("value");
    if (!value) throw new Error("Buttonilta ei löytynyt valueta");
    sortedMarkers(value);
    // deleteMarkers();
    console.log("CLICK");
  });
});

createRestaurantMarkers();
