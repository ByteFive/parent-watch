import api from "./api";

export interface LocationPoint {
  lat: number;
  lng: number;
  accuracy?: number | null;
  address?: string | null;
  city?: string | null;
  at: string;
}

export interface LocationSnapshot {
  userId: string;
  online: boolean;
  current: LocationPoint | null;
  lastLocations: LocationPoint[];
}

export async function getLocation(userId: string) {
  const { data } = await api.get<LocationSnapshot>(`/locations/${encodeURIComponent(userId)}`);
  return data;
}
