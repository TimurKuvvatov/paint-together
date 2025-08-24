import express from "express";
import cors from "cors";

import { setupSocket } from "./modules/socket/socket";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

setupSocket(server);

app.use(cors());
app.use(express.json());

server.listen(5000, () => {
  console.log(`Server started at http://localhost:${5000}`);
});
