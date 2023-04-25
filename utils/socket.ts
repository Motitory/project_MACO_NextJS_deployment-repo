import { io, Socket } from 'socket.io-client';

let socket: WebSocket | null = null;

if (typeof window !== 'undefined') {
  const URL = 'ws://172.21.4.223:8002/apple';
  socket = new WebSocket(URL);
}

// const URL = 'ws://172.21.4.223:8002/apple';
// const socket: Socket = io(URL);
// const socket: Socket = io(URL, {
// path: '/apple',
// });
// const socket = new WebSocket(URL);

export default socket;
