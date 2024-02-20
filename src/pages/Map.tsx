import L, { LatLng, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import stateData from "../utils/data/us-geojson";
import { useEffect, useState } from "react";

const Map = () => {
    const pos = [37.8, -96] as LatLngTuple;

    return (
        <div style={{ position: "relative" }}>
            <MapContainer center={pos} zoom={5} scrollWheelZoom={false} style={{ height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    maxZoom={19}
                />
                {stateData.features.map((feat) => (
                    <GeoJSON data={feat} />
                ))}
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

function LocationMarker() {
    const [position, setPosition] = useState<LatLng | null>(null);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 8);
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here.</Popup>
        </Marker>
    );
}

export default Map;
