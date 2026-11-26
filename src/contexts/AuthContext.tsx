/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import api, { getApiErrorMessage } from "../services/api";
import { disconnectLocationSocket } from "../services/socket";
import type { LoginFormData, RegisterFormData } from "../lib/validations/authSchema";
import { toRegisterPayload } from "../lib/validations/authSchema";

export type UserRole = "parent" | "child";
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  familyCode?: string;
}
interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<User>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<User | null>;
}
const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get<{ user: User }>("/auth/me");
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (formData: LoginFormData) => {
    try {
      const { data } = await api.post<{ user: User }>("/auth/login", {
        cpf: formData.cpf.replace(/\D/g, ""),
        password: formData.password,
      });
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Não foi possível realizar o login."), { cause: error });
    }
  }, []);

  const register = useCallback(async (formData: RegisterFormData) => {
    try {
      await api.post("/auth/register", toRegisterPayload(formData));
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Não foi possível criar sua conta."), { cause: error });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      disconnectLocationSocket();
    }
  }, []);

  // A checagem inicial reidrata o usuário a partir do cookie HttpOnly.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void checkAuth(); }, [checkAuth]);

  const value = useMemo(() => ({
    user, loading, isAuthenticated: Boolean(user), login, register, logout, checkAuth,
  }), [user, loading, login, register, logout, checkAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser utilizado dentro de AuthProvider.");
  return context;
}
