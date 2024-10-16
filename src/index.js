const RedisServer = require("./RedisServer");

const port = 8000;

const redisServer = new RedisServer(port);
redisServer.start();
