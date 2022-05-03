const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed, ClientPresence, Permissions, ReactionUserManager, Application, Collection } = require('discord.js'); //NOTE: Try to remember this 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('node:fs');

//gotta get our config 
require('dotenv').config();
//new things i wanna try
const db = require("quick.db");
process.stdout.write("loading this may take a sec!")

var xp = new db.table('xp')
var age = new db.table('age')
var pro = new db.table('pro')
var merrydb = new db.table('merrydb')
var punish = new db.table('punishment')


client.once("ready", () => {
    console.clear()
    console.log("loaded");

    process.stdout.write(
        `                                                                    
        @@@@@@ @@@  @@@  @@@@@@  @@@  @@@  @@@ @@@@@@@@ @@@@@@@@ @@@      @@@      
        !@@     @@!@!@@@ @@!  @@@ @@!  @@!  @@! @@!      @@!      @@!      @@!      
         !@@!!  @!@@!!@! @!@  !@! @!!  !!@  @!@ @!!!:!   @!!!:!   @!!      @!!      
            !:! !!:  !!! !!:  !!!  !:  !!:  !!  !!:      !!:      !!:      !!:      
        ::.: :  ::    :   : :. :    ::.:  :::    :       : :: ::  : ::.: : : ::.: :
        `)
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on("messageCreaten", message =>{
	
    if(xp.has(`id_${message.author.id}`) === false){
        xp.set(`id_${message.author.id}`, { xp : 1})
    }

	xp.add(`id_${message.author.id}.xp`, 1)

    

})

client.login(process.env.TOKEN)


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});