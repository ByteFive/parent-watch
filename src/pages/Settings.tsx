import { useEffect, useState } from "react";
import { Copy, KeyRound, LogOut, MapPin, ShieldCheck, UserRound, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getLocationSocket } from "../services/socket";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [geoError, setGeoError] = useState("");
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  // A tela da criança conecta o socket autenticado e inicia o watch de geolocalização.
  useEffect(() => {
    if (user?.role !== "child") return;
    if (!("geolocation" in navigator)) return;
    const socket = getLocationSocket();
    let watchId: number | undefined;
    const startWatch = () => {
      watchId = navigator.geolocation.watchPosition((position) => {
        socket.emit("location:update", { lat: position.coords.latitude, lng: position.coords.longitude, accuracy: position.coords.accuracy });
        setSharing(true); setGeoError("");
      }, (error) => {
        setSharing(false);
        setGeoError(error.code === error.PERMISSION_DENIED ? "Permita o acesso à localização nas configurações do navegador/aparelho." : error.message);
      }, { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 });
    };
    if (!socket.connected) socket.connect();
    socket.on("connect", startWatch);
    if (socket.connected) startWatch();
    return () => {
      if (watchId !== undefined) navigator.geolocation.clearWatch(watchId);
      socket.off("connect", startWatch);
      if (socket.connected) socket.emit("location:stop");
    };
  }, [user?.role]);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }
  async function copyCode() {
    if (!user?.familyCode) return;
    try { await navigator.clipboard.writeText(user.familyCode); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    catch { setGeoError("Não foi possível copiar o código neste navegador."); }
  }
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  if (user?.role === "parent") return <div className="min-h-screen bg-secondary/5 p-4 pb-20"><main className="max-w-lg mx-auto space-y-5"><h1 className="font-bold text-3xl">Ajustes</h1><button onClick={() => navigate("/perfil")} className="w-full bg-white p-4 rounded-2xl flex items-center gap-3 text-left shadow-sm"><div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-primary">{user.firstName[0]}</div><div className="flex-1"><p className="font-bold">{fullName}</p><p className="text-xs text-neutral">{user.email}</p></div><UserRound className="text-neutral"/></button>
    <section className="bg-white rounded-2xl p-4 space-y-2"><h2 className="text-xs font-bold uppercase text-neutral">Gerenciamento familiar</h2><button onClick={() => navigate("/perfil")} className="w-full p-3 flex items-center gap-3 text-left"><UserRound className="text-secondary"/> Meu perfil</button><button onClick={() => navigate("/vincular-filho")} className="w-full p-3 flex items-center gap-3 text-left"><UserPlus className="text-secondary"/> Vincular novo dependente</button></section>
    <button onClick={() => void handleLogout()} className="w-full bg-white text-red-600 font-semibold p-4 rounded-2xl shadow-sm flex items-center justify-center gap-2"><LogOut size={19}/> Sair da conta neste aparelho</button></main></div>;

  return <div className="min-h-screen bg-secondary/5 p-4 pb-20"><main className="max-w-lg mx-auto space-y-5"><h1 className="font-bold text-3xl">Olá, {user?.firstName || ""}!</h1>
    <section className="bg-white rounded-2xl p-5 shadow-sm space-y-3"><div className="flex items-center gap-3"><div className="bg-secondary p-3 rounded-xl text-white"><ShieldCheck/></div><div><p className="font-semibold">Compartilhamento de localização</p><p className={`text-sm ${sharing ? "text-green-700" : "text-neutral"}`}>{sharing ? "Ativo neste aparelho" : "Aguardando permissão/conexão"}</p></div></div>{!("geolocation" in navigator) && <p role="alert" className="text-sm text-red-600">Este navegador não oferece geolocalização.</p>}{geoError && <p role="alert" className="text-sm text-red-600">{geoError}</p>}<p className="text-xs text-neutral">A localização é enviada enquanto esta tela estiver aberta e o navegador permitir o acesso. Para compartilhamento contínuo em segundo plano, é necessário um aplicativo móvel nativo.</p></section>
    <section className="bg-white rounded-2xl p-5 shadow-sm space-y-3"><div className="flex items-center gap-3"><KeyRound className="text-secondary"/><p className="font-semibold">Seu código de família</p></div><p className="text-xs text-neutral">Compartilhe este código com seu responsável para vincular as contas.</p><p className="text-center text-2xl tracking-widest font-bold text-primary bg-secondary/10 rounded-xl p-4">{user?.familyCode || "Código indisponível"}</p><button onClick={() => void copyCode()} disabled={!user?.familyCode} className="w-full bg-secondary text-white rounded-xl p-3 flex items-center justify-center gap-2 disabled:opacity-50"><Copy size={17}/>{copied ? "Código copiado" : "Copiar código"}</button></section>
    <section className="bg-secondary/10 rounded-2xl p-4 flex gap-3"><MapPin className="text-primary shrink-0"/><p className="text-sm">O ParentWatch compartilha sua posição com o responsável vinculado, conforme as permissões aplicadas pelo servidor.</p></section>
    <button onClick={() => void handleLogout()} className="w-full text-red-600 font-semibold p-4 flex items-center justify-center gap-2"><LogOut size={19}/> Sair da conta neste aparelho</button></main></div>;
}
