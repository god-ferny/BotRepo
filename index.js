const discord = require("discord.js");
const client = new discord.Client();
const love = require("discord_love");

const prefix = "!"

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
            .setAuthor("BloodBot")
            .setColor("#")
            .setFooter("BloodRose")
            .setThumbnail("https://cdn.discordapp.com/attachments/711785560208965683/785342295767253053/download.gif")
            .setTitle("Help | Commands")
            .addField("**Moderation**", "|-kick -ban -addrole -rmvrole ", false)
            .addField("**User**", "|-kiss -hug ", false)
            .addField("**Use me!**", "Invite me: [here!](https://discord.com/oauth2/authorize?client_id=815536913418551310&scope=bot&permissions=8) or check out my devs [here!](https://bloodrose.net)")
        message.member.send(embed);
    }
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
    }
    if(comd === "hug"){
        if(message.mentions.users.first() === message.author){
            message.channel.send("you akwardly try to hug yourself and... fail.")
            return;
        }
        if(args[0]){
            usr = message.mentions.users.first();
            ath = message.author;
            message.channel.send(`${ath} hug ${usr}`).then(() => message.channel.send(love.hug()))
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
});