const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js'); //NOTE: Try to remember this 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//gotta get our config 
require('dotenv').config();
//new things i wanna try
const db = require("quick.db")

//to confirm our bot started correctly
client.on("ready", () => {
    console.log("bot ready")
})

client.login(process.env.TOKEN);

client.on("messageCreate", message => {
    //keep bots from interacting with ours to prevent spam from self and other issues
    if(message.author.bot) return;


    //incase for whatever reason the guild dosent have a prefix
    if(db.has(`gid_${message.guildId}`) === false){
        db.set(`gid_${message.guildId}`, { prefix: '!'})
    };

    //specifying what our prefix is for late
    const prefix = db.get(`gid_${message.guildId}.prefix`)

    //check if the bot is the mentioned user 
    if(message.content.startsWith("<@!863141640784576532>")){
        //if it is the mentioned user the bot sends a message with its prefix
        message.channel.send(`Hi! im ${client.user.username}, Im a bot coded by ferny! my prefix is: ${db.get(`gid_${message.guildId}.prefix`)}`)
    }

    if(message.content.startsWith("ping")) return message.reply("pong!") //simple test command to make sure the bot works

    //check if the message content starts with our user defined prefix
    if(!message.content.startsWith(prefix)) return;

    //we split the messages by their space and then cut the first one out and then seperate them into ARGS (arguments)
    const args = message.content.slice(prefix.length).trim().split(" ");
    //we just get the first argument and shit it to lowercase so CapItIlizAtiOn DosEn't MatTeR 
    const cmd = args.shift().toLowerCase();

    //we set the users age in the DB to whatever they choose
    if(cmd === "age"){
        if(Number.isNaN(+args[0])){
            //ages must be a number
            message.reply("your age must be a number")
        } else {
            //set tje age to their prefered value
            db.set(`id_${message.author.id}`, { Age: `${args[0]}`})
        }
    }
    //set the peom they dispaly on their profile to the one of their choosing
    if(cmd === "profilepoem"){
        //get the poem they send by ignoring spaces
        const poem = args.slice(0).join(' ');
        db.set(`id_${message.author.id}.poem`, `${poem}`)
    }

    if(cmd === "profile"){
        //check to see if they mentioned someone in their message if not then we go by the author of the message
        if(!message.mentions.users.first()) var user = message.author
        else var user = message.mentions.users.first()
        
        //check to see AGE is set in our db
        if(db.has(`id_${user.id}.Age`) === false){
            db.set(`id_${user.id}`, { Age: "N/A"})
        }
        //check to see if they have set a poem they wanan display
        if(db.has(`id_${user.id}.poem`) === false){
            db.set(`id_${user.id}.poem`, "none!" )
        }

        //the magic embed
        let embed = new MessageEmbed()
            .setTitle(`${user.username}'s Profile?`)
            .setColor("DARK_BLUE")
            .addField("Age:", `${db.get(`id_${user.id}.Age`)}`)
            .addField("Featured Poem", `${db.get(`id_${user.id}.poem`)}`)
        message.channel.send({embeds: [embed] })

    }
    //dev command

    /*if(cmd === "listdb"){
        var msg1 = db.all()
        var msg2 = JSON.stringify(msg1)
        message.channel.send(msg2)
    } */

    //we set the prefix of our bot by the user imputing their own prefix
    if(cmd === "setprefix"){
        if(!args[0]) return message.reply("you must specify a prefix!")
        db.set(`gid_${message.guildId}`, { prefix: `${args[0]}`})
        //to confirm the prefix was updated
        message.channel.send(`my prefix is now: ${db.get(`gid_${message.guildId}.prefix`)}`)
    }
})


//sets the guild default prefix when the bot is added
client.on("guildCreate", async guild => {
    db.set(`gid_${guild.id}`, { prefix: `!`})
})