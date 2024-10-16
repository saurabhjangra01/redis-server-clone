const CustomRespParser = require("./CustomRespParser");

class ConnectionHandler {
    constructor(commandHandler) {
        this.commandHandler = commandHandler;
    }

    handleConnection(connection) {
        console.log("client connected");

        connection.on("data", (data) => {
            const message = data.toString().trim();
            const [command, ...args] = CustomRespParser.parseRESP(message);

            this.commandHandler.handleCommand(command, args, connection);
        });

        connection.on("end", () => {
            console.log("Client Disconnected");
        });
    }
}

module.exports = ConnectionHandler;
