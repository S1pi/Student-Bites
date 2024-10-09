import "./components/map";
import { fetchData } from "./components/fetchdata";
import { Restaurant } from "./interfaces/Restaurant";

const apiUrl = "https://media1.edu.metropolia.fi/restaurant/api/v1";

const restaurants: Restaurant[] = await fetchData(apiUrl + "/restaurants");

console.log(restaurants);
