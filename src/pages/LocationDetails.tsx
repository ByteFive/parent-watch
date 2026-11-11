
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  RefreshCw,
  Send,
  Share2,
  Navigation,
  X,
  School,
  House,
  MapPinned,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const position: [number, number] = [-23.123456, -45.678901];

const childImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfgf5mB-y52rO5z5-D4P9LkYNUgj9E5BhLnxcbDVUtIyRScOwSOENQ88&s=10";

const childIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 48px;
      height: 48px;
      background: #fff;
      border: 4px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 12px rgba(0,0,0,.25);
      overflow: hidden;
    ">
      <img src="${childImage}"
        style="width:100%;height:100%;object-fit:cover;" />
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

const history = [
  {
    time: "13:10",
    date: "Hoje, 11 de novembro",
    title: "Chegou na escola",
    address: "Escola Municipal",
    location: "Centro, Cidade Tal",
    type: "school",
    latitude: "-23.123456",
    longitude: "-45.678901",
  },
  {
    time: "12:50",
    date: "Hoje, 11 de novembro",
    title: "Passou pelo centro",
    address: "Avenida Principal",
    location: "Centro, Cidade Tal",
    type: "location",
    latitude: "-23.124100",
    longitude: "-45.679200",
  },
  {
    time: "12:35",
    date: "Hoje, 11 de novembro",
    title: "Saiu de casa",
    address: "Rua A, 123",
    location: "Bairro Residencial",
    type: "home",
    latitude: "-23.125000",
    longitude: "-45.680000",
  },
];

export default function LocationDetails() {
  const [historyOpen, setHistoryOpen] = useState(false);

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

      <div className="relative h-80 w-full z-0">
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom
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

      <div className="bg-white p-4 rounded-t-4xl transform -translate-y-6 relative z-10 space-y-4">
        <div className="flex items-center gap-2 font-medium text-xl">
          <img
            src={childImage}
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
            <button
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-1 text-secondary"
            >
              Ver histórico
              <ArrowRight size={18} />
            </button>
          </div>

          <ul className="space-y-3">
            <li className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary" />
                <span className="text-neutral">Chegou na escola</span>
              </div>
              <span>13:10</span>
            </li>
            <li className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral" />
                <span className="text-neutral">Saiu de casa</span>
              </div>
              <span>12:35</span>
            </li>
          </ul>
        </div>

        <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 duration-300 flex items-center justify-center gap-2 rounded-md text-white w-full">
          <RefreshCw />
          Atualizar localização
        </button>
      </div>

      {historyOpen && (
        <div
          className="fixed inset-0 z-[2000] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setHistoryOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h2 className="text-lg font-bold">
                  Histórico de localização
                </h2>
                <p className="text-sm text-neutral">
                  Todas as movimentações registradas
                </p>
              </div>

              <button
                onClick={() => setHistoryOpen(false)}
                className="p-2 rounded-full bg-secondary/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              <div className="flex items-center gap-3 mb-6 bg-secondary/10 rounded-xl p-3">
                <img
                  src={childImage}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Filho 01</p>
                  <p className="text-xs text-neutral">
                    {history.length} registros encontrados
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {history.map((item, index) => {
                  const Icon =
                    item.type === "school"
                      ? School
                      : item.type === "home"
                        ? House
                        : MapPinned;

                  return (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                          <Icon size={20} />
                        </div>

                        {index !== history.length - 1 && (
                          <div className="w-0.5 flex-1 min-h-16 bg-secondary/20 mt-2" />
                        )}
                      </div>

                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm">
                            {item.title}
                          </span>
                          <span className="text-sm font-medium text-secondary">
                            {item.time}
                          </span>
                        </div>

                        <p className="text-xs text-neutral mt-1">
                          {item.date}
                        </p>

                        <div className="mt-3 bg-secondary/10 p-3 rounded-lg space-y-1">
                          <p className="text-sm font-medium">
                            {item.address}
                          </p>
                          <p className="text-xs text-neutral">
                            {item.location}
                          </p>

                          <div className="flex items-center gap-1 text-xs text-neutral pt-2">
                            <MapPin size={13} />
                            {item.latitude}, {item.longitude}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t">
              <button
                onClick={() => setHistoryOpen(false)}
                className="w-full bg-secondary text-white rounded-lg py-3 font-medium hover:bg-secondary/80 transition"
              >
                Fechar histórico
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
