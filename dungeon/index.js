const { Client, Intents,  MessageActionRow, MessageButton, MessageEmbed  } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const db = require('quick.db')
require('dotenv').config();


client.login(process.env.token)


client.on("messageCreate", message => {
    
})










