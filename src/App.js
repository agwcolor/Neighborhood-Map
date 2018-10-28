import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_places } from './utils/utils.js';

class App extends Component {
  state = {
  myVenues: [],
  markers: []
}

    componentDidMount() {
      this.setState();
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
        console.log(this.venues[0].location.lat + "lat" + this.venues[0].location.lng  + "long is a the this.venues variable");


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
         marker.addListener('click', function(e) {
           populateInfoWindow(this, infowindow);
         });


        this.markers.push(marker);
        //console.log(this.markers)
        });
        this.setState( { myVenues: this.venues }); //see html
        this.setState( { markers: this.markers }); //see html
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


//loop through each of the markers and check if query matches input.
filterMyVenues = (query) => {
  let f= this.venues.filter(venue =>
    venue.name.toLowerCase().includes(query.toLowerCase())); //give me the venues where the name includes the query
    this.markers.forEach(marker => {
       console.log(marker);
       marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
       marker.setVisible(true) :
       marker.setVisible(false)
    });
  console.log(query);
  this.setState( {myVenues: f, query });
}

listItemClick = (venue, infowindow = new window.google.maps.InfoWindow()) => { //get marker by id property
  console.log(this.state.markers + "#4");
  console.log(venue.id + "#5");
  let marker = this.state.markers.filter(m => m.id === venue.id)[0];
  console.log(marker + " is the value of my marker");
    console.log(marker.name + " is the value of my marker");
  infowindow.setContent('<div>' + marker.name + '</div>');
  this.map.setZoom(13);
  this.map.setCenter(marker.position);
  infowindow.open(this.map, marker);
  this.map.panBy(0, -125);
  if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 1500);
}


  render() {
    return (
      <div>
        <div id="map">
        </div>

        <div id="sidebar">
         <input placeholder="search" value={this.state.query}
            onChange={(e) => this.filterMyVenues(e.target.value) }/>
          {
          this.state.myVenues && this.state.myVenues.length > 0
            && this.state.myVenues.map ((venue, index) => (
              <div key={index} className="venue-item"
                   onClick={(e) => this.listItemClick(venue)}
              >
              {venue.name}
             </div>
          ))
          }
       </div>
    </div>
    );
  }
}

export default App;
