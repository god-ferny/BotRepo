const { Client, Intents,  MessageActionRow, MessageButton, MessageEmbed  } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const sql = require('sqlite');

require('dotenv').config();



sql.open('./data/myData.sqlite');
client.login(process.env.token)

client.on("ready", () => {
    console.log("ready");
    sql.run('CREATE TABLE IF NOT EXISTS users (id TEXT, xp INTEGER, messages INTEGER)');
    sql.run('CREATE TABLE IF NOT EXISTS guilds (id TEXT, members TEXT, owner TEXT)');
});

client.on("messageCreate", message => {
    
})










