import classNames from 'classnames';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks/state';
import useMap from '../hooks/use-map';
import { offersSelectors } from '../store/slices/offers';
import type { City, FullOffer, Offer } from '../types/offer';

type MapProps = {
  className: string;
  city: City;
  offers: Offer[];
  currentOffer?: FullOffer;
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

function Map({ className, city, offers, currentOffer }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement>(null);
  const cityRef = useRef(city);
  const map = useMap(mapRef, city);
  const activeId = useAppSelector(offersSelectors.activeId);

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
            offer.id === activeId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (currentOffer) {
        const marker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude
        });
        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeId, city, currentOffer]);

  return <section className={classNames(className, 'map')} ref={mapRef} />;
}

export default Map;
