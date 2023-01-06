import cors from "cors";
import express from "express";

const server = express();
server.use(cors());

const PORT = 5000;

const user = [];
const tweet = [];

server.post("/sign-up", (req, res) => {
  res.send(user);
});
server.get("/sign-up", (req, res) => {
  console.log(req);
  res.send(user);
});
server.post("/tweets", (req, res) => {
  res.send(user);
});
server.get("/tweets", (req, res) => {
  res.send(user);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
