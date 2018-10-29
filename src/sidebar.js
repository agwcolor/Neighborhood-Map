import React, { Component } from 'react';

class Sidebar extends Component {
	//constructor(props) {
	//	super(props);
	//}

	componentDidMount() {
	}

	render() {
		return (

    <div id="sidebar">
         <input placeholder="search" value={this.props.query}
            onChange={(e) => this.props.filterMyVenues(e.target.value) }/>
          {
            this.props.myVenues && this.props.myVenues.length > 0
            && this.props.myVenues.map ((venue, index) => (
              <div key={index} className="venue-item"
                   onClick={(e) => this.props.listItemClick(venue)}
              >
              {venue.name}
             </div>
            ))
          }
     </div>
	 // this.props.filteredVenues && this.props.filteredVenues.length > 0 etc.
   );
  }
}

export default Sidebar;
