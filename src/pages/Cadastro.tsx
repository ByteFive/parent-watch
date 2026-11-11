
import {
  ArrowRight,
  ChevronLeft,
  CircleCheck,
  Eye,
  EyeOff,
  IdCard,
  LockKeyhole,
  MapPin,
  ShieldUser,
  SquareUser,
  User,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { formatCpf } from "./Login";

export default function Cadastro() {
  const [role, setRole] = useState<"responsavel" | "filho">("responsavel");
  const [cpf, setCpf] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/5 flex md:items-center md:justify-center">
      <div className="w-full max-w-lg p-6 md:p-10 md:bg-white md:rounded-2xl md:shadow-lg">

        {/* Cabeçalho */}
        <header className="flex items-center justify-between">
          <Link
            to="/login"
            className="flex items-center justify-center size-10 rounded-full bg-secondary/10 text-primary hover:bg-secondary/20 duration-300"
            aria-label="Voltar para login"
          >
            <ChevronLeft size={22} />
          </Link>

          <div className="flex items-center gap-2 bg-secondary/10 rounded-full py-2 pl-2 pr-4">
            <span className="flex items-center justify-center size-8 rounded-full bg-secondary text-white">
              <MapPin size={16} />
            </span>
            <span className="text-sm font-medium text-primary">
              ParentWatch
            </span>
          </div>
        </header>

        {/* Título */}
        <div className="mt-8 mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary">
            Criar conta
          </h1>
          <p className="text-neutral mt-2">
            Preencha seus dados para começar.
          </p>
        </div>

        <form className="space-y-5">

          {/* Seleção de perfil */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-primary">
                Perfil de uso
              </label>
              <span className="text-secondary text-xs">
                * Obrigatório
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("responsavel")}
                className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 duration-300 ${
                  role === "responsavel"
                    ? "border-secondary bg-secondary/5"
                    : "border-neutral/20 bg-white hover:border-secondary/50"
                }`}
              >
                {role === "responsavel" && (
                  <CircleCheck
                    size={20}
                    className="absolute top-3 right-3 text-secondary"
                  />
                )}

                <span className="flex items-center justify-center size-12 rounded-xl bg-primary text-white">
                  <ShieldUser size={24} />
                </span>

                <span className="text-sm font-semibold text-primary">
                  Responsável
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("filho")}
                className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 duration-300 ${
                  role === "filho"
                    ? "border-secondary bg-secondary/5"
                    : "border-neutral/20 bg-white hover:border-secondary/50"
                }`}
              >
                {role === "filho" && (
                  <CircleCheck
                    size={20}
                    className="absolute top-3 right-3 text-secondary"
                  />
                )}

                <span className="flex items-center justify-center size-12 rounded-xl bg-primary text-white">
                  <SquareUser size={24} />
                </span>

                <span className="text-sm font-semibold text-primary">
                  Filho
                </span>
              </button>
            </div>
          </div>

          {/* Nome */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Nome completo
            </label>

            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <User className="text-neutral shrink-0" size={20} />

              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Ex: Maria Oliveira"
                required
                className="flex-1 min-w-0 bg-transparent outline-none text-base text-primary placeholder:text-primary/50"
              />
            </div>
          </div>

          {/* CPF */}
          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-semibold text-primary mb-2"
            >
              CPF
            </label>

            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <IdCard className="text-neutral shrink-0" size={20} />

              <input
                id="cpf"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCpf(formatCpf(event.target.value))
                }
                required
                className="flex-1 min-w-0 bg-transparent outline-none text-base text-primary placeholder:text-primary/50"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Senha
            </label>

            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <LockKeyhole className="text-neutral shrink-0" size={20} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Crie uma senha"
                required
                className="flex-1 min-w-0 bg-transparent outline-none text-base text-primary placeholder:text-primary/50"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="text-neutral hover:text-primary duration-300"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Confirmar senha */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Confirmar senha
            </label>

            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <LockKeyhole className="text-neutral shrink-0" size={20} />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Digite sua senha novamente"
                required
                className="flex-1 min-w-0 bg-transparent outline-none text-base text-primary placeholder:text-primary/50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmação de senha"
                    : "Mostrar confirmação de senha"
                }
                className="text-neutral hover:text-primary duration-300"
              >
                {showConfirmPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>
          </div>

          {/* Cadastro */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 duration-300"
          >
            Criar minha conta
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-neutral mt-8">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-secondary hover:text-secondary/80 duration-300"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
