import React, { useRef, useEffect, useState } from 'react';
import maplibregl, { AddLayerObject, LayerSpecification, MapOptions, NavigationOptions, VectorSourceSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';


export default function Map() {
    // const mapContainer = useRef(null);
    const map = useRef();
    const [lng] = useState(139.753);
    const [lat] = useState(35.6844);
    const [zoom] = useState(14);
    const [API_KEY] = useState('my_API_KEY');


useEffect(() => {

// let mapConfig = {    
//     'container': 'map',
//     'hash': true,
//     'style': {
//       'version': 8,
//       'sources': {
//         'carto-light': {
//           'type': 'raster',
//           'tiles': [
//             "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
//             "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
//             "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
//             "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
//           ]
//         }
//       },
//       'layers': [{      
//         'id': 'carto-light-layer',
//         'source': 'carto-light',          
//         'type': 'raster',
//         'minzoom': 0,
//         'maxzoom': 22
//       }]
//     },
//     'center': [-73.9021,40.786],
//     'zoom': 9,
//     'pitch': 20        
// };


  // if (map.current) return; // stops map from intializing more than once
  // map.current = new maplibregl.Map({
  //     container: mapContainer.current!,
  //     style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
  //     center: [lng, lat],
  //     zoom: zoom
  //     });

  // const map = new maplibregl.Map({
  // container: 'map',
  // style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
  // center: [lng, lat],
  // zoom: zoom
  // });
const  mapconfig: MapOptions = {    
  'container': 'map',
  'hash': true,
  'style': {
    'version': 8,
    'sources': {
      'carto-light': {
        'type': 'raster',
        'tiles': [
          "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
          "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
          "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
          "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
        ]
      }
    },
    'layers': [{      
      'id': 'carto-light-layer',
      'source': 'carto-light',          
      'type': 'raster',
      'minzoom': 0,
      'maxzoom': 22
    }]
  },
  'center': [61.86,74.08],
  'zoom': 9,
  'pitch': 20        
}

// const map = new maplibregl.Map({ ...someConfig });


  const map = new maplibregl.Map(mapconfig);

  const navOpt:NavigationOptions  = { showCompass: true, showZoom: true, visualizePitch:true}

  map.addControl(new maplibregl.NavigationControl(navOpt), 'top-right');

  const source: VectorSourceSpecification =  {
    type: 'vector',
    // url: 'https://tiles.planninglabs.nyc/data/v3/{z}/{x}/{y}.pbf',
    tiles:["http://localhost:7800/gdx2.file/{z}/{x}/{y}.pbf"],
    minzoom: 0,
    maxzoom: 22
  };
  
  map.addSource('bonn', source)

  const myLayer:AddLayerObject = {
    id: 'bonn_id',
    source: "bonn",
    type: 'fill',
     paint: {
      'fill-outline-color': 'black',
      'fill-color': 'blue',
      'fill-opacity': 0.5
    }

  }
  map.on('styledata', function() {
    map.addLayer(myLayer);
});
  
  // map.addLayer({
  //   'id': 'bonn',
  //   'type': 'fill',
  //   'source': 'bonn',
  //   'paint': {
  //     'fill-outline-color': 'black',
  //     'fill-color': 'blue',
  //     'fill-opacity': 0.5
  //   }
  //   });

//   map.on('load', function () {
//     map.addSource('bonn', {
//       'type': 'vector',
//       "tiles": ["https://tiles.planninglabs.nyc/data/v3/{z}/{x}/{y}.pbf?"],
//       "tolerance": 0
//     });
//   }

//   map.addLayer({
//     id: "road",
//     source: "bonn",
//     "source-layer": "road",
//     type: "point",
//     paint: {
//       "point-color": "#FF0000",
//     },
//   });
// });

 

  // map.addLayer({id: 'points-of-interest',  source,
  //   'source-layer': 'poi_label',
  //   type: 'circle',
  // });

  // map.addLayer({
  //   id: "built_layer",
  //   type: "fill",
  //   source: "bonn",
  //   "source-layer": "default",
  //   paint: {
  //     "fill-color": "#051AF0",
  //     "fill-opacity": 0.7,
  //     "fill-outline-color": "#000000",
  //   },
  // });
  
  // map.addLayer({
  //   id: 'points-of-interest',
  //   source,
  //   'source-layer': 'poi_label',
  //   type: 'circle',
  // });
  
  // map.addLayer(layer: (Omit<LayerSpecification, "source"> & {source?: string | SourceSpecification}))

  // function layerSource(tileurl: string) {
  //   return {
  //     "type": "vector",
  //     "tiles": [tileurl],
  //     "minzoom": 0,
  //     "maxzoom": 22
  //   }
  // };
  // map.addSource('gdx2.files', layerSource('https://tiles.planninglabs.nyc/data/v3/{z}/{x}/{y}.pbf'));


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
