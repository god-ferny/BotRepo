const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('age')
		.setDescription('sets your age for your profile')
		.addIntegerOption(option => option.setName('int').setDescription('enter your age')),
	async execute(interaction) {
		const integer = interaction.options.getInteger('int');
		if(!integer){
			interaction.reply({
				ephemeral: true,
				content: "you must enter an age"
			})
			return;
		} 
		if(integer >=90){
			interaction.reply({
				ephemeral: true,
				content: "you are not that old"
			})
			return;
		} 
		db.set(`id_${interaction.user.id}.age`, `${integer}`)
		interaction.reply({
			ephemeral: true,
			content: `your age has been set to ${await db.get(`id_${interaction.user.id}.age`)}`
		})
	},
};