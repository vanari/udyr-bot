const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const prefix = '/';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Udyr is online!");
});


client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == "stepan" || command == "štěpán"){
        client.commands.get("stepan").execute(message, args);
    }

    if (command == "cock"){
        client.commands.get("cock").execute(message, args);
    }

    if (command == "cbt"){
        client.commands.get("cbt").execute(message, args);
    }

    if (command == "code"){
        client.commands.get("code").execute(message, args);
    }

    if (command == "vyplata"){
        client.commands.get("vyplata").execute(message, args);
    }

    if (command == "join"){
        client.commands.get("join").execute(message, args);
    } 

    if (command == "leave"){
        client.commands.get("leave").execute(message, args);
    } 

    if (command == "help"){
        for (const com of client.commands){
            message.channel.send(com[1].name + "  -  " + com[1].description);
        }
    }
});

fs.readFile("./token.cbt", "utf-8", (err, data) => {
    if (err) {
        return console.log(err);
    }

    client.login(data);
});

function enhance(s, n){
    for (let i=n; i > s.length; i--){
        s+=' ';
    }
    return s;
}