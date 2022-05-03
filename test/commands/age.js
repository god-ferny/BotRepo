const { SlashCommandBuilder } = require('@discordjs/builders');

const db = require('quick.db')
var age = new db.table('age')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('age')
		.setDescription('set your age!')
        .addNumberOption(option => option.setName('num').setDescription('Enter a number')),
	async execute(interaction) {
        const number = interaction.options.getNumber('num');

		if(!number) return interaction.reply({
            content: "your age must be a number!",
            ephemeral: true
        });

		if(number >= 50){
            interaction.reply({
                content: "why are you on discord?",
                ephemeral: true
            })
            return;
        };
        

        age.set(`id_${interaction.user.id}`, { age: `${number}`})
        interaction.reply({
            content: `your age has been set to ${number}`,
            ephemeral: true
        })
	},
};