import express from "express";
import http from "http";
import { Server} from "socket.io";
import cors from "cors";
import { PORT } from "./server/config.js";


const app = express();
const server = http.createServer(app);



//Middlewares
app.use(cors());
// app.use(express.static('Frontend') );
// app.use(express.urlencoded({ extended: false }));


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  });

  io.on("connection", (socket) => {
    socket.on("message", (body) => {
      socket.broadcast.emit("message", {
        body,
        from: socket.id.slice(8),
      });
    });
  });

server.listen(PORT, () => {
    console.log('listening on:', PORT);
  });
