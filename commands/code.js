module.exports = {
    name: "code",
    description: "sends the source code of udyr",
    execute(message, args){
        const fs = require("fs");

        fs.readFile("./app.js", "utf-8", (err, data) => {
            if (err) {
                message.channel.send("unexpected error occurred")
                return console.log(err);
            }

            const q = String.fromCharCode(0x60);

            message.channel.send(q + q + q + data + q + q + q);
        });
    }
}