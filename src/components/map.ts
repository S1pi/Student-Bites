import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapElement = document.getElementById("map") as HTMLElement;

var map = L.map(mapElement).setView([60.1699, 24.9384], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const createMarker = (lat: number, lon: number, content: HTMLElement) => {
  L.marker([lat, lon]).addTo(map).bindPopup(content);
};

export { createMarker };
