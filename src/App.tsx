import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import GlobalMap from './components/Map/gMap';
import MyButton from './components/Map/myButton/myButton';


function App() {
  return (
    <div className="App">
    
      <Navbar/>
      <MyButton/>
      
      <GlobalMap/>

    </div>
  );
}

export default App;
