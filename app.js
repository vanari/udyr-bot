const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const prefix = '/';

client.once("ready", () => {
    console.log("Udyr is online!");
});


client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == "stepan" || command == "štěpán"){
        message.channel.send("More like Špekán! xDDDDDD");
    }

    if (command == "cock"){
        message.channel.send("cock and balls");
    }

    if (command == "cbt"){
        message.channel.send(message.author.username + ", it is time for your cock flattening session!");
    }

    if (command == "code"){
        fs.readFile("./app.js", "utf-8", (err, data) => {
            if (err) {
                message.channel.send("unexpected error occurred")
                return console.log(err);
            }

            const q = String.fromCharCode(0x60);

            message.channel.send(q + q + q + data + q + q + q);
        });
    }
});

fs.readFile("./token.cbt", "utf-8", (err, data) => {
    if (err) {
        return console.log(err);
    }

    client.login(data);
});