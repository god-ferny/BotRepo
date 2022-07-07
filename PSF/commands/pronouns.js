const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pronouns')
		.setDescription('sets your profile pronouns')
        .addStringOption(option => option.setName('input').setDescription('Enter your pronouns')),
	async execute(interaction) {
        const pronouns = interaction.options.getString('input');
		if(!pronouns){
            interaction.reply({
                ephemeral: true,
                content: "you must enter your pornouns"
            })
            return;
        }

        if(pronouns.length >= 20){
            interaction.reply({
                ephemeral: true,
                content: "you pronouns cannot be that long"
            })
            return;
        }
        db.set(`id_${interaction.user.id}.pronouns`, `${pronouns}`)
        interaction.reply({
            ephemeral: true,
            content: `set your pronouns to ${await db.get(`id_${interaction.user.id}.pronouns`)}`
        })
	},
};