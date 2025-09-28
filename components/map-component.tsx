'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // مختصات مرکز تهران
      const tehranCenter: [number, number] = [35.6892, 51.389];

      // ایجاد نقشه
      const map = L.map(mapRef.current).setView(tehranCenter, 12);
      mapInstanceRef.current = map;

      // اضافه کردن لایه نقشه
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // اضافه کردن مارکر برای مرکز تهران
      const marker = L.marker(tehranCenter).addTo(map);
      marker.bindPopup('<b>تهران</b><br>مرکز شهر تهران').openPopup();

      // اضافه کردن چند مارکر برای مناطق مختلف تهران
      const locations = [
        {
          coords: [35.7219, 51.3347] as [number, number],
          name: 'میدان آزادی',
          description: 'میدان آزادی تهران',
        },
        {
          coords: [35.6961, 51.4231] as [number, number],
          name: 'میدان تجریش',
          description: 'میدان تجریش',
        },
        {
          coords: [35.6892, 51.389] as [number, number],
          name: 'میدان ولیعصر',
          description: 'میدان ولیعصر',
        },
        {
          coords: [35.7153, 51.4043] as [number, number],
          name: 'پارک ملت',
          description: 'پارک ملت تهران',
        },
      ];

      locations.forEach((location) => {
        const locationMarker = L.marker(location.coords).addTo(map);
        locationMarker.bindPopup(
          `<b>${location.name}</b><br>${location.description}`
        );
      });

      // اضافه کردن دایره برای نشان دادن محدوده
      const circle = L.circle(tehranCenter, {
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.1,
        radius: 5000, // 5 کیلومتر
      }).addTo(map);

      // تنظیم محدوده نمایش
      const group = L.featureGroup([
        marker,
        ...locations.map((loc) => L.marker(loc.coords)),
        circle,
      ]);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    />
  );
}
