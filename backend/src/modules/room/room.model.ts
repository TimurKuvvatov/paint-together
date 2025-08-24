import { User } from "../user/user.model";

export interface Room {
  id: string;
  users: User[];
  currentImage: string;
}
