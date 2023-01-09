import cors from "cors";
import express from "express";

const server = express();
server.use(cors());
server.use(express.json())

const PORT = 5000;

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  const {username, avatar} = req.body
  const newUser = {username: username, avatar: avatar}


  users.push(newUser)
  res.send("Ok!");
});
server.post("/tweets", (req, res) => {
  const {username, tweet} = req.body
  const newTweet = {username: username, tweet: tweet}

  if (!users.find(element => element === newTweet.username)){
    return res.status(401).send("Unauthorized")
  }
  
  tweets.push(newTweet)
  res.send("Ok!");
});
server.get("/tweets", (req, res) => {
  const lastTweets = []
  for (let i=0; i<10; i++){
    if (!tweets[i]) return
    const username = tweets[i].username
    const tweet = tweets[i].tweet
    const userInfo = users.find(element => element.username === tweets[i].username)
    const avatar = userInfo.avatar
    lastTweets.push({username: username, avatar: avatar, tweet:tweet})
  }

  res.send(lastTweets.reverse());
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
