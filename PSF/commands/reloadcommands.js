const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('reloads bot commands'),
	async execute(interaction) {
        if(interaction.user.id != "270673291411324929"){
            interaction.reply({
                ephemeral: true,
                content: "you do not have permission to do this"
            })
        }
        const fs = require('node:fs');
        const path = require('node:path');
        const { REST } = require('@discordjs/rest');
        const { Routes } = require('discord-api-types/v9');
        require('dotenv').config();
        const clientId = '677414285407813632'
        const token = process.env.TOKEN


        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(token);

        rest.put(Routes.applicationCommands(clientId), { body: commands })
            .then(() =>{
                console.log("reloaded commands!")
            })
            .catch(console.error);
        interaction.reply({
            ephemeral: true,
            content: "commands reloaded"
        })
	},
};