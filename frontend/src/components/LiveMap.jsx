import React, { useEffect, useRef } from 'react';

export default function LiveMap({ incident, role }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    const map = window.L.map(mapContainerRef.current).setView([17.4325, 78.4071], 14);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors | ResQNet AI'
    }).addTo(map);

    // Citizen Location Marker
    const citizenIcon = window.L.divIcon({
      html: `<div style="background:#E53935; width:22px; height:22px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 15px #E53935;"></div>`,
      iconSize: [22, 22]
    });
    window.L.marker([17.4325, 78.4071], { icon: citizenIcon })
      .addTo(map)
      .bindPopup("<b>Emergency Scene (Citizen)</b><br>Jubilee Hills Rd 36");

    // Responder Location Marker
    const responderIcon = window.L.divIcon({
      html: `<div style="background:#1565C0; width:26px; height:26px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 15px #1565C0; line-height:20px; text-align:center;">🚑</div>`,
      iconSize: [26, 26]
    });
    window.L.marker([17.4435, 78.3920], { icon: responderIcon })
      .addTo(map)
      .bindPopup("<b>Ambulance Unit AMB-104</b><br>ETA: 03m 40s");

    // Route Navigation Polyline
    window.L.polyline([[17.4435, 78.3920], [17.4325, 78.4071]], {
      color: '#1565C0',
      weight: 5,
      dashArray: '6, 6'
    }).addTo(map);

    // Nearby Hospitals, Police Stations, and Fire Stations POIs
    const pois = [
      { name: 'Care Hospitals Banjara Hills (Trauma ICU)', lat: 17.4168, lng: 78.4483, icon: '🏥' },
      { name: 'Banjara Hills Police Station', lat: 17.4120, lng: 78.4280, icon: '🚔' },
      { name: 'Panjagutta Fire Station', lat: 17.4200, lng: 78.4350, icon: '🚒' }
    ];

    pois.forEach(poi => {
      const poiIcon = window.L.divIcon({
        html: `<div style="background:#fff; border:2px solid #334155; border-radius:8px; width:24px; height:24px; text-align:center; line-height:20px; font-size:12px;">${poi.icon}</div>`,
        iconSize: [24, 24]
      });
      window.L.marker([poi.lat, poi.lng], { icon: poiIcon })
        .addTo(map)
        .bindPopup(`<b>${poi.name}</b>`);
    });

    return () => map.remove();
  }, [incident]);

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs font-bold text-slate-800 z-[400]">
        ETA: <span className="text-blue-700">{incident?.eta || '03m 40s'}</span>
      </div>
    </div>
  );
}
