const { ENGINE_METHOD_CIPHERS } = require("constants");
const discord = require("discord.js");
const client = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const love = require("discord_love");
const { TIMEOUT } = require("dns");
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
    if(comd === "kill"){
        if(!message.author.id === "270673291411324929") return;
        message.channel.send("do you wanna kill me?")
        message.react("✅").then(r => {
            message.react("❌")
        })
        message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == '✅') {
                        message.reply('dead.');
                        client.destroy();
                }
                else
                        message.channel.send("guess not")
        }).catch(() => {
                return;
        });
    }
    if(comd === "boinfo"){
        if(!message.author.id === "664665712995991576" || (!message.author.id === "270673291411324929")) return;
        let embed = new discord.MessageEmbed()
            .setAuthor("𝖇𝖑𝖔𝖔𝖉𝖗𝖔𝖘𝖊 𝖇𝖔𝖔𝖘𝖙𝖊𝖗𝖘  🖤")
            .setColor("#8d0e0c")
            .addField("**Booster perks:**", "One custom role with color. \n Double entry in server-wide giveaways. \nNickname perks to change your own name. \nEarly acess to new servers and features as a beta tester.")
            message.delete();
        message.channel.send(embed)
    }   
    if(comd === "stinfo"){
        if(!message.author.id === "664665712995991576" || (!message.author.id === "270673291411324929")) return;
        let embed = new discord.MessageEmbed()
            .setAuthor("𝖇𝖑𝖔𝖔𝖉𝖗𝖔𝖘𝖊 𝖘𝖙𝖆𝖋𝖋  🖤")
            .setColor("#8d0e0c")
            .addField("Bloodrose Community is looking for staff! We are looking for individuals who are:", ". ˚ ⸝⸝ Well acquainted with Discord and Minecraft \n⸝⸝ Want to contribute to great community \n. ˚ ⸝⸝ Interested in being a part of a fun and hardworking staff team \n⸝⸝ Have skills in video editing, moderation, programming, or web development \n. ˚ ⸝⸝ Can contribute to the server in a unique way \n\nWe aim to have a diverse team full of people with all different skill sets. If you feel like you are interested, or meet some of these qualifications, please express your interest in the Google Form attached.\n\n **Staff Form:** <https://docs.google.com/forms/d/e/1FAIpQLScB6oakeYcBEW4oKdZX3pqHilRw5JdWgAVe6UEJoRRkXutS1Q/viewform?usp=sf_link?>")
            message.delete();
        message.channel.send(embed)
    }
    if(comd === "stticker"){
        let embed = new discord.MessageEmbed()
            .setAuthor("𝖇𝖑𝖔𝖔𝖉𝖗𝖔𝖘𝖊 𝖙𝖎𝖈𝖐𝖊𝖙 𝖙𝖔𝖔𝖑  🖤")
            .setColor("#8d0e0c")
            .setDescription("react to this to open a ticket")
        message.channel.send(embed).then(message => {
            message.react("🎫")
        })
        message.delete()
    }
    if(comd === "stcolor"){
        if(!message.author.id === "664665712995991576" || (!message.author.id === "270673291411324929")) return;
        let embed = new discord.MessageEmbed()
            .setAuthor("𝖈𝖔𝖑𝖔𝖗 𝖗𝖔𝖑𝖊𝖘  🖤")
            .setColor("#8d0e0c")
            .setDescription("To obtain a color role, use the command -color (name of role) in <#775811656697643038> \n\nThe colors are case sensitive")
            .setImage("https://cdn.discordapp.com/attachments/785711694163738625/830661729729249300/image0.png")
        message.channel.send(embed)
        message.delete()

    }
    if(comd === "color" || (comd === "colour")){
        if(!message.author.id === "664665712995991576" || (!message.author.id === "270673291411324929")) return;

        const blacklist = [ "owner", "admin", "mod", "server booster", "active member", "member", "new member", "bots" ];

        if(!args[0]) return;
        var asd = args[0].toLocaleLowerCase();
        role = message.guild.roles.cache.find(role => role.name === asd)

        if(blacklist.includes(asd)) return message.author.send("nope.")


        message.member.roles.add(role).then(message => {
            message.delete({timout: 5000})
        })
        message.delete()

    };



    if(comd === "clean"){
        var del = args[0] + 1
        message.channel.bulkDelete(args[0]).then(r => {
            message.channel.send("cleaned " + args[0] +" messages").then(msg => {
                msg.delete({timeout: 1000})
            }).catch(console.error)
        })
    }

});

client.on("messageReactionAdd", async (reaction, user) => {
    if(user.bot) return;
    if(reaction.message.id === "831109282446835804"){
        if(reaction = "🎫"){
            reaction.message.guild.channels.create()
        }
    }
})