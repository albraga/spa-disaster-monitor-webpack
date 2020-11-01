import axios from 'axios'

const DISASTERS = 'https://api.reliefweb.int/v1/disasters?appname=omundoagora&profile=full&offset=0&limit=10&preset=latest'

const EARTHQUAKES = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=today&minmagnitude=4'

const DISASTER = 0
const EARTHQUAKE = 1


function getDisasters() {
  return axios.get(DISASTERS)
}
function getEarthquakes() {
  return axios.get(EARTHQUAKES)
}

function getDisastersAndEarthquakes() {
  return Promise.all([getDisasters(), getEarthquakes()]).then(result => {
    return [result[DISASTER].data.data, result[EARTHQUAKE].data.features]
  })
}


export default getDisastersAndEarthquakes