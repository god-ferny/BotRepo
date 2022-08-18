const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, ClientPresence, Permissions, ReactionUserManager } = require('discord.js'); //NOTE: Try to remember this 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//gotta get our config 
require('dotenv').config();
//new things i wanna try
const db = require("quick.db");


client.on("messageCreate", async message =>{
    if(message.content = "test"){
        db.add(`id_${message.guild.id}`, "none")
    }

    if(message.content = "send test"){
        var embed = new MessageEmbed()
        
    }
})