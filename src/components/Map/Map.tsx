import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Place = {
  id: number;
  city?: { name: string; location: { lat: number; lng: number } };
};

type Props = {
  places: Place[];
  cityName?: string;
  containerClassName?: string;
  height?: number | string;
};

const Map: React.FC<Props> = ({
  places,
  cityName = 'Amsterdam',
  containerClassName = 'cities__map map',
  height,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const offersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        center: [52.38333, 4.9],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(leafletMap.current);
    }

    const map = leafletMap.current;
    if (!map) {
      return;
    }
    const existing = offersLayerRef.current;
    if (existing) {
      map.removeLayer(existing);
      offersLayerRef.current = null;
    }

    const markers = L.layerGroup();

    places
      .filter((p) => p.city && p.city.name === cityName)
      .forEach((p) => {
        if (!p.city) {
          return;
        }
        const marker = L.marker([p.city.location.lat, p.city.location.lng]);
        marker.addTo(markers);
      });

    markers.addTo(map);
    offersLayerRef.current = markers;

    const latlngs: [number, number][] = [];
    places.forEach((p) => {
      if (p.city && p.city.name === cityName) {
        latlngs.push([p.city.location.lat, p.city.location.lng]);
      }
    });

    if (latlngs.length > 0) {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {};
  }, [places, cityName]);

  const styleHeight =
    typeof height === 'number' ? `${height}px` : height ?? '100%';

  return (
    <div
      ref={mapRef}
      className={containerClassName}
      style={{ height: styleHeight }}
    />
  );
};

export default Map;