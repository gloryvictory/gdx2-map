import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import GlobalMap from './components/Map/gMap';
import MyButton from './components/myButton/myButton';
import {MapProvider} from 'react-map-gl';



function App() {
  return (
    <div className="App">
    
      {/* <Navbar/> */}
    <MapProvider>
      <GlobalMap/>
    </MapProvider>
      
      

    </div>
  );
}

export default App;
