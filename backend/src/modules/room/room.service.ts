import { User } from "../user/user.model";
import { Room } from "./room.model";
import { v4 } from "uuid";

const rooms: Map<string, Room> = new Map();

export const createRoom = () => {
  const id = v4();
  const room: Room = { id, users: [], currentImage: "" };
  rooms.set(id, room);
  return room;
};

export const deleteRoom = (roomId: string) => {
  rooms.delete(roomId);
};

export const getRoom = (roomId: string): Room | undefined => {
  return rooms.get(roomId);
};

export const addUserToRoom = (roomId: string, user: User): void => {
  const room = rooms.get(roomId);
  if (!room) throw new Error("Room not found");
  room.users.push(user);
};

export const removeUserFromRoom = (roomId: string, userId: string): void => {
  const room = rooms.get(roomId);
  if (!room) return;
  room.users = room.users.filter((user) => user.id !== userId);
  if (room.users.length === 0) {
    rooms.delete(roomId);
  }
};

export const saveRoomImage = (roomId: string, dataUrl: string): void => {
  const room = rooms.get(roomId);
  if (!room) throw new Error("Room not found");
  room.currentImage = dataUrl;
};

export const getRoomImage = (roomId: string): string | undefined => {
  const room = rooms.get(roomId);
  if (!room) throw new Error("Room not found");
  return room.currentImage;
};
