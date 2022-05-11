const db = require("quick.db")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('text')
		.setDescription('set your profile text!')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
		const text = interaction.options.getString('input');
		
        if(text.length >= 1024){
            interaction.reply("please make it shorter so discord will allow it to embed!")
            return;
        }
        db.set(`id_${interaction.user.id}.poem`, `${text}`)
        interaction.reply({
            content: `text has been set!`,
            ephemeral: true
        })
	},
};