import { ArrowRight, Eye, EyeOff, IdCard, Lock, MapPin } from "lucide-react";
import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(user.role === "dependente" ? "/ajustes" : "/", { replace: true });
    }
  }, [user, navigate]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const authenticatedUser = login(cpf, password);

    if (!authenticatedUser) {
      setError("CPF ou senha inválidos.");
      return;
    }

    const requestedPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
    if (authenticatedUser.role === "dependente") {
      navigate("/ajustes", { replace: true });
    } else {
      navigate(requestedPath && requestedPath !== "/login" ? requestedPath : "/", { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-secondary/5 flex md:items-center md:justify-center">
      <div className="w-full max-w-md p-6 md:p-10 md:bg-white md:rounded-2xl md:shadow-lg">
        <header className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/10 rounded-full py-2 pl-2 pr-4">
            <span className="flex items-center justify-center size-8 rounded-full bg-secondary text-white">
              <MapPin size={16} />
            </span>
            <span className="text-sm font-medium text-primary">ParentWatch</span>
          </div>
        </header>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-10 mb-8">
          Bem-vindo de volta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="cpf" className="block text-sm font-semibold text-primary mb-2">
              CPF
            </label>
            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <IdCard className="text-neutral shrink-0" size={20} />
              <input
                id="cpf"
                type="text"
                inputMode="numeric"
                autoComplete="username"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setCpf(formatCpf(event.target.value))}
                required
                className="flex-1 min-w-0 bg-transparent outline-none text-lg text-primary placeholder:text-primary/70"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
              Sua senha
            </label>
            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <Lock className="text-neutral shrink-0" size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="flex-1 min-w-0 bg-transparent outline-none text-lg text-primary placeholder:text-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="cursor-pointer text-neutral hover:text-primary duration-300"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 duration-300"
          >
            Entrar
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-neutral mt-8">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-secondary hover:text-secondary/80 duration-300">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
