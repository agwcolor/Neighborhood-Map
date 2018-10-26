export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
      window.resolveGoogleMapsPromise = function() {
      // resolve the google object
         resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
         delete window.resolveGoogleMapsPromise;
       }
    // Now, Load the Google Maps API
       const script = document.createElement("script");
       const API_KEY = 'AIzaSyBodL8HXeRSDLsE6-rNdkERs3IE0ORP16E';
       script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&v=3&callback=resolveGoogleMapsPromise`;
       script.async = true;
       console.log("I'm in the load_google_maps function");
       console.log(script.src);
       document.body.appendChild(script);
  });

}

export function load_places() {
  let city = 'Paris';
  let query = 'Music';
  var apiURL = "https://api.foursquare.com/v2/venues/search?client_id=03WPSRTBRU4O5V1ADWJ133RHXCPZ0ASW5LONKNGFIKCV1U2X&client_secret=CWJOYO2W2RJV0W5G2HIUYGLYUEGQJHDIXWBTDDTPF1HR0DYH&v=20180901&limit=50&near=montreal&query=music"
  return fetch(apiURL, /*{mode: 'no-cors'}*/)
      .then(resp => resp.json())
    //  .catch(alert('no cors!'))
}

/*export function load_places() {
  let city = 'Paris';
  let query = 'Music';
  var apiURL = "https://www.eventbriteapi.com/v3/events/search/?token=LKSJSLT4Y2ARJSLEO37B&q=french"
  return fetch(apiURL).then(resp => resp.json())
}*/


/*export function load_places() {
  let city = 'Silver Spring, MD';
  let query = 'Music';
  var apiURL = "https://api.eventful.com/json/events/search?...&location=San+Diego&app_key=k66RNn8N5hHT9mB7"
  return fetch(apiURL, {mode:"no-cors"})
                .then(resp => resp.json())
                .catch(console.log("not working"))
                .then(data => console.log(data))
  }*/
/*API auth format ---> https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD */