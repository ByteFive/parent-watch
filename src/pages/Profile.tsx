import { ChevronLeft, Mail, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  return <div className="min-h-screen bg-secondary/5"><header className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm"><button onClick={() => navigate(-1)} aria-label="Voltar"><ChevronLeft/></button><h1 className="font-bold">Meu Perfil</h1></header>
    <main className="p-4 max-w-lg mx-auto space-y-5"><section className="bg-white rounded-2xl p-6 text-center shadow-sm"><div className="mx-auto w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center text-primary text-3xl font-bold">{user?.firstName?.[0]?.toUpperCase() || <UserRound/>}</div><h2 className="font-bold text-xl mt-3">{fullName || "Usuário"}</h2><span className="inline-block mt-2 text-xs rounded-full bg-secondary/15 text-primary px-3 py-1">{user?.role === "parent" ? "Conta responsável" : "Conta dependente"}</span></section>
      <section className="bg-white rounded-2xl p-4 shadow-sm space-y-4"><div><p className="text-xs text-neutral uppercase font-semibold">Nome completo</p><p className="font-medium mt-1">{fullName || "Não informado"}</p></div><div className="flex items-center gap-3"><Mail className="text-secondary"/><div><p className="text-xs text-neutral uppercase font-semibold">E-mail</p><p className="font-medium">{user?.email}</p></div></div><div><p className="text-xs text-neutral uppercase font-semibold">Perfil</p><p className="font-medium mt-1">{user?.role === "parent" ? "Responsável" : "Filho(a)"}</p></div></section>
      <p className="text-xs text-neutral text-center">Os dados exibidos são os retornados pelo backend. A API atual não disponibiliza edição de perfil.</p>
    </main></div>;
}
