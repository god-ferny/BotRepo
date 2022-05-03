const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

const db = require("quick.db")

var xp = new db.table('xp')
var age = new db.table('age')
var pro = new db.table('pro')
var merrydb = new db.table('merrydb')
var punish = new db.table('punishment')


module.exports = {

	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('shows your pretty profile!'),
	async execute(interaction) {

		if (interaction.options.getSubcommand() === 'user') {
			SlashCommandBuilder.addUserOption(option => option.setName('target').setDescription("Select a user!"))

			if(!interaction.options.getUser('target')) var user = interaction.user
			else var user = interaction.options.getUser('target')
	
			if(age.has(`id_${user.id}.age`) === false){
				age.set(`id_${user.id}`, { age: "n/a"})
			}
	
			if(db.has(`id_${user.id}.poem`) === false){
				db.set(`id_${user.id}.poem`, "No profile text added." );
			}
			if(pro.has(`id_${user.id}.Pronounes`) === false){
				pro.set(`id_${user.id}`, { Pronounes: "n/a"})
			}
	
	
			if(!user.avatarURL()){
				var avip = "https://cdn.discordapp.com/attachments/715766428057469010/961775382359576666/unknown.png"
			} else {
				var avip = user.avatarURL()
			}
	
			var xp2 = JSON.stringify(xp.get(`id_${user.id}`))
			var xp1 = JSON.parse(xp2)
	
			let embed = new MessageEmbed()
				.setTitle(`${user.username}'s Profile`)
				.setThumbnail(`${user.displayAvatarURL()}`)
				.setColor('#861A03')
				.addField("Age", `${age.get(`id_${user.id}.age`)}`, true)
				.addField("pronouns", `${pro.get(`id_${user.id}.Pronounes`)}`, true)
				.addField("About me", `${db.get(`id_${user.id}.poem`)}`);
			if(user.id === "270673291411324929" || user.id === "123858285613809665"){
				embed.addField("Owner", "true", true)
				embed.addField("Xp", `${xp1.xp}`, true)
			}
			interaction.reply({embeds: [embed]})
		}
		if (interaction.options.getSubcommand() === 'text') {
			SlashCommandBuilder().addStringOption(option => option.setName('input').setDescription('Enter a string'));

			const poem = interaction.options.getString('input')

			if(poem.length >= 1024){
				interaction.reply({
					content: "your profile text is to big for discord!",
					ephemeral: true
				});
			};
			db.set(`id_${message.author.id}.poem`, `${poem}`);
			interaction.reply({
				content: `I have set your profile text to: ${poem}`
			})

		}	

			
	},
};