import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import GlobalMap from './components/Map/gMap';


function App() {
  return (
    <div className="App">
    
      <Navbar/>

      <GlobalMap/>

    </div>
  );
}

export default App;
