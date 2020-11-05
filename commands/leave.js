module.exports = {
    name: "leave",
    description: "Removes user from a role.",
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
            message.member.roles.remove(id);
            message.channel.send("User " + message.author.username + " succesfully left the role " + name + ".");
        } else if (id == "x") {
            message.channel.send("Udyr bot cannot make you leave that role");
        } else {
            message.channel.send("User " + message.author.username + " already does not have the role " + name + ".");
        }
    }
}