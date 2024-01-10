import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';


export default function Map() {
    // const mapContainer = useRef(null);
    const map = useRef();
    const [lng] = useState(139.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(14);
    const [API_KEY] = useState('ANOOKEje8DYwFhobUdTP');


useEffect(() => {
  // if (map.current) return; // stops map from intializing more than once
  // map.current = new maplibregl.Map({
  //     container: mapContainer.current!,
  //     style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
  //     center: [lng, lat],
  //     zoom: zoom
  //     });

  const map = new maplibregl.Map({
  container: 'map',
  style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
  center: [lng, lat],
  zoom: zoom
  });


  map.addControl(new maplibregl.NavigationControl(), 'top-right');

  // new maplibregl.Marker({color: "#FF0000"})
  //   .setLngLat([139.7525,35.6846])
  //   .addTo(map);

  // return () => {
  //   map.remove();
  // }

}, [API_KEY, lng, lat, zoom]);

  return (
  <div className="map-wrap">
    <div id="map" className="map"></div>
    {/* <div ref='map' className="map" /> */}
  </div>
  );
}
