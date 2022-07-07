const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('merry')
		.setDescription('merries you with another user')
        .addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
        if(!user){
            interaction.reply({
                ephemeral: true,
                content: "you must select a user you wish to merry."
            })
            return;
        }
        if(user === interaction.user){
            interaction.reply("you cannot merry yourself")
            return;
        }
        if(await db.has(`id_${interaction.user.id}.so`)){
            interaction.reply("you are already merried")
            return;
        }
        if(await db.has(`id_${user.id}.so`)){
            interaction.reply("that user is already merried");
            return;
        }
        interaction.reply(`does ${user} accept your merrage proposal (make this pretty later)`)
        const filter = m => m.author.id === user.id
        const collector = interaction.channel.createMessageCollector({ filter, time: 3, max: 1});

        collector.on('collect', m => {
            if(m.author.bot) return;
            if(m.author.id != user.id) return;
            if(m.content === "yes"){
                m.reply(`i now pronounce ${user} and ${interaction.user} merried`)
                db.set(`id_${user.id}.so`, `${interaction.user.id}`)
                db.set(`id_${interaction.user.id}.so`, `${user.id}`)
                console.log(db.get(`id_${interaction.user.id}.so`))
            } else {
                m.reply("i only reply to yes to you got rejected!")
            }
            return;
        });
        collector.on("end", () => {
            interaction.channel.send("the answer timer expired")
        })
	},
};