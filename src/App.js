import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_places } from './utils/utils.js';

class App extends Component {
  state = {}

    componentDidMount() {
      //load google maps API asynchronously
      let googleMapsPromise = load_google_maps();
      let placesPromise = load_places();
      Promise.all([ //takes in an array of promises
        googleMapsPromise,
        placesPromise
      ])
     .then(values => {  //an array of values
        console.log(values);  //see the google maps object
        let google = values[0];  //google 1st,
        this.venues = values[1].response.venues;
        console.log(this.venues[0].location.lat + "lat" + this.venues[0].location.lng  + "long" + "is a the this.venues variable");


        //const location = {lat: 45.516136, lng: -73.656830};
        this.google = google;
        this.markers = [];  //anything google maps easier to deal w/ not in state.
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            scrollwheel: true,
            center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }});
        let infowindow = new google.maps.InfoWindow();
        this.map = map;

        this.venues.forEach(venue => {   //create marker
         let marker = new google.maps.Marker({
         position: { lat: venue.location.lat, lng: venue.location.lng},
         map: this.map,
         venue: venue,
         id: venue.id,
         name: venue.name,
         animation: google.maps.Animation.DROP
         });
         // Create an onclick event to open an infowindow at each marker.
         marker.addListener('click', function() {
           populateInfoWindow(this, infowindow);
         });
        this.markers.push(marker);
        //console.log(this.markers)
       });


      });
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
        function populateInfoWindow(marker, infowindow) {

        console.log("this is the value of marker" + marker.id);
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.name + '</div>');
          infowindow.open(marker.map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
          infowindow.setMarker = null;
          });
        }};

}

  render() {
    return (
      <div>
        <div id="map">
        </div>
        <div id="sidebar">
        </div>
      </div>
    );
  }
}

export default App;
