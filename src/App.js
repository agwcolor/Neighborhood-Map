import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_places } from './utils/utils.js';
import Sidebar from './sidebar'

class App extends Component {
  state = {
  myVenues: [],
  markers: []
}

    componentDidMount() {

      //load google maps API asynchronously
      let googleMapsPromise = load_google_maps();
      //load Foursquare data via promise
      let placesPromise = load_places();
      Promise.all([ //takes in an array of promises and assigns response objects to variables
        googleMapsPromise,
        placesPromise
      ])
     .then(values => {  //an array of values, json objects
        //console.log(values);  //see the google maps object
        let google = values[0];  //google 1st,
        this.venues = values[1].response.venues; //venue
        //console.log(this.venues[0].location.lat + "lat" + this.venues[0].location.lng  + "long is a the this.venues variable");
        this.google = google;
        this.markers = [];  //anything google maps easier to deal w/ not in state.
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            scrollwheel: true,
            center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }});
        let infowindow = new google.maps.InfoWindow();
        this.map = map;
        //console.log(this.venues[0].location.address + "#10");
        console.log("hi");
        this.venues.forEach(venue => {   //create marker for each venue

           let marker = new google.maps.Marker({
           position: { lat: venue.location.lat, lng: venue.location.lng},
           map: this.map,
           venue: venue,
           id: venue.id,
           name: venue.name,
           animation: google.maps.Animation.DROP
           });

           // Add onclick event listener  to open an infowindow at each marker.

           marker.addListener('click', function(e) {
           populateInfoWindow(this, infowindow);
           });

           this.markers.push(marker); //add to marker array

        });

        this.setState( { myVenues: this.venues });
        this.setState( { markers: this.markers });
        //console.log(this.state.myVenues[0].location.address + "is the value of this.state.myVenues");
      });

      // This function populates the infowindow when the marker is clicked.
   function populateInfoWindow(marker, infowindow, google = window.google) {
   // Check to make sure the infowindow is not already opened on this marker.
   if (infowindow.marker !== marker) {
    infowindow.marker = marker;
    infowindow.setContent(`<div> ${marker.name} <p> ${marker.venue.location.address?marker.venue.location.address:""} </div>`);
    infowindow.open(marker.map, marker);
    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 1500);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
    infowindow.setMarker = null;

    });
}};

}


//loop through each of the markers and check if query matches input.
filterMyVenues = (query) => {
  let f= this.venues.filter(venue =>
    venue.name.toLowerCase().includes(query.toLowerCase())); //give me the venues where the name includes the query
    this.markers.forEach(marker => {
       marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
       marker.setVisible(true) :
       marker.setVisible(false)
    });
  console.log(query);
  this.setState( {myVenues: f, query });
}





//open infowindow when list item is clicked
listItemClick = (venue, infowindow = new window.google.maps.InfoWindow()) => { //get marker by id property
  let marker = this.state.markers.filter(m => m.id === venue.id)[0];
  if (infowindow.marker !== marker) {

  infowindow.setContent(`<div> ${marker.name} <p> ${marker.venue.location.address?marker.venue.location.address:""} </div>`);
  this.map.setZoom(13);
  this.map.setCenter(marker.position);
  infowindow.open(this.map, marker);
  this.map.panBy(0, -125);
  if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 1500);

  }
}

  render() {
    return (
      <div>

          <div id="map">
          </div>

          <Sidebar
             listItemClick={this.listItemClick}
             filterVenues={this.filterVenues}
             myVenues={this.state.myVenues}
           />

    </div>
    );
  }
}

export default App;
