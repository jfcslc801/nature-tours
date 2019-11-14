/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiamZjc2xjODAxIiwiYSI6ImNrMno5azdoejAzNGEzZHA2OHlseHRxbGwifQ.t7L063ARRCSJsNHamna1Lw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
});