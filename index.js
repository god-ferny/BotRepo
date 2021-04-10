const discord = require("discord.js");
const client = new discord.Client();
const love = require("discord_love");
const fs = require("fs")
const prefix = "-"

client.on("ready", () => {
    console.log("ready")
});

client.login("ODE1NTM2OTEzNDE4NTUxMzEw.YDt18A.UhTfInaOSNOhjO_0rHy35jvcq-4")

client.on("message", message => {
    if(!message.content.startsWith(prefix) || (message.author.bot)) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const comd = args.shift().toLowerCase();

    if(comd === "help"){
        const embed = new discord.MessageEmbed()
            .setAuthor("BloodBot", "https://cdn.discordapp.com/attachments/711785560208965683/785342295767253053/download.gif")
            .setColor("#")
            .setFooter("BloodRose")
            .setThumbnail("https://cdn.discordapp.com/attachments/711785560208965683/785342295767253053/download.gif")
            .setTitle("Help | Commands")
            .addField("**Moderation**", "|-kick -ban -addrole -rmvrole ", false)
            .addField("**User**", "|-kiss -hug ", false)
            .addField("**Use me!**", "Invite me: [here!](https://discord.com/oauth2/authorize?client_id=815536913418551310&scope=bot&permissions=8) or check out my devs [here!](https://bloodrose.net)")
        message.member.send(embed);
        message.delete();
    }
    //fun section!
    if(comd === "kiss"){
        if(message.mentions.users.first() === message.author){
            message.channel.send("you akwardly try to kiss yourself and... fail.")
            return;
        }
        if(args[0]){
            usr = message.mentions.users.first();
            ath = message.author;
            message.channel.send(`${ath} kisses ${usr}`).then(() => message.channel.send(love.kiss()))
            return;
        } 
        else{
            message.channel.send("you akwardly try to kiss yourself and... fail.")
            return;
        }
        //so i really love brooke and shes really cute
    }
    if(comd === "hug"){
        if(message.mentions.users.first() === message.author){
            message.channel.send("you akwardly try to hug yourself and... fail.")
            return;
        }
        if(args[0]){
            usr = message.mentions.users.first();
            ath = message.author;
            message.channel.send(`${ath} hugs ${usr}`).then(() => message.channel.send(love.hug()))
            return;
        } 
        else{
            message.channel.send("you akwardly try to hug yourself and... fail.")
            return;
        }
    }
    if(comd === "beans"){
        if(message.author.id === "664665712995991576" || (message.author.id === "270673291411324929")){
            message.channel.send("https://cdn.discordapp.com/attachments/815813123210346517/820502289616732221/image0.png")
            return;
        }
        
    }
    if(comd === "kaori"){
        if(!message.author.id === "270673291411324929") return;
        const embed = new discord.MessageEmbed() //<@820526955677614109>
            .setAuthor("BloodBot")
            .setThumbnail("https://cdn.discordapp.com/attachments/711785560208965683/820530050851799090/image0.png")
            .setColor("#1c99ff")
            .setTitle("**Kaori**")
            .setDescription("The absolute waifu bot 👌")
        message.channel.send(embed)
    }
    //serious section!
    if(comd === "kick"){
        if(!message.mentions.users.first()) return message.channel.send("you need to mention someone to kick them!");
        if(message.member.hasPermission("KICK_MEMBERS")){
                let member = message.mentions.members.first();
                let reason = args.slice(1).join(" ")
                let member2 = message.mentions.users.first();
                member.kick(reason).catch(console.error);
                if(!reason)return message.channel.send(`${member2.username}#${member2.discriminator} has been kicked`);
                if(reason)return message.channel.send(`${member2.username}#${member2.discriminator} has been kicked for: \n ${reason}`)
            }
        }
    if(comd === "ban"){
        if(!message.mentions.users.first()) return message.channel.send("you need to mention someone to ban!");
        if(message.member.hasPermission("BAN_MEMBERS")){
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            if(!member.banable) return message.channel.send("i cannot ban this user");
            member.ban(reason)
            message.channel.send(`${member.username}#${member.discriminator} has been banned for: \n${reason}`)
        }
    }
    if(comd === "test"){
        message.reply("test").then(sent => {
            const idfor = sent.id;
            console.log(idfor)
            fs.writeFile("./ids.json")
        })
    }
    
})
client.on("messageReactionAdd", (reaction, user) => {

    if(reaction.message.id === asd){
        reaction.user.send("asd")
    }
})