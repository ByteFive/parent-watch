import { io, type Socket } from "socket.io-client";

const socketUrl = (import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL || "http://localhost:8080")
  .replace(/\/$/, "");

let sharedSocket: Socket | null = null;

export function getLocationSocket() {
  if (!sharedSocket) {
    sharedSocket = io(socketUrl, {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket", "polling"],
    });
  }
  return sharedSocket;
}

export function disconnectLocationSocket() {
  sharedSocket?.disconnect();
  sharedSocket = null;
}
