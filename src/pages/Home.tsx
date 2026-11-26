import { useEffect, useState } from "react";
import { ArrowRight, Compass, MapPin, Plus, RefreshCw, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { getChildren, type ChildSummary } from "../services/family";
import { getLocation, type LocationSnapshot } from "../services/locations";
import { getLocationSocket } from "../services/socket";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [children, setChildren] = useState<ChildSummary[]>([]);
  const [locations, setLocations] = useState<Record<string, LocationSnapshot>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadChildren() {
    setError("");
    try {
      const items = await getChildren();
      setChildren(items);
      const snapshots = await Promise.all(items.map(async (child) => {
        try { return [child.id, await getLocation(child.id)] as const; }
        catch { return [child.id, null] as const; }
      }));
      const nextLocations: Record<string, LocationSnapshot> = {};
      snapshots.forEach(([id, snapshot]) => { if (snapshot) nextLocations[id] = snapshot; });
      setLocations(nextLocations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível carregar os dependentes.");
    } finally { setLoading(false); }
  }

  // Carrega os dependentes ao abrir o painel.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadChildren(); }, []);

  useEffect(() => {
    if (!children.length) return;
    const socket = getLocationSocket();
    const watch = () => children.forEach((child) => socket.emit("location:watch", child.id));
    const onCurrent = (payload: { userId: string; position: LocationSnapshot["current"] }) => {
      setLocations((prev) => ({ ...prev, [payload.userId]: {
        userId: payload.userId, online: Boolean(payload.position), current: payload.position,
        lastLocations: prev[payload.userId]?.lastLocations ?? [],
      }}));
    };
    const onChanged = (payload: { userId: string; lat: number; lng: number; accuracy?: number; at: string }) => {
      setLocations((prev) => ({ ...prev, [payload.userId]: {
        userId: payload.userId, online: true, current: payload, lastLocations: prev[payload.userId]?.lastLocations ?? [],
      }}));
    };
    const onOffline = ({ userId }: { userId: string }) => setLocations((prev) => ({
      ...prev, [userId]: { ...(prev[userId] ?? { userId, current: null, lastLocations: [] }), online: false, current: null },
    }));
    socket.on("connect", watch);
    socket.on("location:current", onCurrent);
    socket.on("location:changed", onChanged);
    socket.on("location:offline", onOffline);
    if (!socket.connected) socket.connect(); else watch();
    return () => {
      children.forEach((child) => socket.emit("location:unwatch", child.id));
      socket.off("connect", watch); socket.off("location:current", onCurrent);
      socket.off("location:changed", onChanged); socket.off("location:offline", onOffline);
    };
  }, [children]);

  return <div className="min-h-screen bg-secondary/5 p-4">
    <div className="flex items-center justify-between mb-5">
      <div><p className="text-sm text-neutral">Painel da família</p><h2 className="text-2xl font-bold">Olá, {user?.firstName || "Responsável"}!</h2></div>
      <Link to="/perfil" className="w-11 h-11 rounded-full bg-secondary/20 text-primary flex items-center justify-center font-bold">{user?.firstName?.[0]?.toUpperCase() || <UserRound />}</Link>
    </div>
    <div className="flex items-center justify-between mb-4">
      <h3 className="flex items-center gap-2 font-semibold"><Compass className="text-secondary" /> Localizações dos dependentes</h3>
      <button onClick={() => { setLoading(true); void loadChildren(); }} className="p-2 rounded-lg bg-white text-secondary" aria-label="Atualizar"><RefreshCw size={18}/></button>
    </div>
    <div className="flex justify-end mb-4"><Link to="/vincular-filho" className="flex items-center gap-1 bg-secondary text-white px-3 py-2 rounded-md text-sm"><Plus size={16}/> Adicionar filho(a)</Link></div>
    {error && <p role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {loading ? <p className="text-neutral py-8 text-center">Carregando dependentes...</p> : children.length === 0 ? <div className="bg-white rounded-xl p-6 text-center"><UserRound className="mx-auto text-secondary mb-2"/><p className="font-semibold">Nenhum dependente vinculado</p><p className="text-sm text-neutral mt-1">Use o código de família da conta do filho para vinculá-la.</p></div> :
      <div className="flex flex-col gap-3">{children.map((child) => {
        const snapshot = locations[child.id]; const current = snapshot?.current;
        return <Link to={`/localizacao/${child.id}`} className="bg-white shadow-sm p-4 rounded-xl group" key={child.id}>
          <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-primary font-bold">{child.firstName[0]?.toUpperCase()}</div><div><h4 className="font-semibold">{child.firstName} {child.lastName}</h4><p className="text-xs text-neutral">{snapshot?.online ? "Compartilhando localização" : "Sem localização em tempo real"}</p></div></div><ArrowRight className="group-hover:translate-x-1 transition-transform"/></div>
          <p className="mt-3 p-3 bg-secondary/5 rounded-lg text-sm flex items-center gap-2"><MapPin size={16} className="text-secondary"/>{current ? (current.address || current.city || `${current.lat.toFixed(5)}, ${current.lng.toFixed(5)}`) : "Aguardando localização do aparelho"}</p>
        </Link>;
      })}</div>}
  </div>;
}
