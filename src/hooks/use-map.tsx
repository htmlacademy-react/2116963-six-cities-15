import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map as LMap, TileLayer } from 'leaflet';
import type { City } from '../types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): LMap | null {
  const [map, setMap] = useState<LMap | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new LMap(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
