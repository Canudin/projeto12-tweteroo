import cors from "cors";
import express from "express";

const server = express();
server.use(cors());
server.use(express.json());

const PORT = 5000;

const users = [
  {
    // username: "Canudin",
    // avatar:git 
    //   "https://img.freepik.com/premium-vector/cute-potato-vegetable-character-mascot-with-cool-gesture-isolated-cartoon-flat-style-design_574864-227.jpg?w=2000",
  },
];
const tweets = [
  // { username: "Canudin", tweet: "teste0" },
  // { username: "Canudin", tweet: "teste1" },
  // { username: "Canudin", tweet: "teste2" },
  // { username: "Canudin", tweet: "teste3" },
  // { username: "Canudin", tweet: "teste4" },
  // { username: "Canudin", tweet: "teste5" },
  // { username: "Canudin", tweet: "teste6" },
  // { username: "Canudin", tweet: "teste7" },
  // { username: "Canudin", tweet: "teste8" },
  // { username: "Canudin", tweet: "teste9" },
  // { username: "Canudin", tweet: "teste10" },
  // { username: "Canudin", tweet: "teste11" },
  // { username: "Canudin", tweet: "teste12" },
];

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  const newUser = { username: username, avatar: avatar };

  if (!username || !avatar) {
    return res.status(400);
  }
  users.push(newUser);
  res.status(201).send("Ok!");
});
server.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  console.log(req.body);
  const newTweet = { username: username, tweet: tweet };

  if (!users.find((element) => element.username === newTweet.username)) {
    return res.status(401).send("Unauthorized");
  }

  tweets.push(newTweet);
  res.status(201).send("Ok!");
});
server.get("/tweets", (req, res) => {
  const lastTweets = [...tweets.slice(-10)];
  const lastTweetsWithAvatar = [];
  // console.log(lastTweets)
  lastTweets.map((item, index) => {
    const userInfo = users.find((element) => element.username === item.username);
    // console.log(userInfo);
    const avatar = userInfo.avatar;
    const username = lastTweets[index].username;
    const tweet = lastTweets[index].tweet;
    lastTweetsWithAvatar.push({ username: username, avatar: avatar, tweet: tweet })
  });
  console.log(lastTweetsWithAvatar);
  res.send(lastTweetsWithAvatar.reverse());
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
