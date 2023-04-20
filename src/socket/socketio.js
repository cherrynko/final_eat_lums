import {io} from "socket.io-client"
export const socket = io('http://143.110.176.163:3001',{ transports: ["websocket"] });
