const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('marry')
		.setDescription('Marry that special person!'),
	async execute(interaction) {
        var wip = true
        if(wip = true) return interaction.reply("WIP!");
        
		
		


	},
};