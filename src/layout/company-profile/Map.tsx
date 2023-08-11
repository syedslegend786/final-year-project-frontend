import React, { useCallback } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const zoom=15
function Map({ setValues, values }: { setValues: any, values: any }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBL300TPzhxv63yaCPhsSfxjwtFkdT2u_E",
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])
    const handleMapClicked = useCallback((location: google.maps.MapMouseEvent) => {
        if (!location.latLng?.lat || !location.latLng.lng) {
            return;
        }
        setValues((prev: any) => ({ ...prev, lat: location.latLng?.lat(), long: location.latLng?.lng() }))
    }, [setValues])
    return isLoaded ? (
        <GoogleMap
            onClick={handleMapClicked}
            mapContainerStyle={containerStyle}
            center={{
                lat: values.lat,
                lng: values.long,
            }}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {
                <MarkerF position={{
                    lat: values.lat,
                    lng: values.long,

                }} />
            }
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)