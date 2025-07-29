"use client";
// 타입 에러 방지용 import
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const position: LatLngExpression = [37.6034, 126.7694];

const MapCard: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={cardRef}
      className="card bg-gray-200 h-full"
      style={{ padding: 0, overflow: "hidden", ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MapContainer
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
    </div>
  );
};

export default MapCard;
