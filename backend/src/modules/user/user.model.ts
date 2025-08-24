export interface User {
  id: string;
  nickname: string;
  role: "host" | "guest";
  roomId: string;
}
