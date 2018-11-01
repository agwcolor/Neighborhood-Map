neighborhood-map
=====================

# Neighborhood Map App

## Table of Contents
* [Development Version Installation](#installation)
* [Build-Deploy](#build_deploy)
* [Production Installation](#production_installation)
* [Instructions](#instructions)
* [Background](#background)
* [Dependencies](#dependencies)
* [Contributing](#contributing)
* [License](#license)

## Development Version Installation

To install the app on your desktop:
1. Navigate to https://github.com/agwcolor/Neighborhood-Map 
2. Click the green 'Clone or Download' button to copy the directory or zipfile to your desktop machine.
3. If you have a zipfile, extract it.
4. From inside the neighborhood-map folder, install any node-module dependencies using 
    ````npm install --save ````
    You will need the following : react, react-dom . IF you have problems, please check the the package.json file for reference.  
5. From inside the neighborhood-map folder, run ````npm start````.  
   A browser window will open up to http://localhost:3000/ .  
 
## Build-Deploy
1. For the project to build, **these files must exist with exact filenames**:
```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

2. From inside neighborhood-map, type: npm run build 
```
> neighborhood-map@0.1.0 build /Users/.../my-projects/react/neighborhood-map
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip: ...

The project was built assuming it is hosted at the server root.
You can control this with the homepage field in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",

The build folder is ready to be deployed.
```

## Production Installation

1. You may serve the app with a static server:

2. Find out more about deployment here: 
  http://bit.ly/CRA-deploy

## Instructions

Using the Neighborhood Map app

1. (search) - In search bar, enter query. The list of 10 items will filter on your search. The Markers on the map will be updated. (You can change the number of items to search for, place, query in the utils.js folder)

2. Click on the filter list in the side bar to make the corresponding map marker bounce.
3. Click on a map marker to open an info window with info retrieved from the Foursquare API. 

## Background
This project demonstrates an example of a React Controlled component where the UI dynamically updates as the user interacts with it (e.g. the dynamic side bar and map). The state of the React data is always up to date, the "single source of truth", and creates a dynamic user experience. (https://reactjs.org/docs/uncontrolled-components.html)

This project also implements using the Google Maps API and the Foursquare API to retrieve venue data and map data. (https://developers.google.com/maps/documentation/ | https://developer.foursquare.com/places-api). 


## Dependencies
Using NPM install, install the following project dependencies in the /neighborhood-map folder from the command line if you don't have them already.  Check the package.json file if you have any issues. :

"react": "^16.5.2",
"react-dom": "^16.5.2",


You will need internet access. The google maps API and the Foursquare API require live fetching of data.  There is a service worker running for caching.

## Contributing
Map data retrieved by Google Maps API.
Places data retrieved by Foursquare API.

Ideas regarding how to approach this project were were found in Udacity course resources, especially using the walkthrough by Ryan Waite (https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be), the Udacity Knowledge Boards, as well as Udacity course materials on React, React JS (https://reactjs.org/), Google Maps API docs, CSS Tricks, and Stack Overflow. 

## License

MIT License

Copyright (c) [2018] [Abbie Weisenbloom]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---------------------------------------