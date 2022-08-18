const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		interaction.reply("pong");
	},
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bing')
		.setDescription('Replies with Bong!'),
	async execute(interaction) {
		interaction.reply("bong")
	},
};