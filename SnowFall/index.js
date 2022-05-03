const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, ClientPresence, Permissions, ReactionUserManager } = require('discord.js'); //NOTE: Try to remember this 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//gotta get our config 
require('dotenv').config();
//new things i wanna try
const db = require("quick.db");

var xp = new db.table('xp')
var age = new db.table('age')
var pro = new db.table('pro')
var merrydb = new db.table('merrydb')
var punish = new db.table('punishment')

console.log("starting snowfelll...")

//to confirm our bot started correctly
client.on("ready", () => {
    process.stdout.write(
`                                                                    
@@@@@@ @@@  @@@  @@@@@@  @@@  @@@  @@@ @@@@@@@@ @@@@@@@@ @@@      @@@      
!@@     @@!@!@@@ @@!  @@@ @@!  @@!  @@! @@!      @@!      @@!      @@!      
 !@@!!  @!@@!!@! @!@  !@! @!!  !!@  @!@ @!!!:!   @!!!:!   @!!      @!!      
    !:! !!:  !!! !!:  !!!  !:  !!:  !!  !!:      !!:      !!:      !!:      
::.: :  ::    :   : :. :    ::.:  :::    :       : :: ::  : ::.: : : ::.: :
`
    )
    process.stdout.write("")
});

client.login(process.env.TOKEN);

