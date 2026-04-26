import { API_URL } from "@/lib/constants";

type RequestOptions = RequestInit & {
  token?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(payload.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, token?: string | null) => request<T>(path, { token }),
  post: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, {
      method: "POST",
      token,
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, {
      method: "PUT",
      token,
      body: body ? JSON.stringify(body) : undefined,
    }),
  del: <T>(path: string, token?: string | null) =>
    request<T>(path, {
      method: "DELETE",
      token,
    }),
};
