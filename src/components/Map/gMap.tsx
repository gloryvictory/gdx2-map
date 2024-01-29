import React, { useRef, useState, useCallback } from 'react';
import { nanoid } from 'nanoid'
// import maplibregl, { AddLayerObject, LayerSpecification, MapOptions, NavigationOptions, VectorSourceSpecification } from 'maplibre-gl';
// import Map, { Marker } from "react-map-gl/maplibre";
import Map  from "react-map-gl/maplibre";
import {Source, Layer, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, AttributionControl} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import type {MapRef} from 'react-map-gl/maplibre';
import type {LayerProps, SourceProps} from 'react-map-gl';
import MyButton from '../myButton/myButton';
import {partial} from "filesize";


import 'maplibre-gl/dist/maplibre-gl.css';
import './gMap.css';

import { Drawer, FloatButton, Table } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import ButtonTable from '../ButtonTable/ButtonTable';
import Coords from '../Coords/Coords'

import IFile from './types';







let dataSource:IFile[] = []


const columns = [
  {
    title: 'Имя файла',
    dataIndex: 'f_name',
    key: 'f_name',
  },
  {
    title: 'Размер',
    dataIndex: 'f_size',
    key: 'f_size',
  },
  {
    title: 'Расширение',
    dataIndex: 'f_ext',
    key: 'f_ext',
  },
  {
    title: 'Площадь',
    dataIndex: 'areaoil',
    key: 'areaoil',
  },
  {
    title: 'Скважина',
    dataIndex: 'well',
    key: 'well',
  },
  {
    title: 'Месторождение',
    dataIndex: 'field',
    key: 'field',
  },
  {
    title: 'Полный путь',
    dataIndex: 'f_path',
    key: 'f_path',  
  },
];




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
    'circle-radius': 4
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
  const [showTable, setShowTable] = useState<boolean>(false);
  const markerRef = useRef<maplibregl.Marker>();
  const marker_table_info = new maplibregl.Marker()
  // const mapRef = React.useRef<MapRef | null>(null)
  const size = partial({standard: "jedec"});

  const [lng, setLng] = useState<number>(61.86);
  const [lat, setLat] = useState<number>(74.08);
  const [zoom, setZoom] = useState<number>(2.0);

  const onTableClose = () => {
    setShowTable(false);
  };


  const onMapLoad = useCallback(() => {
    if (mapRef) {
      const map = mapRef.current
      console.log(map)

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
        // console.log(features)
        // const lat = features[0]?.properties.lat
        // const lon = features[0]?.properties.lon
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
      

      map?.on('mousemove', function (e) {
        const ll = e.lngLat.wrap()        
        setLng(  (prev) => parseFloat(ll.lng.toFixed(4)));
        setLat(  (prev) => parseFloat(ll.lat.toFixed(4)));
        setZoom( (prev) => parseFloat(map.getZoom().toFixed(2)));
 
      });
        
      
        
      map?.on('click', 'points-file', function (e) {
        const features = e?.features
        if(features && features?.length){
          popup_table_info.setLngLat(e.lngLat.wrap()).setHTML(`<h1>"Файлов": ${features?.length}</h1>`).addTo(map.getMap());
          marker_table_info.setLngLat(e.lngLat.wrap()).addTo(map.getMap()); // add the marker to the map;
          dataSource = []
          features.map(
            (feature)=>{
              const newfile:IFile =  {
                key: nanoid(5),
                f_name: feature.properties.f_name,
                f_size: size( feature.properties.f_size ),
                f_ext: feature.properties.f_ext,
                areaoil: feature.properties.areaoil,
                well: feature.properties.well,
                field:  feature.properties.field,
                f_path:  feature.properties.f_path,
              }
              dataSource.push(newfile) 

            }
          );
          setShowTable(true)

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

const containerStyle: React.CSSProperties = {
  // height: 200,
  padding: 0,
};

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
        <Coords lng={lng} lat={lat} zoom={zoom}  /> 
        {/* <div className="sidebar">
          Долгота: {lng} | Широта: {lat} | Zoom: {zoom}
        </div> */}

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

          <Drawer
            title="Информация"
            
            // styles={{padding: 0}}
            // style={{padding: 0}}
            // rootStyle={{padding: 0}}
            placement={'bottom'}
            closable={true}
            onClose={onTableClose}
            open={showTable}
            size={'default'}
            key={'bottom'}
          >
            <Table dataSource={dataSource} columns={columns} bordered pagination={{ pageSize: 50 }} scroll={{ y: 240 }} style={{ marginTop: 0 , top:0}}/>;

          </Drawer>

    {/* <div ref='map' className="map" /> */}
  </div>
  );
}
