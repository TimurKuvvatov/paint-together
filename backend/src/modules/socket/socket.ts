import { Server as ServerNode } from "node:http";
import { Server } from "socket.io";
import {
  addUserToRoom,
  createRoom,
  deleteRoom,
  getRoom,
  removeUserFromRoom,
  saveRoomImage,
} from "../room/room.service";
import { createUser } from "../user/user.service";

export const setupSocket = (server: ServerNode) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connect", (socket) => {
    socket.on("room:create", (nickname: string, ack) => {
      const room = createRoom();
      const user = createUser({
        id: socket.id,
        nickname,
        role: "host",
        roomId: room.id,
      });

      addUserToRoom(room.id, user);
      socket.join(room.id);
      socket.data.roomId = room.id;

      ack({ ok: true, roomId: room.id });
      io.to(room.id).emit(
        "users:update",
        room.users.map((u) => u),
      );
    });

    socket.on(
      "room:join",
      ({ nickname, roomId }: { nickname: string; roomId: string }, ack) => {
        const user = createUser({
          id: socket.id,
          nickname,
          role: "guest",
          roomId,
        });
        const room = getRoom(roomId);
        if (!room) return;

        addUserToRoom(roomId, user);
        socket.join(roomId);
        socket.data.roomId = roomId;

        ack({ ok: true, roomId });
        io.to(roomId).emit(
          "users:update",
          room.users.map((u) => u),
        );

        if (room.currentImage) {
          socket.emit("paint:draw", room.currentImage);
        }
      },
    );

    socket.on(
      "paint:draw",
      ({ roomId, dataUrl }: { roomId: string; dataUrl: string }) => {
        const room = getRoom(roomId);
        if (!room) return;

        saveRoomImage(roomId, dataUrl);
        socket.to(roomId).emit("paint:draw", dataUrl);
      },
    );

    socket.on("disconnect", () => {
      const room = getRoom(socket.data.roomId);
      if (!room) return;

      removeUserFromRoom(room.id, socket.id);
      if (room.users.length > 0) {
        io.to(room.id).emit(
          "users:update",
          room.users.map((u) => u),
        );
      } else {
        deleteRoom(room.id);
      }

      console.log("User disconnected", socket.id);
    });
  });
};
