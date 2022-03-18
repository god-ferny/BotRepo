const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js'); //NOTE: Try to remember this 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//gotta get our config 
require('dotenv').config();
//new things i wanna try
const db = require("quick.db")





client.on("ready", () => {
    console.log(db.all())
    console.log("bot ready")

})

client.login(process.env.TOKEN);

client.on("messageCreate", message => {
    //keep bots from interacting with ours to prevent spam from self and other issues
    if(message.author.bot) return;

    if(db.has(`gid_${message.guildId}`) === false){
        db.set(`gid_${message.guildId}`, { prefix: '!'})
        console.log('i worked!')
        console.log(db.get(`gid_${message.guildId}.prefix`))
    };
    const prefix = db.get(`gid_${message.guildId}.prefix`)

    if(message.content.startsWith("<@!863141640784576532>")){
        message.channel.send(`Hi! im ${client.user.username}, Im a bot coded by ferny! my prefix is: ${db.get(`gid_${message.guildId}.prefix`)}`)
    }


    if(message.content.startsWith("ping")) return message.reply("pong!") //simple test command to make sure the bot works

    //check if the message content starts with our user defined prefix
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if(cmd === "setprefix"){
        if(!args[0]) return message.reply("you must specify a prefix!")
        db.set(`gid_${message.guildId}`, { prefix: `${args[0]}`})
        message.channel.send(`my prefix is now: ${db.get(`gid_${message.guildId}.prefix`)}`)
    }



    if(cmd === "imput"){
        db.set(`id_${message.member.id}`, { words: `${args[0]}`})
        console.log(db.get(`id_${message.member.id}.words`))

    }
    if(cmd === "output"){
        message.channel.send(db.get(`id_${message.member.id}.words`)).catch(err =>{
            if(err) return console.error(err)
        })
    }
})



client.on("guildCreate", async guild => {
    db.set(`gid_${guild.id}`, { prefix: `!`})
})