import {
  Bell,
  ChevronRight,
  CircleCheck,
  Copy,
  KeyRound,
  LockKeyhole,
  LogOut,
  Shield,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-secondary/5 pb-20">
      {user?.role === "responsavel" ? (
        /* Versão do Responsável */
        <div className="p-4 space-y-6 max-w-md mx-auto">
          <h1 className="font-bold text-3xl text-gray-800">Ajustes</h1>

          {/* Card de Perfil Resumido */}
          <div
            onClick={() => navigate("/perfil")}
            className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : "R"}
              </div>
              <div>
                <p className="font-bold text-gray-800">{user?.name || "Responsável"}</p>
                <p className="text-xs text-gray-500">{user?.email || "responsavel@email.com"}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>

          {/* Gerenciamento Familiar */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
              Gerenciamento Familiar
            </h2>
            <div className="bg-white rounded-2xl p-2 shadow-sm space-y-1">
              <button
                onClick={() => navigate("/perfil")}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/5 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-xl text-primary">
                    <User size={18} />
                  </div>
                  <span className="font-medium text-gray-700 text-sm">Meu Perfil</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button
                onClick={() => navigate("/vincular-filho")}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/5 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-xl text-primary">
                    <UserPlus size={18} />
                  </div>
                  <span className="font-medium text-gray-700 text-sm">Vincular Novo Dependente</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Preferências e Segurança */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
              Preferências e Segurança
            </h2>
            <div className="bg-white rounded-2xl p-2 shadow-sm space-y-1">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/5 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-xl text-primary">
                    <Bell size={18} />
                  </div>
                  <span className="font-medium text-gray-700 text-sm">Notificações e Alertas</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/5 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-xl text-primary">
                    <Shield size={18} />
                  </div>
                  <span className="font-medium text-gray-700 text-sm">Privacidade e Permissões</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Botão Sair */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full bg-white text-red-500 font-semibold p-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors border border-red-100"
            >
              <LogOut size={20} />
              <span>Sair da conta neste aparelho</span>
            </button>
          </div>
        </div>
      ) : (
        /* Versão do Dependente */
        <div className="p-4 space-y-4 max-w-md mx-auto">
          <h1 className="font-bold text-3xl">Olá, {user?.name || "Lucas"}!</h1>
          <div className="bg bg-secondary/10 flex gap-4 p-4 items-center rounded-2xl">
            <div className="bg-secondary p-4 rounded-2xl">
              <ShieldCheck className="text-white" />
            </div>
            <p className="font-semibold">Compartilhamento Ativo</p>
          </div>

          <div className="flex flex-col bg-white rounded-2xl p-4 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="bg-secondary/30 p-2 rounded-2xl">
                <KeyRound size={16} />
              </div>
              <p>Seu ID de Verificação</p>
            </div>
            <div className="bg-secondary/10 flex flex-col items-center rounded-2xl gap-4 p-2">
              <p className="text-gray-500">código do dispositivo</p>
              <p className="text-3xl text-primary font-bold">LUCAS-8462</p>
              <p className="flex items-center text-gray-700 gap-2 text-xs">
                <LockKeyhole className="text-secondary" size={16} />
                Protegido com criptografia familiar
              </p>
            </div>
            <button className="bg-secondary flex justify-center items-center gap-2 p-4 rounded-2xl text-white font-semibold">
              <Copy size={18} /> Copiar Código ID
            </button>
          </div>

          <h2 className="font-semibold text-lg">Responsável Vinculado</h2>
          <div className="flex items-center p-4 gap-4 bg-white rounded-2xl">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-secondary/20 flex items-center justify-center">
              <User className="text-primary" size={32} />
            </div>

            <div className="flex justify-between items-center w-full">
              <p className="font-bold text-gray-800">Maria Oliveira (Mãe)</p>
              <CircleCheck className="text-secondary" />
            </div>
          </div>

          <div className="bg-secondary/10 flex items-center rounded-2xl p-4 gap-4">
            <div className="bg-secondary/20 p-2 rounded-3xl shrink-0">
              <Shield className="text-primary" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Privacidade e Foco: </span>Este
                aplicativo é exclusivamente para manter você protegido. Seu perfil
                não acessa o painel de outros usuários.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center p-4">
            <button className="flex items-center gap-2 text-red-500 font-semibold" onClick={handleLogout}>
              <LogOut size={20} />
              Sair da conta neste aparelho
            </button>
          </div>
        </div>
      )}
    </div>
  );
}