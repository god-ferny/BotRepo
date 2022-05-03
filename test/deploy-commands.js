const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const clientId = "863141640784576532"


const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken("ODYzMTQxNjQwNzg0NTc2NTMy.YOilSw.sP2RKlEcrpIXNRFivmLCOJMbpzI");

rest.put(Routes.applicationCommands("863141640784576532"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);