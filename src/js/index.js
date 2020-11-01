import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import countries from './countries.js'
import '../css/style.css'
import getDisastersAndEarthquakes from './api.js'
import map from './map.js'
import feather from 'feather-icons'

const DISASTER = 0
const EARTHQUAKE = 1

feather.replace()

const rootComponent = {
  data() {
    return {
      affectedCountriesDisasters: [],
      affectedCountriesEarthquakes: []
    }
  },
  beforeCreate() {
    getDisastersAndEarthquakes().then(disastersAndEarthquakes => {
      let disasters = disastersAndEarthquakes[DISASTER]
      let earthquakes = disastersAndEarthquakes[EARTHQUAKE]
      disasters.forEach(disaster => {
        let aCountry = countries.find(country => country.iso3 == disaster.fields.country[0].iso3)
        this.affectedCountriesDisasters.push(aCountry)
      })
      earthquakes.forEach(earthquake => {
        let place = earthquake.properties.place
        let lat = earthquake.geometry.coordinates[1]
        let lon = earthquake.geometry.coordinates[0]
        let quake = { place, lat, lon }
        this.affectedCountriesEarthquakes.push(quake)
      })
      map(this.affectedCountriesDisasters, this.affectedCountriesEarthquakes)
    })
  },
  mounted() {

  }
}

const app = createApp(rootComponent)
app.mount('#app')