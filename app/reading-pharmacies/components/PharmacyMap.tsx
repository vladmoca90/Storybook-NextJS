"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Pharmacy } from "../types";
import styles from "../pharmacies.module.css";

type PharmacyMapProps = {
  pharmacies: Pharmacy[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  resetKey: number;
};

export default function PharmacyMap({ pharmacies, selectedId, onSelect, resetKey }: PharmacyMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef(new Map<string, L.Marker>());
  const select = useRef(onSelect);
  const [tileError, setTileError] = useState(false);

  useEffect(() => { select.current = onSelect; }, [onSelect]);

  useEffect(() => {
    if (!container.current) return;
    const instance = L.map(container.current, { zoomControl: false }).setView([51.4543, -0.9781], 13);
    map.current = instance;
    L.control.zoom({ position: "bottomright" }).addTo(instance);
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(instance);
    tiles.on("tileerror", () => setTileError(true));
    tiles.on("tileload", () => setTileError(false));
    const observer = new ResizeObserver(() => instance.invalidateSize());
    observer.observe(container.current);
    return () => { observer.disconnect(); instance.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (!map.current) return;
    const instance = map.current;
    markers.current.forEach(marker => marker.remove());
    markers.current.clear();
    const icon = L.divIcon({
      className: `${styles.marker} grid! place-items-center rounded-full border-[0.1875rem]`,
      html: '<span aria-hidden="true">+</span>',
      iconSize: [32, 32], iconAnchor: [16, 16],
    });
    pharmacies.forEach(pharmacy => {
      const marker = L.marker([pharmacy.latitude, pharmacy.longitude], {
        icon, title: pharmacy.name, alt: pharmacy.name, keyboard: true,
      }).addTo(instance).on("click", () => select.current(pharmacy.id));
      markers.current.set(pharmacy.id, marker);
    });
    if (pharmacies.length) {
      instance.fitBounds(L.latLngBounds(pharmacies.map(p => [p.latitude, p.longitude])), { padding: [45, 45], maxZoom: 15 });
    }
  }, [pharmacies, resetKey]);

  useEffect(() => {
    markers.current.forEach((marker, id) => {
      marker.getElement()?.classList.toggle(styles.selectedMarker, id === selectedId);
      marker.setZIndexOffset(id === selectedId ? 1000 : 0);
    });
    const marker = selectedId ? markers.current.get(selectedId) : null;
    if (marker && map.current) {
      map.current.flyTo(marker.getLatLng(), Math.max(map.current.getZoom(), 15), { duration: 0.5 });
    }
  }, [selectedId, pharmacies]);

  return <>
    <div ref={container} className={`${styles.map} absolute inset-0`} aria-label="Interactive map of pharmacies in Reading" />
    {tileError && <p role="status" className={`${styles.mapNotice} absolute top-20 right-4 left-4 z-[1000] rounded-lg border p-3`}>Some map tiles could not load. You can still select pharmacies from the list.</p>}
  </>;
}

