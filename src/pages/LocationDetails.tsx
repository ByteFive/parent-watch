import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, MapPin, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getLocation, type LocationSnapshot } from "../services/locations";
import { getChildren, type ChildSummary } from "../services/family";
import { getLocationSocket } from "../services/socket";

export default function LocationDetails() {
  const { id = "" } = useParams();
  const [snapshot, setSnapshot] = useState<LocationSnapshot | null>(null);
  const [child, setChild] = useState<ChildSummary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!id) return;
    setError("");
    try { setSnapshot(await getLocation(id)); }
    catch (err) { setError(err instanceof Error ? err.message : "Não foi possível consultar a localização."); }
    finally { setLoading(false); }
  }, [id]);

  // Busca o snapshot HTTP inicial e os dados de apresentação do dependente.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
    getChildren().then((items) => setChild(items.find((item) => item.id === id) ?? null)).catch(() => undefined);
  }, [refresh, id]);

  useEffect(() => {
    if (!id) return;
    const socket = getLocationSocket();
    const watch = () => socket.emit("location:watch", id);
    const onCurrent = (payload: { userId: string; position: LocationSnapshot["current"] }) => {
      if (payload.userId === id) setSnapshot((prev) => ({ userId: id, online: Boolean(payload.position), current: payload.position, lastLocations: prev?.lastLocations ?? [] }));
    };
    const onChanged = (payload: { userId: string; lat: number; lng: number; accuracy?: number; at: string }) => {
      if (payload.userId === id) setSnapshot((prev) => ({ userId: id, online: true, current: payload, lastLocations: prev?.lastLocations ?? [] }));
    };
    const onOffline = (payload: { userId: string }) => { if (payload.userId === id) setSnapshot((prev) => prev ? { ...prev, online: false, current: null } : prev); };
    socket.on("connect", watch); socket.on("location:current", onCurrent); socket.on("location:changed", onChanged); socket.on("location:offline", onOffline);
    if (!socket.connected) socket.connect(); else watch();
    return () => { socket.emit("location:unwatch", id); socket.off("connect", watch); socket.off("location:current", onCurrent); socket.off("location:changed", onChanged); socket.off("location:offline", onOffline); };
  }, [id]);

  const point = snapshot?.current;
  const mapsUrl = point ? `https://www.google.com/maps?q=${point.lat},${point.lng}` : undefined;
  return <div className="min-h-screen bg-secondary/5">
    <header className="flex items-center justify-between p-4 bg-white"><div className="flex items-center gap-3"><Link to="/" aria-label="Voltar"><ArrowLeft/></Link><div><h1 className="font-bold text-lg">Localização</h1><p className="text-xs text-neutral">{child ? `${child.firstName} ${child.lastName}` : "Dependente"}</p></div></div><button onClick={() => { setLoading(true); void refresh(); }} className="p-2 rounded-full bg-secondary/10 text-secondary" aria-label="Atualizar localização"><RefreshCw size={19}/></button></header>
    {error && <p role="alert" className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <main className="p-4 space-y-4">
      <section className="bg-white rounded-2xl p-5 shadow-sm"><div className="flex items-center gap-3"><div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center text-primary text-xl font-bold">{child?.firstName?.[0]?.toUpperCase() || "?"}</div><div className="flex-1"><h2 className="font-semibold">{child ? `${child.firstName} ${child.lastName}` : "Dependente"}</h2><p className={`text-sm flex items-center gap-1 ${snapshot?.online ? "text-green-700" : "text-neutral"}`}>{snapshot?.online ? <><Wifi size={14}/> Online</> : <><WifiOff size={14}/> Offline / sem compartilhamento</>}</p></div></div></section>
      <section className="bg-white rounded-2xl p-5 shadow-sm space-y-3"><h3 className="font-semibold flex items-center gap-2"><MapPin className="text-secondary"/> Localização atual</h3>{loading && !snapshot ? <p className="text-sm text-neutral">Consultando localização...</p> : point ? <><p className="font-medium">{point.address || point.city || "Endereço não disponível"}</p><p className="text-sm text-neutral">{point.lat.toFixed(6)}, {point.lng.toFixed(6)}</p><p className="text-xs text-neutral">Atualizado: {new Date(point.at).toLocaleString("pt-BR")}</p>{mapsUrl && <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-secondary font-semibold text-sm">Abrir no Google Maps <ExternalLink size={15}/></a>}</> : <p className="text-sm text-neutral">O aparelho ainda não enviou uma posição em tempo real.</p>}</section>
      <section className="bg-white rounded-2xl p-5 shadow-sm"><h3 className="font-semibold mb-3">Últimos registros</h3>{snapshot?.lastLocations?.length ? <ul className="space-y-3">{snapshot.lastLocations.map((item, index) => <li key={`${item.at}-${index}`} className="border-l-2 border-secondary pl-3"><p className="text-sm font-medium">{item.address || item.city || `${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}`}</p><p className="text-xs text-neutral">{new Date(item.at).toLocaleString("pt-BR")}</p></li>)}</ul> : <p className="text-sm text-neutral">Nenhum registro histórico disponível. O backend salva no máximo três posições, respeitando o intervalo de uma hora e a precisão definida.</p>}</section>
    </main>
  </div>;
}
