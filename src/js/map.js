import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/layers-2x.png'
import 'leaflet/dist/images/layers.png'
import '../img/earthquake.png'
import '../img/global-warming.png'

const KEY = 'pk.eyJ1IjoiYWxicmFnYSIsImEiOiJja2dtazk0enkxMjdiMnlxcHBkNGFleHUwIn0.f5gS2r6rRIbYXLg3i-DP1Q'

function map(disasters, earthquakes) {
  let mymap = L.map('mapid').setView([40, 15], 1)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //maxZoom: 1,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: KEY
  }).addTo(mymap)

  disasters.forEach(disaster => {
    let disa = L.icon({ iconUrl: 'global-warming.png' })
    let marker = L.marker([disaster.lat, disaster.lon], { icon: disa }).addTo(mymap)
    marker.bindPopup(`<b>Desastre:</b><br>${disaster.name}`).openPopup()
  })

  earthquakes.forEach(earthquake => {
    let earth = L.icon({ iconUrl: 'earthquake.png' })
    let marker = L.marker([earthquake.lat, earthquake.lon], { icon: earth }).addTo(mymap)
    marker.bindPopup(`<b>Terremoto:</b><br>${earthquake.place}`).openPopup()
  })

}

export default map