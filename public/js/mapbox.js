/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiamZjc2xjODAxIiwiYSI6ImNrMno5azdoejAzNGEzZHA2OHlseHRxbGwifQ.t7L063ARRCSJsNHamna1Lw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jfcslc801/ck2z9zcob0a431co95ogzzhfa',
  center: [-111.896821, 40.762864],
  zoom: 6,
  interactive: false
});