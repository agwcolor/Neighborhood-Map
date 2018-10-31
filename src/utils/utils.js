//load google maps so it is available to all components -
// Credit Ryan Waite -
//https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js
export function load_google_maps() {  // Credits Ryan Waite
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

//load places from Foursquare
export function load_places() {
  let place = 'Montreal'; //where to search
  let query = 'chocolate'; //what to search for
  let limit = 3 //number of places to look for
  let client_id = '03WPSRTBRU4O5V1ADWJ133RHXCPZ0ASW5LONKNGFIKCV1U2X'
  let client_secret = 'CWJOYO2W2RJV0W5G2HIUYGLYUEGQJHDIXWBTDDTPF1HR0DYH'
  var apiURL = `https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180901&limit=${limit}&near=${place}&query=${query}`
  return fetch(apiURL)
     .then(response => response.json())
     //.catch(error => console.error(error))
     .catch(error => alert('Sorry, I cannot connect to the Foursquare API! Please check your client id'));

}

