const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Shows a users profile!')
        .addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction) {
        var user = interaction.options.getUser('target');
        if(!user) var user = interaction.user
		const embed = new MessageEmbed()
            .setColor("#800000")
            //.setTitle(`${interaction.user.username}#${interaction.user.discriminator}`)
           // .setThumbnail(interaction.user.displayAvatarURL)
            .setAuthor({ name: `${user.username}#${user.discriminator }`, iconURL: user.avatarURL() })
            .setThumbnail(user.displayAvatarURL())

            if(await db.has(`id_${user.id}.age`)){
               embed.addField("age", await db.get(`id_${user.id}.age`), true)
           } else {
               embed.addField('age', "n/a", true)
            }  
            if(await db.has(`id_${user.id}.pronouns`)){
                embed.addField("pronouns", await db.get(`id_${user.id}.pronouns`), true)
            } else {
                embed.addField('pronouns', "n/a", true)
            }
            if(await db.has(`id_${user.id}.so`)){
                embed.addField("merried to", `<@!${await db.get(`id_${user.id}.so`)}>`)
            }
        interaction.reply({embeds: [embed]})
	},
    
};