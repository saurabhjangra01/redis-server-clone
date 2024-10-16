class CustomRespParser {
    static parseRESP(message) {
        console.log("message => ", message);
        const lines = message.split("\r\n");
        console.log("lines => ", lines);
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].startsWith("$")) {
                result.push(lines[i + 1]);
                i++;
            } else if (lines[i]) {
                result.push(lines[i]);
            }
        }
        console.log("result => ", result);
        return result;
    }
}

module.exports = CustomRespParser;
