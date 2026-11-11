import { ArrowRight, Eye, EyeOff, IdCard, Lock, MapPin } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";

export function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>("");

  return (
    <div className="min-h-screen bg-secondary/5 flex md:items-center md:justify-center">
      <div className="w-full max-w-md p-6 md:p-10 md:bg-white md:rounded-2xl md:shadow-lg">
        <header className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/10 rounded-full py-2 pl-2 pr-4">
            <span className="flex items-center justify-center size-8 rounded-full bg-secondary text-white">
              <MapPin size={16} />
            </span>
            <span className="text-sm font-medium text-primary">
              ParentWatch
            </span>
          </div>
        </header>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-10 mb-8">
          Bem-vindo de volta
        </h1>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-semibold text-primary mb-2"
            >
              CPF do Responsável
            </label>
            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <IdCard className="text-neutral shrink-0" size={20} />
              <input
                id="cpf"
                type="text"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCpf(formatCpf(event.target.value))
                }
                className="flex-1 min-w-0 bg-transparent outline-none text-lg text-primary placeholder:text-primary/70"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Sua Senha
            </label>
            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <Lock className="text-neutral shrink-0" size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="flex-1 min-w-0 bg-transparent outline-none text-lg text-primary placeholder:text-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="cursor-pointer text-neutral hover:text-primary duration-300"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <Link
            to=""
            className="block text-right text-sm font-semibold text-secondary hover:text-secondary/80 duration-300"
          >
            Esqueci minha senha
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 duration-300"
          >
            Entrar
            <ArrowRight size={20} />
          </Link>
        </div>

        <p className="text-center text-neutral mt-8">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro"
            className="font-semibold text-secondary hover:text-secondary/80 duration-300"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
