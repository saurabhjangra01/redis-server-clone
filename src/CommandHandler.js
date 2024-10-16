class CommandHandler {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    handleCommand(command, args, connection) {
        switch (command.toLowerCase()) {
            case "set":
                return this.handleSet(args, connection);
            case "get":
                return this.handleGet(args, connection);
            case "ping":
                return this.handlePing(connection);
            default:
                {
                    console.log("unknown command");
                    connection.write("-ERR unknown command\r\n");
                }
                break;
        }
    }

    handleSet(args, connection) {
        if (args.length < 2) {
            connection.write(
                '-ERR wrong number of arguments for "set" command\r\n'
            );
            return;
        }

        const [key, value] = args;
        this.dataStore.set(key, value);
        connection.write("+OK\r\n");
    }

    handleGet(args, connection) {
        if (args.length < 1) {
            connection.write(
                '-ERR wrong number of arguments for "get" command\r\n'
            );
            return;
        }
        const key = args[0];
        if (this.dataStore.exists(key)) {
            const value = this.dataStore.get(key);
            connection.write(`$${value.length}\r\n${value}\r\n`);
        } else {
            connection.write("$-1\r\n"); // Null bulk string
        }
    }

    handlePing(connection) {
        connection.write("+PONG\r\n");
    }
}

module.exports = CommandHandler;
