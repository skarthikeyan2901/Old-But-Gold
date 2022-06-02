import React from 'react'
import {GoogleMap,useLoadScript,Marker} from "@react-google-maps/api"
function Map() {
    const {isLoaded} = useLoadScript({googleMapsApiKey:"AIzaSyD7GB4BSHhRH3fgLOsjc1hD-tH49tQpRFM"})
    if(!isLoaded) return <div>Loading..</div>
    return <GMap />
}

function GMap(){
    return <GoogleMap zoom={10} center={{lat:44,lng:-80}}></GoogleMap>
}

export default Map