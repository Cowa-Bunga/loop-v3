// @see: https://react-google-maps-api-docs.netlify.app/#section-introduction
import { memo, useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader
  // StreetViewPanorama,
  // DrawingManager
} from '@react-google-maps/api';

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // 'AIzaSyCgiluwpE3dNxGLL_iAPaV4SKZDTm_tpME'
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'NOT_A_KEY'
  });

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight - 60);
  }, []);

  const [, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    if (typeof window !== 'undefined') {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    }
  }, []);

  // const onLoadDrawing = (drawingManager) => {
  //   console.log(drawingManager);
  // };

  // const onPolygonComplete = (polygon) => {
  //   console.log(polygon);
  // };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* <DrawingManager
        onLoad={onLoadDrawing}
        onPolygonComplete={onPolygonComplete}
      />
      <StreetViewPanorama /> */}
    </GoogleMap>
  ) : null;
}

export default memo(Map);
