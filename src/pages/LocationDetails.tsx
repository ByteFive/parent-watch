
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  RefreshCw,
  Send,
  Share2,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Coordenadas de exemplo
const position: [number, number] = [-23.123456, -45.678901];

// Corrige os ícones padrão do Leaflet
const childIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 48px;
      height: 48px;
      background: #ffffff;
      border: 4px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 2px 12px rgba(0,0,0,0.25);
      overflow: hidden;
    ">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfgf5mB-y52rO5z5-D4P9LkYNUgj9E5BhLnxcbDVUtIyRScOwSOENQ88&s=10"
        style="width:100%;height:100%;object-fit:cover;"
      />
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

export default function LocationDetails() {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-bold">
            Localização do filho 01
          </h2>
        </div>

        <button className="p-3 rounded-full bg-secondary/20">
          <Share2 className="text-secondary" />
        </button>
      </div>

      {/* MAPA */}
      <div className="relative h-80 w-full z-0">
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position} icon={childIcon}>
            <Popup>Filho 01 está aqui</Popup>
          </Marker>
        </MapContainer>

        <button
          className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-full shadow-md"
          title="Centralizar localização"
        >
          <Navigation className="text-secondary" />
        </button>
      </div>

      {/* INFORMAÇÕES */}
      <div className="bg-white p-4 rounded-t-4xl transform -translate-y-6 relative z-10 space-y-4">
        <div className="flex items-center gap-2 font-medium text-xl">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfgf5mB-y52rO5z5-D4P9LkYNUgj9E5BhLnxcbDVUtIyRScOwSOENQ88&s=10"
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <h2>Filho 01</h2>
        </div>

        <div className="flex items-center gap-2 bg-secondary/10 p-4 rounded-md">
          <div className="bg-secondary/20 p-2 rounded-md">
            <Send className="text-secondary" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral text-sm">Distância</span>
            <span className="font-medium">1.8 km de você</span>
          </div>
        </div>

        <div className="bg-secondary/10 p-4 rounded-md flex items-center gap-4">
          <div className="bg-secondary/20 p-2 rounded-md">
            <MapPin className="text-secondary" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral text-sm">Localização atual</span>
            <span className="font-medium">Rua A, 123</span>
            <span className="text-neutral">Cidade Tal, Estado Tal</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Coordenadas geográficas</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/10 p-4 rounded-md flex flex-col gap-2">
              <span className="text-neutral text-sm">Latitude</span>
              <span className="font-medium">-23.123456</span>
            </div>

            <div className="bg-secondary/10 p-4 rounded-md flex flex-col gap-2">
              <span className="text-neutral text-sm">Longitude</span>
              <span className="font-medium">-45.678901</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 p-4 rounded-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Últimos registros</span>
            <button className="flex items-center gap-1 text-secondary">
              Ver histórico
              <ArrowRight />
            </button>
          </div>

          <ul className="space-y-3">
            <li className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary"></div>
                <span className="text-neutral">Chegou na escola</span>
              </div>
              <span>13:10</span>
            </li>

            <li className="flex items-center justify-between text-sm">
              <div className="w-4 h-4 rounded-full bg-neutral"></div>
              <span className="text-neutral">Saiu de casa</span>
              <span>12:35</span>
            </li>
          </ul>
        </div>

        <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 duration-300 flex items-center justify-center gap-2 rounded-md text-white w-full">
          <RefreshCw />
          Atualizar localização
        </button>
      </div>
    </>
  );
}
