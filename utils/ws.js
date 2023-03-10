import io from "@hyoga/uni-socket.io";

let $socket
export function createSocket () {
  $socket = io("ws://localhost:3000", {
    reconnection: false, //关闭自动重连
    transports: ["websocket"],
  });
  return $socket;
};

export function useSocket () {
  return $socket
}
