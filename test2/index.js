const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js'); //NOTE: Try to remember this 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//gotta get our config 
require('dotenv').config();
//new things i wanna try
const db = require("quick.db")

const prefix = "!"

client.login(process.env.TOKEN);

client.on("messageCreate", message => {
    if(message.author.bot) return;
    //keep bots from interacting with ours to prevent spam from self and other issues

    if(message.content.startsWith("ping")) return message.reply("pong!") //simple test command to make sure the bot works

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if(cmd === "imput"){
        db.set(message.member.id, { words: args[1]})

    }
    if(cmd === "output"){
        message.channel.send(db.get(message.member.id.words)).catch(err =>{
            if(err) return console.error(err)
        })
    }
})