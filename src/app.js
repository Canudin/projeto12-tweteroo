import cors from "cors";
import express from "express";

const server = express();
server.use(cors());
server.use(express.json());

const PORT = 5000;

const users = [
  {
  },
];
const tweets = [
];

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  const newUser = { username: username, avatar: avatar };

  if (!username || !avatar) return res.sendStatus(400);

  if (typeof username !== 'string' || typeof username !== 'string') return res.sendStatus(400);

  users.push(newUser);
  res.status(201).send("Ok!");
});
server.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const newTweet = { username: username, tweet: tweet };

  if (!username || !tweet) {
    return res.sendStatus(400);
  }

  if (typeof username !== 'string' || typeof tweet !== 'string') {
    return res.sendStatus(400);
  }

  if (!users.find((element) => element.username === newTweet.username)) {
    return res.status(401).send("Unauthorized");
  }

  tweets.push(newTweet);
  res.status(201).send("Ok!");
});
server.get("/tweets", (req, res) => {
  const lastTweets = [...tweets.slice(-10)];
  const lastTweetsWithAvatar = [];
  lastTweets.map((item, index) => {
    const userInfo = users.find((element) => element.username === item.username);
    const avatar = userInfo.avatar;
    const username = lastTweets[index].username;
    const tweet = lastTweets[index].tweet;
    lastTweetsWithAvatar.push({ username: username, avatar: avatar, tweet: tweet });
  });
  console.log(lastTweetsWithAvatar);
  res.send(lastTweetsWithAvatar.reverse());
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
