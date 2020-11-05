module.exports = {
    name: "join",
    description: "Adds user to a role.",
    execute(message, args){
        var id = "x";
        var name = "";
        if (args[0]=="nsfw"){
            id = "773694731741167647";
            name = args[0];
        } else if (args[0]=="fat"){
            id = "773692307185729566";
            name = args[0];
        } else if (args[0]=="e-girl" && args[1]=="enjoyer"){
            id = "773685498857390120";
            name = args[0] + ' ' + args[1];
        } else if (args[0]=="autistic"){
            id = "773691978634100758";
            name = args[0];
        }
        if (message.member.roles.cache.has(id)){
            message.channel.send("User " + message.author.username + " already has the role " + name + ".");
        } else if (id == "x") {
            message.channel.send("Udyr bot cannot grant you access into that channel");
        } else {
            message.member.roles.add(id);
            message.channel.send("User " + message.author.username + " succesfully added to the role " + name + ".");
        }
    }
}