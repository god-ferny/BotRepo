const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pronouns')
		.setDescription('sets profile pronouns')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
		const text = interaction.options.getString('input');

        if(text.length >= 25){
            interaction.reply({
                content: "your fucking pronouns aren't the size of the moon you donky balls licker cock",
                ephemeral: true
            })
        }
		
	},
};