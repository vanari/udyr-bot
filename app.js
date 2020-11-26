const Discord = require("discord.js");
client = new Discord.Client();
const fs = require("fs");

const { Player } = require("discord-player");
const player = new Player(client);
client.player = player;

const prefix = '/';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"));

//client.player.on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`));
// Then add some messages that will be sent when the events will be triggered
client.player
 
// Send a message when a track starts
.on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`))
 
// Send a message when something is added to the queue
.on('trackAdd', (message, queue) => {
    message.channel.send(`${queue.tracks[queue.tracks.length-1].title} has been added to the queue!`);
})
.on('playlistAdd', (message, playlist) => message.channel.send(`${playlist.title} has been added to the queue (${playlist.items.length} songs)!`))
 
// Send messages to format search results
.on('searchResults', (message, query, tracks) => {

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Here are your search results for ${query}!`)
    .setDescription(tracks.map((t, i) => `${i+1}. ${t.title}`))
    .setFooter('Send the number of the song you want to play!')
    message.channel.send(embed);
 
})
.on('searchInvalidResponse', (message, query, tracks, content, collector) => message.channel.send(`You must send a valid number between 1 and ${tracks.length}!`))
.on('searchCancel', (message, query, tracks) => message.channel.send('You did not provide a valid response... Please send the command again!'))
.on('noResults', (message, query) => message.channel.send(`No results found on YouTube for ${query}!`))
 
// Send a message when the music is stopped
.on('queueEnd', (message, queue) => message.channel.send('Music stopped as there is no more music in the queue!'))
.on('channelEmpty', (message, queue) => message.channel.send('Music stopped as there is no more member in the voice channel!'))
.on('botDisconnect', (message, queue) => message.channel.send('Music stopped as I have been disconnected from the channel!'))
 
// Error handling
.on('error', (error, message) => {
    switch(error){
        case 'NotPlaying':
            message.channel.send('There is no music being played on this server!')
            break;
        case 'NotConnected':
            message.channel.send('You are not connected in any voice channel!')
            break;
        case 'UnableToJoin':
            message.channel.send('I am not able to join your voice channel, please check my permissions!')
            break;
        default:
            message.channel.send(`Something went wrong... Error: ${error}`)
    }
})

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Udyr is online!");
});


client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command){
        case "stepan":
        case "štěpán":
            client.commands.get("stepan").execute(message, args);
        break;

        case "cock":
            client.commands.get("cock").execute(message, args);
        break;

        case "cbt":
            client.commands.get("cbt").execute(message, args);
        break;
        
        case "code":
            client.commands.get("code").execute(message, args);
        break;

        case "vyplata":
            client.commands.get("vyplata").execute(message, args);
        break;
            
        case "join":
            client.commands.get("join").execute(message, args);
        break;
                
        case "leave":
            client.commands.get("leave").execute(message, args);
        break;

        case "help":
            for (const com of client.commands){
                message.channel.send(com[1].name + "  -  " + com[1].description);
            }
        break;

        case "play":
            let track = await client.player.play(message, args[0], message.member.user.tag);
        break;

        case "testplay":
           await client.player.play(message, "https://www.youtube.com/watch?v=8whPUbzm3aw", message.member.user.tag);
        break;

        case "queue":
            let queue = client.player.getQueue(message);
            await console.log(client.player.getQueue(message));
            let q = queue.tracks.map((tracks, i) => {
                return `${i === 0 ? 'Current' : `${i+1}`}- ${tracks.title}`
            }).join('\n');  
            message.channel.send(q);
        break;

        case "stop":
            await client.player.stop(message);
            message.channel.send("Udyr is gone!");
        break;

        case "skip":
            let sSong = await client.player.skip(message);
            if (sSong.tracks)
                message.channel.send("skipped " + sSong.tracks[0].title);
        break;

        case "pause":
            await client.player.pause(message);
        break;

        case "resume":
            await client.player.resume(message);
        break;
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