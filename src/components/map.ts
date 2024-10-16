import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// Markkerien kuvapolut buildiin!!!
// const iconUrl = "./leaflet/marker-icon.png";
// const iconRetinaUrl = "./leaflet/marker-icon-2x.png";
// const shadowUrl = "./leaflet/marker-shadow.png";

// L.Icon.Default.mergeOptions({
//   iconUrl,
//   iconRetinaUrl,
//   shadowUrl,
// });

const mapElement = document.getElementById("map") as HTMLElement;
export let markers: L.Marker[] = [];

var map = L.map(mapElement).setView([60.1699, 24.9384], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const createMarker = (lat: number, lon: number, content: HTMLElement) => {
  const marker = L.marker([lat, lon]).addTo(map).bindPopup(content);
  markers.push(marker);
};

const deleteMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
};

const changeView = (lat: number, lon: number) => {
  map.setView([lat, lon], 11);
};

export { createMarker, deleteMarkers, changeView };
