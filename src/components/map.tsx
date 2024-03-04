import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import type { City, Offer } from '../types/offer';
import useMap from '../hooks/use-map';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import classNames from 'classnames';

type MapProps = {
  city: City;
  offers: Offer[];
  activeCardId: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: '../../public/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '../../public/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({ city, offers, activeCardId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const currentPath = useLocation().pathname;
  const isPathRoot = currentPath === AppRoute.Root;
  const isPathOffer = currentPath.startsWith('/offer');

  useEffect(() => {
    if (map) {
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
  }, [map, offers, activeCardId]);

  return <section className={classNames({'cities__map': isPathRoot, 'offer__map': isPathOffer}, 'map')} ref={mapRef} />;
}

export default Map;
