
import stateData from "../utils/data/us-geojson";
import { useEffect, useMemo, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { GeoJSON as GeoJSONComponent } from "react-leaflet/GeoJSON";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import L, { LatLng, LatLngTuple, LeafletMouseEvent } from "leaflet";
import { generateClient } from "aws-amplify/api";
import { listMapEntries } from "../utils/graphql/queries";
import { MapEntry } from "../API";


interface MapTownMarker extends MapEntry {
    count: number
}

const client = generateClient();
const fetchMapEntries = async () => await client.graphql({ query: listMapEntries, variables: {limit: 1000} });
const combineOverlapping = (entries: MapEntry[]) => {
    const completeEntries = entries.filter(e => e.latitude && e.longitude)
    return completeEntries.reduce((acc: MapTownMarker[], cur: MapEntry, index: number) => {
        const previousTown = acc.findIndex((entry: MapEntry, i: number) => entry.town === cur.town && index !== i);
        if (previousTown >= 0) {
            // update town
            acc[previousTown].count += 1;
        } else {
            // add town
            acc.push({ ...cur, count: 1 });
        }

        return acc;
    }, []);
}

const Map = () => {
    const pos = [37.8, -96] as LatLngTuple;
    const [entries, setEntries] = useState<MapTownMarker[] | []>([])

    useEffect(() => {
        fetchMapEntries().then(({data}) => {
            setEntries(combineOverlapping(data.listMapEntries.items));
        })
    }, [])

    return (
            <MapContainer center={pos} zoom={5} style={{ height: '85vh'}}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    maxZoom={19}
                />

                {/* State Borders */}
                {stateData.features.map((feat) => (
                    <GeoJsonLayer key={feat.id} feat={feat} />
                ))}

                {/* User Entries */}
                {entries.length > 0 &&
                    entries.map((entry) => (
                        <Marker
                            key={entry.id}
                            position={{ lat: entry.latitude as number, lng: entry.longitude as number }}
                        >
                            <Popup>
                                {entry.count > 1 && (
                                    <>
                                        <b>{entry.count}</b> -{" "}
                                    </>
                                )}
                                {entry.town}, {entry.state}
                            </Popup>
                        </Marker>
                    ))}

                {/* User Location Marker */}
                <LocationMarker />
            </MapContainer>
    );
};


function GeoJsonLayer({ feat }: { feat: GeoJSON.Feature<GeoJSON.Geometry> }) {
    const map = useMap();

    const eventHandlers = useMemo(
        () => ({
          click(e: LeafletMouseEvent) {
            map.fitBounds(e.target.getBounds())
          },
        }),
        [map],
      )

    return (
        <GeoJSONComponent
            key={feat.id}
            data={feat}
            style={{
                color: "#edcf39",
                fillOpacity: 0,
            }}
            eventHandlers={eventHandlers}
        />
    );
}

const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

function LocationMarker() {
    const map = useMap();
    const [position, setPosition] = useState<LatLng | null>(null);

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 8);
        });
    }, [map]);


    return position === null ? null : (
        <Marker position={position} icon={greenIcon} zIndexOffset={1000}>
            <Popup>You are here.</Popup>
        </Marker>
    );
}

export default Map;
