/**
 * Central HTTP client. Wire `VITE_API_BASE_URL` in `.env` when the backend is ready.
 * Auth: set `localStorage.setItem("access_token", "<jwt>")` when you issue tokens; client sends `Authorization: Bearer`.
 */

export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: string;

  constructor(status: number, statusText: string, body: string) {
    super(`${status} ${statusText}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | null | Record<string, unknown> | unknown[] | unknown;
  /** Set when sending FormData or a raw string body (skips default JSON Content-Type). */
  rawBody?: boolean;
};

function normalizeBaseUrl(raw: string | undefined): string {
  if (!raw?.trim()) return "";
  return raw.replace(/\/+$/, "");
}

export function getApiBaseUrl(): string {
  return normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
}

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = getApiBaseUrl();
  return base ? `${base}${normalizedPath}` : normalizedPath;
}

function mergeHeaders(base: Headers, extra?: HeadersInit): Headers {
  const out = new Headers(base);
  if (!extra) return out;
  new Headers(extra).forEach((value, key) => {
    out.set(key, value);
  });
  return out;
}

function defaultHeaders(): Headers {
  const h = new Headers();
  h.set("Accept", "application/json");
  const token = localStorage.getItem("access_token");
  if (token) h.set("Authorization", `Bearer ${token}`);
  return h;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { rawBody, headers: initHeaders, body, ...rest } = options;

  const headers = mergeHeaders(defaultHeaders(), initHeaders);

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const method = (rest.method ?? "GET").toUpperCase();
  const shouldSetJson =
    !rawBody && !isFormData && body !== undefined && method !== "GET" && method !== "HEAD";

  if (shouldSetJson) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(buildUrl(path), {
    credentials: "same-origin",
    ...rest,
    method,
    headers,
    body:
      shouldSetJson && body !== undefined
        ? JSON.stringify(body)
        : (body as BodyInit | null | undefined),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(res.status, res.statusText, text);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const contentLength = res.headers.get("Content-Length");
  if (contentLength === "0") {
    return undefined as T;
  }

  const contentType = res.headers.get("Content-Type") ?? "";
  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }

  return (await res.text()) as unknown as T;
}

export function apiGet<T>(path: string, init?: Omit<ApiRequestOptions, "method" | "body">): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "GET" });
}

export function apiPost<T>(
  path: string,
  body?: unknown,
  init?: Omit<ApiRequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "POST", body });
}

export function apiPut<T>(
  path: string,
  body?: unknown,
  init?: Omit<ApiRequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "PUT", body });
}

export function apiPatch<T>(
  path: string,
  body?: unknown,
  init?: Omit<ApiRequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "PATCH", body });
}

export function apiDelete<T>(path: string, init?: Omit<ApiRequestOptions, "method" | "body">): Promise<T> {
  return apiRequest<T>(path, { ...init, method: "DELETE" });
}
