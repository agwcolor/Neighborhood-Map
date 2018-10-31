import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_places } from './utils/utils.js';
import Sidebar from './sidebar'

class App extends Component {

  state = {
  myVenues: [],
  markers: [],
  infoWindow: '',
  openMarkers: false,   /* { id : true } */
  }

  componentDidMount() {

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
        //let infowindow = new google.maps.InfoWindow();
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
           //get side bar list element corresponding to marker
            let listMarker = document.getElementById(`${marker.name}`);
            if (listMarker.className !== 'active') {
            //change color of corresponding sidebar link when map marker clicked
           listMarker.classList.add("active");
            }

            populateInfoWindow(this, infowindow);
           });

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
        //console.log(this.state.myVenues[0].location.address + "is the value of this.state.myVenues");

      });

    //populate infowindow when marker is clicked.
   function populateInfoWindow(marker, infowindow, google = window.google) {

   // make sure the infowindow is not already opened on this marker.
   if (infowindow.marker !== marker) {
    infowindow.marker = marker;
    infowindow.setContent(`<div tabIndex="0" aria-label="info window"> ${marker.name} <p> ${marker.venue.location.address?marker.venue.location.address:"No address listed on Foursquare"} </div>`);
    infowindow.open(marker.map, marker);
    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 1500);
    // make sure the marker property is cleared if the infowindow is closed.

    infowindow.addListener('closeclick',function(){
    infowindow.marker = null;

    // remove active link in sidebar if active on closing infoWindow
    console.log(marker.name + "is the name of the marker");
    let listMarker = document.getElementById(`${marker.name}`);
            if (listMarker.classList.contains("active")) {
           listMarker.classList.remove("active");
            }

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
listItemClick = (venue /*infowindow = new window.google.maps.InfoWindow()*/) => { //get marker by id property

  if (typeof(this.state.infoWindow) == "undefined") {
            this.setState({ infoWindow : new window.google.maps.InfoWindow()});

        }
  let infowindow = this.state.infoWindow;
  let marker = this.state.markers.filter(m => m.id === venue.id)[0];
  //console.log(marker.id + " is the marker id");
 // console.log(infowindow.marker + " is the value of marker in listItemClick");
    //if (this.state.openMarkers === false ) {
 //if (infowindow.marker !== marker) {
   if (infowindow.marker !== marker) {

//    console.log("the marker should not be open");
    infowindow.marker = marker;
    console.log(infowindow.marker + " is the value of marker in listItemClick");
    //infowindow.close();
    infowindow.setContent(`<div tabIndex="0" aria-label="info window"> ${marker.name} <p> ${marker.venue.location.address?marker.venue.location.address:"No address listed on Foursquare"} </div>`);
    this.map.setZoom(13);
    this.map.setCenter(marker.position);
    infowindow.open(this.map, marker);
   // this.setState( { infoWindow: infowindow });
    this.setState( { infoWindow: infowindow });

    console.log("the marker is now open");

    this.setState({openMarkers: true});
    console.log(infowindow.id + "is the infowindow id");
    console.log(this.state.openMarkers + "is the value of openMarkers");
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
    setTimeout(() => { marker.setAnimation(null) }, 1500);


    infowindow.addListener('closeclick',function(){
      infowindow.marker = null;
      this.setState( { infoWindow: infowindow });

      // remove active link in sidebar if active on closing infoWindow
      console.log(marker.name + "is the name of the marker");
      let listMarker = document.getElementById(`${marker.name}`);
            if (listMarker.classList.contains("active")) {
           listMarker.classList.remove("active");
            }

    }.bind(this));
}
}

  render() {
    return (
      <main id="maincontent">

        <section id="map-container" aria-label="Map of Restaurants">
            <div id="map" tabIndex="0" aria-label="location" role="application" className="map_front"></div>
        </section>

        <Sidebar
             listItemClick={this.listItemClick}
             filterMyVenues={this.filterMyVenues}
             myVenues={this.state.myVenues}
        />

      </main>
    );
  }
}

export default App;
