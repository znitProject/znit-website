"use client";
// 타입 에러 방지용 import
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import React, { useEffect, useRef, useState } from "react";

const position: LatLngExpression = [37.6034, 126.7694];

const MapCard: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // DOM이 완전히 준비된 후에 지도 마운트
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    // 클라이언트 환경에서만 leaflet 마커 아이콘 경로 수정
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    }

    return () => clearTimeout(timer);
  }, []);


  return (
    <div
      ref={cardRef}
      className="card bg-gray-200 h-full"
      style={{ padding: 0, overflow: "hidden", zIndex: 10, ...style }}
    >
      {!isClient || !isMounted ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-500">지도 로딩 중...</div>
        </div>
      ) : (
        <MapContainer
          key="map-container"
          center={position}
          zoom={17}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
          <ZoomControl position="bottomright" />
        </MapContainer>
      )}
    </div>
  );
};

export default MapCard;
