export const SITE_NAME = "P'JENG's Q&A";
export const EVENT_NAME = "SUEA TALK 2026";
export const SITE_ORIGIN = "https://suea-talk-2026.onrender.com";
export const SITE_TITLE = `${SITE_NAME} | ${EVENT_NAME}`;
export const SITE_DESCRIPTION =
  "Q&A platform for SUEA TALK 2026 at Ayutthaya Wittayalai School, featuring questions from the room and answers from P'Jeng.";

export const PUBLIC_ROUTES = ["/all"] as const;

export function getConfiguredOrigin() {
  const configuredOrigin = normalizeOrigin(import.meta.env.VITE_APP_ORIGIN);

  if (!configuredOrigin) {
    return SITE_ORIGIN;
  }

  if (import.meta.env.PROD && isLocalOrigin(configuredOrigin)) {
    return SITE_ORIGIN;
  }

  return configuredOrigin;
}

export function getOriginFromRequest(request: Request) {
  return getConfiguredOrigin() || new URL(request.url).origin;
}

export function getCanonicalUrl(
  pathname: string,
  origin = getConfiguredOrigin(),
) {
  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;

  return `${origin}${normalizedPathname}`;
}

export function normalizeOrigin(origin: string | undefined) {
  const trimmed = origin?.trim();

  if (!trimmed) {
    return "";
  }

  return trimmed.replace(/\/+$/, "");
}

function isLocalOrigin(origin: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(
    origin,
  );
}
