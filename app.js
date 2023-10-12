import express from "express";
import http from "http";
import { Server} from "socket.io";
import cors from "cors";
import 'dotenv/config'

const app = express();
const server = http.createServer(app);


//Middlewares
app.use(cors());
app.use(express.static('Frontend/dist'));


const io = new Server(server, {
    cors: {
      origin: "https://chat-app-production-5c19.up.railway.app/"
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

server.listen(process.env.PORT, () => {
    console.log('listening on:', process.env.PORT);
  });
