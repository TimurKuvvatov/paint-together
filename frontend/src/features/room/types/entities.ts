export type User = {
	id: string;
	nickname: string;
	role: string;
};

export type Room = {
	id: string | null;
	users: User[];
	currentImage: string | null;
};
