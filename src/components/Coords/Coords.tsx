import "./Coords.css"

type ICoordProps = {
  lng: number
  lat: number
  zoom: number
}

export default function Coords({lng, lat, zoom} : ICoordProps) {
  return(
    <div className="sidebar">
      Долгота: {lng} | Широта: {lat} | Zoom: {zoom}
    </div>

  )
}
