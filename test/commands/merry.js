const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("quick.db")
var merrydb = new db.table('merrydb')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('marry')
		.setDescription('Marry that special person!')
		.addUserOption(option => option.setName('target').setDescription("Select a user!")),
	async execute(interaction) {
        var wip = true
        if(wip = true) return interaction.reply("WIP!");
        
		
		if(!interaction.options.getUser('target') || interaction.options.getUser('target') === interaction.author){
			interaction.reply("you cant merry yourself!")
			return;
		};

		if(merrydb.get(`id_${interaction.user.id}.status`) === true){
			interaction.reply("you cannot merry before getting a divorce.")
			return;
		};

		

	},
};