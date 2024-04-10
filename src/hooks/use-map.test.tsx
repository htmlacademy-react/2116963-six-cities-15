import { renderHook } from '@testing-library/react';
import { City } from '../types/offer';
import useMap from './use-map';

describe('useMap', () => {
  const city: City = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  it('should return null if mapRef is null', () => {
    const { result } = renderHook(() => useMap({ current: null }, city));

    expect(result.current).toBeNull();
  });

  it('should return map with correct location', () => {
    const mapContainer = document.createElement('div');

    const { result } = renderHook(() => useMap({ current: mapContainer }, city));

    expect(result.current).not.toBeNull();

    const center = result.current?.getCenter();
    const zoom = result.current?.getZoom();

    expect(center?.lat).toBe(city.location.latitude);
    expect(center?.lng).toBe(city.location.longitude);
    expect(zoom).toBe(city.location.zoom);
  });
});
