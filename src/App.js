import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_places } from './utils/utils.js';
import Sidebar from './sidebar'

class App extends Component {

  state = {
  myVenues: [], //filtered venues that appear in sidebar
  markers: [], //complete list of markers
  infoWindow: '', //single infowindow to set to currently  active marker
  openMarkers: false,
  }

  componentDidMount() { //first, get api data

      window.gm_authFailure = () => { //google maps API error handling
           //  show message to the user
        alert('Google maps failed to load! Please check your API key');
      }

      //load google maps API asynchronously
      let googleMapsPromise = load_google_maps();
      //load Foursquare data via promise
      let placesPromise = load_places();
      Promise.all([ //takes in an array of promises and assigns response objects to variables
        googleMapsPromise,
        placesPromise
      ])
     .then(values => {  //an array of values, json objects
        let google = values[0];  //google 1st,
        this.venues = values[1].response.venues; //Foursquare venue search
        this.google = google;
        this.markers = [];  //anything google maps easier to deal w/ not in state.
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            scrollwheel: true,
            center: { lat: this.venues[2].location.lat, lng: this.venues[2].location.lng }});
        if (typeof(this.state.infoWindow) != "undefined") {
            this.setState({ infoWindow : new google.maps.InfoWindow()});
        }

        let infowindow = this.state.infoWindow;
        this.map = map;
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
            this.populateInfoWindow(this, venue, marker, infowindow);
           }.bind(this));

           this.markers.push(marker); //add to marker array
        });

         //add tabindex to google maps markers
         google.maps.event.addListener(map, "tilesloaded", function(){
           [].slice.apply(document.querySelectorAll('#map a')).forEach(function(item) {
           item.setAttribute('tabindex','0');
           });
        })
        this.setState( { myVenues: this.venues });
        this.setState( { markers: this.markers });
      });
}


//populate infowindow when marker is clicked.
populateInfoWindow = (marker = 0,  venue, google = window.google) => {
    //set initial state of infoWindow if not already defined
    if (typeof(this.state.infoWindow) == "undefined") {
            this.setState({ infoWindow : new window.google.maps.InfoWindow()});
    }

   let infowindow = this.state.infoWindow;
   marker = this.state.markers.filter(m => m.id === venue.id)[0];

   // make sure the infowindow is not already opened on this marker.
   if (infowindow.marker !== marker) {

       //clear active links
     let clearActive = document.querySelector(".active");
     if (clearActive) {clearActive.classList.remove("active")};

      //add active link to sidebar item
     document.getElementById(`${marker.name}`).classList.add("active");

     infowindow.marker = marker; //set infowindow to current marker
     infowindow.setContent(`<div tabIndex="0" aria-label="info window"> ${marker.name} <p> ${marker.venue.location.address?marker.venue.location.address:"No address listed on Foursquare"} </div>`);
     infowindow.open(marker.map, marker);
     this.map.setZoom(12);
     this.map.setCenter(marker.position);
     this.map.panBy(0, -125);

     this.setState( { infoWindow: infowindow }); //update infoWindow to current marker
     this.setState({openMarkers: true}); //info window is set to opened

    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
    setTimeout(() => { marker.setAnimation(null) }, 1500);

    // make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
       infowindow.marker = null;
      this.setState( { infoWindow: infowindow }); //update infowindow state to null
    // remove active link in sidebar if active on closing infoWindow
     document.getElementById(`${marker.name}`).classList.remove("active");
    }.bind(this));
}};


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


  render() {
    return (
      <main id="maincontent">

        <section id="map-container" aria-label="Map of Restaurants">
            <div id="map" tabIndex="0" aria-label="location" role="application" className="map_front"></div>
        </section>

        <Sidebar
             populateInfoWindow={this.populateInfoWindow}
             filterMyVenues={this.filterMyVenues}
             myVenues={this.state.myVenues}
        />
      </main>
    );
  }
}

export default App;
