export function initWebSocket(onMessage: (data: unknown) => void) {
  // Choose ws or wss based on current page protocol
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  // window.location.host includes hostname and port
  // const host = window.location.host;

  const ws = new WebSocket(`${protocol}://localhost:8000/ws/notifications/`);

  ws.onopen = () => console.log("WS connected");
  ws.onmessage = (e) => onMessage(JSON.parse(e.data));
  ws.onclose = () => console.log("WS disconnected");
  ws.onerror = (err) => console.error("WebSocket error", err);

  return ws;
}
