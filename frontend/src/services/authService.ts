type LoginResponse = {
  token: string;
  user: { id: string; username: string };
};

type MeResponse = { id: string; username: string };

const login = async (username: string, password: string): Promise<LoginResponse> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw Object.assign(new Error(data.message ?? "Login failed"), { status: res.status });
  }
  return res.json() as Promise<LoginResponse>;
};

const logout = async (token: string): Promise<void> => {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
};

const me = async (token: string): Promise<MeResponse> => {
  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw Object.assign(new Error("Unauthorized"), { status: res.status });
  }
  return res.json() as Promise<MeResponse>;
};

export const authService = { login, logout, me };
