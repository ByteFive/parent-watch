import { Camera, ChevronLeft, Mail, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-secondary/5 flex flex-col pb-10">
      <header className="w-full bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Meu Perfil</h1>
        </div>
        <button className="text-primary font-semibold text-sm hover:underline">
          Salvar
        </button>
      </header>

      <div className="flex-1 w-full p-4 space-y-6">
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center border-4 border-white shadow-sm text-primary font-bold text-3xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <button className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full shadow-md border-2 border-white hover:opacity-90 transition-opacity">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="mt-3 text-xl font-bold text-gray-800">{user?.name || "Usuário"}</h2>
          <span className="text-xs font-semibold bg-secondary/20 text-primary px-3 py-1 rounded-full mt-1">
            {user?.role === "responsavel" ? "Conta Responsável" : "Conta Dependente"}
          </span>
        </div>

        <div className="w-full bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Nome Completo
            </label>
            <div className="flex items-center bg-secondary/5 rounded-xl px-3 py-3 border border-secondary/10 focus-within:border-secondary transition-all">
              <User size={18} className="text-secondary mr-3" />
              <input
                type="text"
                defaultValue={user?.name || "José Alison Barbosa da Silva"}
                className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              E-mail
            </label>
            <div className="flex items-center bg-secondary/5 rounded-xl px-3 py-3 border border-secondary/10 focus-within:border-secondary transition-all">
              <Mail size={18} className="text-secondary mr-3" />
              <input
                type="email"
                defaultValue={user?.email || "responsavel@email.com"}
                className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Telefone / WhatsApp
            </label>
            <div className="flex items-center bg-secondary/5 rounded-xl px-3 py-3 border border-secondary/10 focus-within:border-secondary transition-all">
              <Phone size={18} className="text-secondary mr-3" />
              <input
                type="tel"
                defaultValue="(81) 98765-4321"
                className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}