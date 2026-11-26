
import { useEffect, useState } from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  IdCard,
  Lock,
  MapPin,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../contexts/AuthContext";

import {
  loginSchema,
  type LoginFormData,
} from "../lib/validations/authSchema";

import { formatCpf } from "../lib/validations/cpf";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const { user, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = (
    location.state as { message?: string } | null
  )?.message;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const cpf = watch("cpf");

  // Redireciona automaticamente se já estiver autenticado
  useEffect(() => {
    if (user) {
      navigate(
        user.role === "child" ? "/ajustes" : "/",
        { replace: true }
      );
    }
  }, [user, navigate]);

  // Realiza login conectado ao backend
  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");

      const authenticatedUser = await login(data);

      const requestedPath = (
        location.state as {
          from?: { pathname?: string };
        } | null
      )?.from?.pathname;

      if (authenticatedUser.role === "child") {
        navigate("/ajustes", { replace: true });
        return;
      }

      navigate(
        requestedPath && requestedPath !== "/login"
          ? requestedPath
          : "/",
        { replace: true }
      );

    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível realizar o login.";

      setServerError(message);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/5 flex md:items-center md:justify-center">
      <div className="w-full max-w-md p-6 md:p-10 md:bg-white md:rounded-2xl md:shadow-lg">

        {/* Cabeçalho */}
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

        {/* Título */}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-10 mb-8">
          Bem-vindo de volta
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Mensagem de cadastro */}
          {successMessage && (
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
              {successMessage}
            </p>
          )}

          {/* CPF */}
          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-semibold text-primary mb-2"
            >
              CPF
            </label>

            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <IdCard
                className="text-neutral shrink-0"
                size={20}
              />

              <input
                id="cpf"
                type="text"
                inputMode="numeric"
                autoComplete="username"
                placeholder="000.000.000-00"
                value={formatCpf(cpf || "")}
                onChange={(event) =>
                  setValue("cpf", event.target.value, {
                    shouldValidate: true,
                  })
                }
                className="flex-1 min-w-0 bg-transparent outline-none text-lg text-primary placeholder:text-primary/70"
              />
            </div>

            {errors.cpf && (
              <p className="text-sm text-red-600 mt-1">
                {errors.cpf.message}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-primary mb-2"
            >
              Sua senha
            </label>

            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-secondary/10 focus-within:ring-2 focus-within:ring-secondary">
              <Lock
                className="text-neutral shrink-0"
                size={20}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password")}
                className="flex-1 min-w-0 bg-transparent outline-none text-lg text-primary"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
                className="cursor-pointer text-neutral hover:text-primary duration-300"
              >
                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Erro do backend */}
          {serverError && (
            <p
              role="alert"
              className="text-sm text-red-600"
            >
              {serverError}
            </p>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 disabled:opacity-60 duration-300"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}

            {!isSubmitting && (
              <ArrowRight size={20} />
            )}
          </button>
        </form>

        {/* Cadastro */}
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
