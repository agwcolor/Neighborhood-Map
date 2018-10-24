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
        console.log("hi there");
        console.log(values);  //see the google maps object
        let google = values[0];  //google 1st,
        this.venues = values[1].response.venues;

        //const location = {lat: 45.516136, lng: -73.656830};
        this.google = google;
        this.markers = [];  //anything google maps easier to deal w/ not in state.
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            scrollwheel: true,
            center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
        });
        this.infowindow = new google.maps.InfoWindow();
     });
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
