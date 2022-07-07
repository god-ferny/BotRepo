const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('divorce')
		.setDescription('divorce'),
	async execute(interaction) {
		if(await db.has(`id_${interaction.user.id}.so`) === false){
            interaction.reply("you cannot divorce someone you've never merried.")
        }
        await db.delete(`id_${await db.get(`id_${interaction.user.id}.so`)}.so`)
        await db.delete(`id_${interaction.user.id}.so`)
        interaction.reply("you are now divorced")
	},
};