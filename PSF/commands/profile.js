const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Shows a users profile!'),
	async execute(interaction) {
		const embed = new MessageEmbed()
            .setColor("#800000")
            //.setTitle(`${interaction.user.username}#${interaction.user.discriminator}`)
           // .setThumbnail(interaction.user.displayAvatarURL)
            .setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator }`, iconURL: interaction.user.avatarURL() })
            .setThumbnail(interaction.user.displayAvatarURL())

            if(await db.has(`id_${interaction.user.id}.age`)){
               embed.addField("age", await db.get(`id_${interaction.user.id}.age`), true)
           } else {
               embed.addField('age', "n/a", true)
            }  
            if(await db.has(`id_${interaction.user.id}.pronouns`)){
                embed.addField("pronouns", await db.get(`id_${interaction.user.id}.pronouns`), true)
            } else {
                embed.addField('pronouns', "n/a", true)
            }
            if(await db.has(`id_${interaction.user.id}.so`)){
                embed.addField("merried to", `<@!${await db.get(`id_${interaction.user.id}.so`)}>`)
            }
        interaction.reply({embeds: [embed]})
	},
    
};