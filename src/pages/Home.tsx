import { ArrowRight, Compass, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const devices = [
    {
      id: 1,
      name: "Filho 1",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfgf5mB-y52rO5z5-D4P9LkYNUgj9E5BhLnxcbDVUtIyRScOwSOENQ88&s=10",
      location: "Rua A, 123",
    },
    {
      id: 2,
      name: "Filho 2",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfgf5mB-y52rO5z5-D4P9LkYNUgj9E5BhLnxcbDVUtIyRScOwSOENQ88&s=10",
      location: "Rua A, 123",
    },
    {
      id: 3,
      name: "Filho 3",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfgf5mB-y52rO5z5-D4P9LkYNUgj9E5BhLnxcbDVUtIyRScOwSOENQ88&s=10",
      location: "Rua A, 123",
    },
  ];

  return (
    <div className="p-4 bg-secondary/5">
      <h2 className="text-xl font-bold mb-4">Olá, Alison!</h2>
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-md font-semibold">
          <Compass className="text-secondary" />
          Localizações
        </h3>

        <Link
          to="/vincular-filho"
          className="flex items-center gap-1 bg-secondary text-white px-3 py-2 rounded-md hover:bg-secondary/80 text-sm"
        >
          <Plus size={16} />
          Adicionar filho(a)
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {devices.map((device) => (
          <Link
            to={`/localizacao/${device.id}`}
            className="shadow group p-4 rounded-md space-y-4 bg-white"
            key={device.id}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={device.photo}
                  alt={device.name}
                  className="w-16 h-16 rounded-full"
                />
                <h4>{device.name}</h4>
              </div>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="p-2 bg-secondary/10 rounded-md">{device.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
