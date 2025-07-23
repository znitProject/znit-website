"use client";
// 타입 에러 방지용 import
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import React, { useEffect } from "react";

const position: LatLngExpression = [37.6034, 126.7694];

const MapCard = () => {
  useEffect(() => {
    // 클라이언트 환경에서만 leaflet 마커 아이콘 경로 수정
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    }
  }, []);

  return (
    <div className="card bg-gray-200 h-full transition-transform duration-300 hover:scale-105" style={{ gridArea: 'map', padding: 0, overflow: 'hidden' }}>
      <MapContainer center={position} zoom={17} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false} zoomControl={false}>
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default MapCard;
