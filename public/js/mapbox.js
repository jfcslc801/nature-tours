/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiamZjc2xjODAxIiwiYSI6ImNrMnpjNHVpZDBkOHgzY3IzcTF5amYwc2kifQ.sDt-UQ3enbV9UyYzBNXYnw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jfcslc801/ck2z9zcob0a431co95ogzzhfa',
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
    .addTo(map)

  // extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100
  }
});