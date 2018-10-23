import React, { Component } from 'react';
import './App.css';
import { load_google_maps } from './utils/utils.js';

class App extends Component {
  state = {}

    componentDidMount() {
      let googleMapsPromise = load_google_maps();
      //let placesPromise = load_places();

  }

  render() {
    return (
      <div className="App">
        <div id="map">
        </div>
        <div id="sidebar">
        </div>
      </div>
    );
  }
}

export default App;
