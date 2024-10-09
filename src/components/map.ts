import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

var map = L.map("map").setView([60.1699, 24.9384], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
