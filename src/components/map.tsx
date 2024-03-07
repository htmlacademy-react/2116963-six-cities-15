import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import type { Offer, City } from '../types/offer';
import useMap from '../hooks/use-map';
import classNames from 'classnames';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  city: City;
  offers: Offer[];
  activeCardId?: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map({className, city, offers, activeCardId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement>(null);
  const cityRef = useRef(city);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      if (cityRef.current.name !== city.name) {
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
        cityRef.current = city;
      }

      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            activeCardId && offer.id === activeCardId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeCardId, city]);

  return <section className={classNames(className, 'map')} ref={mapRef} />;
}

export default Map;
