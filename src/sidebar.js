import React, { Component } from 'react';

class Sidebar extends Component {

  componentDidMount() {
  }

  render() {
    const { myVenues, populateInfoWindow } = this.props //passed from App.js
    return (
       <section id="sidebar" >
           <div className="filter-box">
            <h2 tabIndex="0">Filter</h2>

            <input tabIndex="0" id="userinput" role="searchbox" aria-label="Search by venue" placeholder="search" value={this.props.query}
            onChange={(e) => this.props.filterMyVenues(e.target.value) }/>
            </div>
            <section id="venues">
              <ol id="venue-list">

                {
                  myVenues && myVenues.length > 0
                  && myVenues.map ((venue, index) => (
                  <li id={venue.name} tabIndex="0" key={index} className="venue-item"
                   onClick={(e) => populateInfoWindow(e, venue)}
                  >{venue.name}</li> ))
                }

               </ol>
             </section>
      </section>
   );
  }
}

export default Sidebar;

