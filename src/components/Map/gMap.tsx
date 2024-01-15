import React, { useRef, useEffect, useState } from 'react';
// import maplibregl, { AddLayerObject, LayerSpecification, MapOptions, NavigationOptions, VectorSourceSpecification } from 'maplibre-gl';
// import Map, { Marker } from "react-map-gl/maplibre";
import Map from "react-map-gl/maplibre";
import {Source, Layer} from 'react-map-gl';
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

import './gMap.css';

import type {LayerProps} from 'react-map-gl';

export const pointLayer: LayerProps = {
  id: 'points',
  type: 'circle',
  source: 'points',
  // filter: ['has', 'point_count'],
  paint: {
    'circle-color': '#f28cb1',
    'circle-radius':20
  }
};



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

  return (
  <div className="map-wrap">
    <div id="map" className="map"></div>
    <Map
      id="left-map"
      initialViewState={initialValueLocation}
      style={{ width: "100vw", height: "100vh" }}
      mapLib={maplibregl}
      mapStyle={LIGHT_MAP_STYLE}
      // mapStyle={DARK_MAP_STYLE}
    >
      <Source
          id="points"
          type="vector"
          tiles={["http://localhost:7800/gdx2.file/{z}/{x}/{y}.pbf"]}
          minzoom={0}
          maxzoom={22}
          // data="http://localhost:7800/gdx2.file/{z}/{x}/{y}.pbf"
          // cluster={true}
          // clusterMaxZoom={14}
          // clusterRadius={50}
        >
          <Layer {...pointLayer} />
      </Source>  
    </Map>     
    {/* <div ref='map' className="map" /> */}
  </div>
  );
}
