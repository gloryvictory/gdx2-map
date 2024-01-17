import React, { useRef, useEffect, useState, useCallback } from 'react';
// import maplibregl, { AddLayerObject, LayerSpecification, MapOptions, NavigationOptions, VectorSourceSpecification } from 'maplibre-gl';
// import Map, { Marker } from "react-map-gl/maplibre";
import Map  from "react-map-gl/maplibre";
import {Source, Layer, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, AttributionControl, Popup, MapProvider, useMap} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import type {MapRef} from 'react-map-gl/maplibre';


import 'maplibre-gl/dist/maplibre-gl.css';

import './gMap.css';

import type {LayerProps, SourceProps} from 'react-map-gl';

export const pointSource: SourceProps = {

  id:"gdx2.file",
  type:"vector",
  tiles:["http://localhost:7800/gdx2.file/{z}/{x}/{y}.pbf"],
  minzoom: 0,
  maxzoom: 22,

          // data="http://localhost:7800/gdx2.file/{z}/{x}/{y}.pbf"
          // cluster={true}
          // clusterMaxZoom={14}
          // clusterRadius={50}

}


export const pointLayer: LayerProps = {
  id: 'points-file',
  type: 'circle',
  source: 'gdx2.file',
  // filter: ['has', 'point_count'],
  "source-layer": "gdx2.file",
  paint: {
    'circle-color': 'blue',
    'circle-radius': 5
  }
};

var popup = new maplibregl.Popup({
  closeButton: false,
  closeOnClick: false
});

const LIGHT_MAP_STYLE = 'https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DARK_MAP_STYLE = 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const initialValueLocation = {
  latitude: 61.86,
  longitude: 74.08,
  zoom: 2,
  bearing: 0,
  pitch: 0
};


export default function GlobalMap() {
//   useEffect(() => {
// }, []);

  const mapRef = useRef<MapRef| null>(null); 
  const [showPopup, setShowPopup] = useState<boolean>(true);

  // const mapRef = React.useRef<MapRef | null>(null)
  
  const onMapLoad = useCallback(() => {
    if (mapRef) {
      const map = mapRef.current
      console.log(map)
      map?.on('mouseenter', 'gdx2.file', function (e) {
      map.getCanvas().style.cursor = 'pointer';

        // do something
      });
    }

    
  }, []);

// map.on('mouseenter', 'airport-data', function (e) {
//   // Change the cursor style as a UI indicator.
//   map.getCanvas().style.cursor = 'pointer';

//   var coordinates = e.features[0].geometry.coordinates.slice()

//   var description = "";
//   for (const [key, value] of Object.entries(e.features[0].properties)) {
//     description += `${key}: ${value} <br>`;
//   }


//   // Ensure that if the map is zoomed out such that multiple
//   // copies of the feature are visible, the popup appears
//   // over the copy being pointed to.
//   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//   }

//   // Populate the popup and set its coordinates
//   // based on the feature found.
//   popup.setLngLat(coordinates).setHTML(description).addTo(map);
// });

// map.on('mouseleave', 'airport-data', function () {
//   map.getCanvas().style.cursor = '';
//   popup.remove();
// });

  return (
  <div className="map-wrap">
    <div id="map" className="map"></div>
    <MapProvider>
      <Map
        id="mymap"
        initialViewState={initialValueLocation}
        style={{ width: "100vw", height: "100vh" }}
        mapLib={maplibregl}
        mapStyle={LIGHT_MAP_STYLE}
        attributionControl={false}
        // ref={mapRef} 
        onLoad={onMapLoad}
        onMouseEnter={onMapLoad}
        // mapStyle={DARK_MAP_STYLE}
      >
        <Source {...pointSource}   >
            <Layer {...pointLayer} />
        </Source>  
      
        {showPopup && (
        <Popup longitude={74.08} latitude={61.86}
          anchor="bottom"
          onClose={() => setShowPopup(false)}>
          You are here
        </Popup>)}

        <FullscreenControl />
        <GeolocateControl />
        <NavigationControl />
        <ScaleControl />
        <AttributionControl customAttribution="Map design by me" />

      </Map>     
    </MapProvider>
    {/* <div ref='map' className="map" /> */}
  </div>
  );
}
