const net = require("net");

const DataStore = require("./DataStore");
const CommandHandler = require("./CommandHandler");
const ConnectionHandler = require("./ConnectionHandler");

class RedisServer {
    constructor(port) {
        this.port = port;
        this.dataStore = new DataStore();
        this.commandHandler = new CommandHandler(this.dataStore);
        this.connectionHandler = new ConnectionHandler(this.commandHandler);
    }

    start() {
        const server = net.createServer((connection) =>
            this.connectionHandler.handleConnection(connection)
        );

        server.listen(this.port, () =>
            console.log(`Redis Server listening on PORT:${this.port}`)
        );

        server.on("error", (err) => {
            console.error(`Error in server: ${err}`);
            // process.exit(0);
        });
    }
}

module.exports = RedisServer;
