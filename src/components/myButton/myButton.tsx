import {useMap} from 'react-map-gl/maplibre';

export default function MyButton() {
    const {mymap } = useMap();
    console.log(`mymap: ${mymap}`)
    const onClick = () => {
    console.log(`mymap when click: ${mymap}`)    
    mymap?.flyTo({center: [-122.4, 37.8]});
    };
    return <button id="button" onClick={onClick}>Go</button>;
}