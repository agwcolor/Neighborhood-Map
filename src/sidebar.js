import React, { Component } from 'react';

class Sidebar extends Component {
	//constructor(props) {
	//	super(props);
	//}

	componentDidMount() {
	}

	render() {
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
                  this.props.myVenues && this.props.myVenues.length > 0
                  && this.props.myVenues.map ((venue, index) => (
                  <li tabIndex="0" key={index} className="venue-item"
                   onClick={(e) => this.props.listItemClick(venue)}
                  >{venue.name}</li> ))
                }

               </ol>
             </section>
      </section>
	 // this.props.filteredVenues && this.props.filteredVenues.length > 0 etc.
   );
  }
}

export default Sidebar;

