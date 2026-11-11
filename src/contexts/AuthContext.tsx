import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "responsavel" | "dependente";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => AuthUser | null;
  logout: () => void;
};

const DEFAULT_USERS: Array<AuthUser & { password: string }> = [
  {
    id: "user-responsavel",
    name: "Alison Barbosa",
    email: "email@example.com",
    cpf: "00000000000",
    role: "responsavel",
    password: "123456",
  },
  {
    id: "user-dependente",
    name: "Lucas Oliveira",
    email: "email@example.com",
    cpf: "11111111111",
    role: "dependente",
    password: "123456",
  },
];

const STORAGE_KEY = "parentwatch.auth.user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStoredUser(): AuthUser | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "id" in parsed &&
      "name" in parsed &&
      "cpf" in parsed &&
      "role" in parsed &&
      (parsed.role === "responsavel" || parsed.role === "dependente")
    ) {
      const user = DEFAULT_USERS.find((item) => item.id === parsed.id);
      return user
        ? { id: user.id, name: user.name, email: user.email, cpf: user.cpf, role: user.role }
        : null;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  function login(identifier: string, password: string): AuthUser | null {
    const normalizedIdentifier = identifier.replace(/\D/g, "");
    const foundUser = DEFAULT_USERS.find(
      (item) => item.cpf === normalizedIdentifier && item.password === password,
    );

    if (!foundUser) return null;

    const authenticatedUser: AuthUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      cpf: foundUser.cpf,
      role: foundUser.role,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
    return authenticatedUser;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de AuthProvider.");
  }
  return context;
}
