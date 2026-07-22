import { useEffect, useState } from "react";

export type Profile = {
  name: string;
  role: string;
  email: string;
  department: string;
};

const KEY = "nexusops.profile";

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile) {
  window.localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("nexusops:profile"));
}

export function clearProfile() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("nexusops:profile"));
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
    const onChange = () => setProfile(loadProfile());
    window.addEventListener("nexusops:profile", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("nexusops:profile", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return { profile, ready };
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("") || "?";
}