client.on("messageCreate", message => {
    //keep bots from interacting with ours to prevent spam from self and other issues
    if(message.author.bot) return;

    if(message.content.startsWith("<@!863141640784576532>")){
        //if it is the mentioned user the bot sends a message with its prefix
        message.channel.send(`Hi! im ${client.user.username}, Im a bot coded by ferny! my prefix is: ${db.get(`gid_${message.guildId}.prefix`)}`)
    };
    //incase for whatever reason the guild dosent have a prefix
    if(db.has(`gid_${message.guildId}`) === false){
        db.set(`gid_${message.guildId}`, { prefix: '!'})
    };

    if(xp.has(`id_${message.author.id}`) === false){
        xp.set(`id_${message.author.id}`, { xp : 1})
    }


    //specifying what our prefix is for late
    const prefix = db.get(`gid_${message.guildId}.prefix`);

    //check if the bot is the mentioned user 


    if(message.content.startsWith("ping")) return message.reply("pong!") //simple test command to make sure the bot works

    //check if the message content starts with our user defined prefix
    if(!message.content.startsWith(prefix)){
        xp.add(`id_${message.author.id}.xp`, 1)
        return;
    }

    //we split the messages by their space and then cut the first one out and then seperate them into ARGS (arguments)
    const args = message.content.slice(prefix.length).trim().split(" ");
    //we just get the first argument and shit it to lowercase so CapItIlizAtiOn DosEn't MatTeR 
    const cmd = args.shift().toLowerCase();

    //we set the users age in the DB to whatever they choose
    if(cmd === "age"){
        const lenthssss = args.slice(0).join(' ');
        if(lenthssss.length >= 3){
            message.reply(`Are you sure you're ${args[0]} years old?`)
            return;
        };
        if(Number.isNaN(+args[0])){
            //ages must be a number
            message.reply("your age must be a number");
        } else {
            //set tje age to their prefered value
            age.set(`id_${message.author.id}`, { age: `${args[0]}`});
            message.channel.send(`set your age to: ${args[0]}`).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        };
    };
    if(cmd === "pronouns"){
        var pronouness = args.slice(0).join(' ');
        if(pronouness.length >= 25){
            message.reply("your pronouns may not be over 25 characters, this includes '/' and ' '")
        } else {
            message.reply(`set your pronouns to: ${pronouness}`)
            pro.set(`id_${message.author.id}.Pronounes`, `${pronouness}`)
        }
    }
    //set the peom they dispaly on their profile to the one of their choosing
    if(cmd === "profiletxt"){
        //get the poem they send by ignoring spaces
        const poem = args.slice(0).join(' ');
        if(poem.length >= 1024){
            message.reply("please make it shorter so discord will allow it to embed!")
        }
        db.set(`id_${message.author.id}.poem`, `${poem}`);
        message.channel.send(`set your profile txt to: ${poem}`)
    };

    if(cmd === "profile"){
        //check to see if they mentioned someone in their message if not then we go by the author of the message
        if(!message.mentions.users.first()) var user = message.author
        else var user = message.mentions.users.first()
        //check to see AGE is set in our db
        if(age.has(`id_${user.id}.age`) === false){
            age.set(`id_${user.id}`, { age: "n/a"});
        }
        //check to see if they have set a poem they wanan display
        if(db.has(`id_${user.id}.poem`) === false){
            db.set(`id_${user.id}.poem`, "No profile text added." );
        }
        if(pro.has(`id_${user.id}.Pronounes`) === false){
            pro.set(`id_${user.id}`, { Pronounes: "n/a"})
        }
        if(!user.avatarURL()){
            var avip = "https://cdn.discordapp.com/attachments/715766428057469010/961775382359576666/unknown.png"
        } else {
            var avip = user.avatarURL()
        }
        if(xp.has(`id_${user.id}`) === false){
            xp.set(`id_${user.id}`, { xp: "1"})
        }
        var xp2 = JSON.stringify(xp.get(`id_${user.id}`))
        var xp1 = JSON.parse(xp2)
        //the magic embed
        let embed = new MessageEmbed()
            .setTitle(`${user.username}'s Profile`)
            .setThumbnail(`${avip}`)
            .setColor('#861A03')
            .addField("Age", `${age.get(`id_${user.id}.age`)}`, true)
            .addField("pronouns", `${pro.get(`id_${user.id}.Pronounes`)}`, true)
            .addField("About me", `${db.get(`id_${user.id}.poem`)}`)
            .setFooter({ text: `${client.user.username}`, iconURL: client.user.avatarURL()});
        if(user.id === "270673291411324929" || user.id === "123858285613809665"){
            embed.addField("Owner", "true", true)
            embed.addField("Xp", `${xp1.xp}`, true)
        }
        if(merrydb.has(`id_${user.id}`) === true){
            embed.addField("married to", `<@!${merrydb.get(`id_${user.id}.to`)}>`)
        }
        message.channel.send({embeds: [embed]});
    }

    //dev command
    if(cmd === "listdb"){
        if(message.author.id != "270673291411324929") return;
        var msg1 = db.all()
        var msg2 = JSON.stringify(msg1)
        message.channel.send("db db :" + msg2)
        var msg3 = xp.all()
        var msg4 = JSON.stringify(msg3)
        message.channel.send("xp db :" + msg4)
        var msg5 = pro.all()
        var msg6 = JSON.stringify(msg5)
        message.channel.send("pro db :" + msg6)
        var msg7 = age.all()
        var msg8 = JSON.stringify(msg7)
        message.channel.send("age db :" + msg8)
        var msg9 = merrydb.all()
        var msg10 = JSON.stringify(msg9)
        message.channel.send("mrry db :" + msg10)
    } 

    //we set the prefix of our bot by the user imputing their own prefix
    if(cmd === "setprefix"){
        //if(!args[0]) return message.reply("you must specify a prefix!")
        if(!args[0]) return message.reply("my prefix cannot be empty");
        if(args[0].length >= 2) return message.reply("my prefix cannot be over 1 character");
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("insuficient permissions for that command")
        db.set(`gid_${message.guildId}`, { prefix: `${args[0]}`})
        //to confirm the prefix was updated
        message.channel.send(`my prefix is now: ${db.get(`gid_${message.guildId}.prefix`)}`);
    };
    if(cmd === "marry"){
        var user =  message.mentions.users.first();
        if(user.id = client.user.id){
            if(message.author.id === "260421156643799053"){

                message.reply("of course bb :)")
                merrydb.set(`id_${message.author.id}`, {to: `${client.user.id}`})
                merrydb.set(`id_${client.id}`, {to: `${message.author.id}`})
                return;
                
            } else {
                message.reply("im already taken!")
                return;
            };
            
        }
        if(!user) return message.reply("you must ping someone to use this command");

        if(merrydb.has(`id_${message.author.id}`)) return message.channel.send("you must divorce before you can remarry");

        message.reply(`do you, ${message.mentions.users.first()} take, ${message.author} as your signifigant other, yes/no`)

        const filter = m => m.author.id === user.id
        const collector = message.channel.createMessageCollector({filter})

        collector.on('collect', m => {
            if(!m.author.id === user.id) return;
            if(m.content === "yes"){
                merrydb.set(`id_${message.author.id}`, {to: `${m.author.id}`})
                merrydb.set(`id_${m.author.id}`, {to: `${message.author.id}`})
                message.channel.send("i now wed thee")
            } else {
                message.reply("i only respond to yes so you just got turned down my guy/gal/it /shrug")
            }
            collector.stop({ reason: "worked"})
        })
    }
    if(cmd === "help"){
        let embed = new MessageEmbed()
            .addField("cmd: Profiletxt", "allows the user to set the abount me text of their profile")
            .addField("cmd: Pronouns", "allows the user to set profile pronouns")
            .addField("cmd: Age", "allows the user to set their age")
            .addField("cmd: Marry", "marrying of another user, they must accept for you to be considered married. The other user will apear on eachothers profiles")
            .addField("cmd: Divorce", "divorces your married partner removing them from your profile  [WIP]")
            .addField("cmd: Setprefix", "sets the bots prefix for the current server")
        message.channel.send({embeds: [embed]})
    }
    if(cmd === "divorce"){
        if(message.author.id === "123858285613809665" | message.author.id === "260421156643799053"){
            message.reply("no")
            return;
        };
        if(merrydb.has(`id_${message.author.id}`) === true){
            message.reply("are you sure u wanna do that partner?")
            //const filter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector()
            collector.on('collect', m =>{
                if(m.author.id != message.author.id) return console.log("cump");
                if(m.content = "yes"){
                    m.reply(`i now divorce <@!${m.author.id}> and <@!` + merrydb.get(`id_${message.author.id}.to` + ">"))
                    merrydb.delete('id_'+ merrydb.get(`id_${message.author.id}.to`))
                    merrydb.delete(`id_${m.author.id}`)
                    
                } else {
                    return;
                }
                collector.stop({ reason: "worked"})
            })
        } else {
            message.reply("you must be married to divorce someone!")
        }
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~admin~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if(cmd === "warn"){
        if(message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)){
            if(!args[0]){
                var reason = "cope"
            }
            else{
                var reason = args[0]
            }
            if(!message.mentions.first()) return message.reply('you must ping someone to warn');
            
            punish.set(`id_${message.mentions.first().id}_g${message.guild.id}`, {reason: `${reason}`})

       } else {
        message.reply("you dont have permissions to do this")
       }

       return;
    };
})


//sets the guild default prefix when the bot is added
client.on("guildCreate", async guild => {
    db.set(`gid_${guild.id}`, { prefix: `!`});



})
