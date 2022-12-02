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
                embed.addFields({ name: 'age', value: await db.get(`id_${user.id}.age`), inline: true})
                
           } else {
               embed.addFields({ name: 'age', value: "n/a", inline: true})
            }  
            if(await db.has(`id_${user.id}.pronouns`)){
                embed.addFields({ name: "pronouns", value: await db.get(`id_${user.id}.pronouns`), inline: true })
            } else {
                embed.addFields({name: 'pronouns',value: "n/a", inline: true})
            }
            if(await db.has(`id_${user.id}.so`)){
                embed.addFields({ name: "merried to", value: `<@!${await db.get(`id_${user.id}.so`)}>`})
            }
        interaction.reply({embeds: [embed]})
	},
    
};