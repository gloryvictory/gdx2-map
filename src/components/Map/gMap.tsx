import React, { useRef, useState, useCallback } from 'react';
// import maplibregl, { AddLayerObject, LayerSpecification, MapOptions, NavigationOptions, VectorSourceSpecification } from 'maplibre-gl';
// import Map, { Marker } from "react-map-gl/maplibre";
import Map  from "react-map-gl/maplibre";
import {Source, Layer, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, AttributionControl} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import type {MapRef} from 'react-map-gl/maplibre';
import type {LayerProps, SourceProps} from 'react-map-gl';
import MyButton from '../myButton/myButton';


import 'maplibre-gl/dist/maplibre-gl.css';
import './gMap.css';
import ButtonTable from '../ButtonTable/ButtonTable';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';


export const pointSource: SourceProps = {

  id:"gdx2.file",
  type:"vector",
  // tiles:["http://r48-vws03.zsniigg.local:7800/gdx2.file/{z}/{x}/{y}.pbf"],
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
  const markerRef = useRef<maplibregl.Marker>();
  const marker_table_info = new maplibregl.Marker()
  // const mapRef = React.useRef<MapRef | null>(null)
  
  const onMapLoad = useCallback(() => {
    if (mapRef) {
      const map = mapRef.current
      console.log(map)

      // map?.flyTo({center: [-122.4, 37.8]});
      
      const popup = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: false,
        offset: 15
      });

      const popup_table_info = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: false,
        offset: 45
      });

      map?.on('mouseenter', 'points-file', function (e) {
        map.getCanvas().style.cursor = 'pointer';
      
      const features = e?.features
      // console.log(`features.length : ${features?.length}`)
      if(features && features?.length){
        console.log(features)
        const lat = features[0]?.properties.lat
        const lon = features[0]?.properties.lon
        // console.log(lat)
        // console.log(lon)
        popup.setLngLat(e.lngLat.wrap()).setHTML(`<h1>Файлов: ${features?.length}</h1>`).addTo(map.getMap());

      }
    //   const coordinates = e?.features[0]?.geometry.coordinates.slice();
    //   const description = e?.features[0]?.properties.description;
    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }
      
    //   popup.setLngLat(coordinates).setHTML(description).addTo(map.getMap());
    //   // console.log("fit!!!!!!!!")
      console.log(e)
        // do something
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map?.on('mouseleave', 'points-file', function (e) {
        map.getCanvas().style.cursor = '';       
        popup.remove();
      })      

      map?.on('click', 'points-file', function (e) {
        const features = e?.features
        if(features && features?.length){
          popup_table_info.setLngLat(e.lngLat.wrap()).setHTML(`<h1>"Файлов": ${features?.length}</h1>`).addTo(map.getMap());
          marker_table_info.setLngLat(e.lngLat.wrap()).addTo(map.getMap()); // add the marker to the map;
          
        }
      });
    }

    
  }, []);

  function space(arg0: number): import("csstype").Property.MarginRight<string | number> | undefined {
    throw new Error('Function not implemented.');
  }

// map.on('mouseenter', 'airport-data', function (e) {
//   // Change the cursor style as a UI indicator.
//   map.getCanvas().style.cursor = 'pointer';
//   var coordinates = e.features[0].geometry.coordinates.slice()
//   var description = "";
//   for (const [key, value] of Object.entries(e.features[0].properties)) {
//     description += `${key}: ${value} <br>`;
//   }
//   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//   }
//   popup.setLngLat(coordinates).setHTML(description).addTo(map);
// });



  return (
  
    <div id="map" className="map">
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
        ref={mapRef}
        // mapStyle={DARK_MAP_STYLE}
      >
        <Source {...pointSource}   >
            <Layer {...pointLayer} />
        </Source>  
      
        {/* {showPopup && (
        <Popup longitude={74.08} latitude={61.86}
          anchor="bottom"
          onClose={() => setShowPopup(false)}>
          You are here
        </Popup>)} */}

        <FullscreenControl  position="top-right" style={{ marginRight: 10 }} />
        <GeolocateControl   position="top-right" style={{ marginRight: 10 }}/>
        <NavigationControl  position="top-right" style={{ marginRight: 10 }}/>
        <ScaleControl />
        <AttributionControl customAttribution="vzam" />
      </Map>    
      
      <FloatButton.Group
        open={true}
        trigger="click"
        style={{ right: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <ButtonTable/>
        <MyButton/>
      </FloatButton.Group>
    {/* <div ref='map' className="map" /> */}
  </div>
  );
}
