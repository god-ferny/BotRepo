const { Client, Intents,  MessageActionRow, MessageButton, MessageEmbed  } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
//gotta get our config
require('dotenv').config();


//prefix can be whatever
const prefix = ">";

client.login(process.env.token);
//bot token for logging in

client.on("ready", () => {
    console.log("bot started");
});

//this is when the bot gets a message
client.on("messageCreate", async message => {
    if(message.content.startsWith("!button")){
        if(message.author.id != "270673291411324929") return;
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary1')
					.setLabel('button')
					.setStyle('PRIMARY'),
			);

        await message.channel.send({ content: 'press the button', components: [row] })
        
       
    }
    
    if(message.content === "*roles"){
        var row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('role1')
                    .setLabel('role menu')
                    .setStyle('DANGER'),
            );
        await message.channel.send({content: 'welcome to the role menu!', ephemeral: true, components: [row2]})
        message.delete();
    }
});
client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
    if(interaction.customId === "primary1"){
        interaction.reply({ content: `<@${interaction.user.id}> got fucking creamed`})
    };
	if(interaction.customId === "role1"){
        const embed = new MessageEmbed()
            .setColor('#6b0004')
            .setTitle('Red Colors')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription("The Role Menu is an interactive menu to asign roles and colors to yourself \n press the right arrow to go forward a page and the left arrow to go back")


            const row2 = new MessageActionRow()
			.addComponents(
                new MessageButton()
                    .setCustomId('page2')
                    .setLabel('->')
                    .setStyle('PRIMARY')
			);


            interaction.reply({embeds: [embed], ephemeral: true, components: [row2]})
    }
    if(interaction.customId === 'role2'){
        var role = client.guilds.cache.find(guild => guild.id === "517779789042417664").roles.cache.find(role => role.name === "red");
        if(interaction.member.roles.cache.some((role) => role.name === "red")){
            interaction.member.roles.remove(role)
            interaction.reply({content: 'red has been removed', ephemeral: true})
        } else {
        interaction.member.roles.add(role);
        interaction.reply({content: 'red has been added', ephemeral: true})
        }
    }
    if(interaction.customId === 'role3'){
        var role = client.guilds.cache.find(guild => guild.id === "517779789042417664").roles.cache.find(role => role.name === "blue");
        if(interaction.member.roles.cache.some((role) => role.name === "blue")){
            interaction.member.roles.remove(role)
            interaction.reply({content: 'blue has been removed', ephemeral: true})
        } else {
        interaction.member.roles.add(role);
        interaction.reply({content: 'blue has been added', ephemeral: true})
        }
    }
    if(interaction.customId === 'role4'){
        var role = client.guilds.cache.find(guild => guild.id === "517779789042417664").roles.cache.find(role => role.name === "green");
        if(interaction.member.roles.cache.some((role) => role.name === "green")){
            interaction.member.roles.remove(role)
            interaction.reply({content: 'green has been removed', ephemeral: true})
        } else {
        interaction.member.roles.add(role);
        interaction.reply({content: 'green has been added', ephemeral: true})
        }
    }
    if(interaction.customId === 'role5'){
        var role = client.guilds.cache.find(guild => guild.id === "517779789042417664").roles.cache.find(role => role.name === "yellow");
        if(interaction.member.roles.cache.some((role) => role.name === "yellow")){
            interaction.member.roles.remove(role)
            interaction.reply({content: 'yellow has been removed', ephemeral: true})
        } else {
        interaction.member.roles.add(role);
        interaction.reply({content: 'yellow has been added', ephemeral: true})
        }
    }
    if(interaction.customId === 'page2'){
        const embed = new MessageEmbed()
            .setColor('#6b0004')
            .setTitle('page 2 test')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription('This is the first set of roles, our green, yellow, and blue!')
            .addFields(
            {name: 'Leaf', value: `🌿`, inline: true},
            {name: '|--|', value: `|--|`, inline: true},
            {name: 'Honey', value: `🍯`, inline: true},
            {name: '|--|', value: `|--|`, inline: true},
            {name: 'Ocean', value: `🌊`, inline: true},
            {name: '|--|', value: `|--|`, inline: true},
        );

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('role1')
                .setLabel('<-')
                .setStyle('PRIMARY'),

            new MessageButton() 
                .setCustomId('role4')
                .setLabel('Leaf 🌿')
                .setStyle('PRIMARY'),
            
            new MessageButton()
                .setCustomId('role5')
                .setLabel('Honey 🍯')
                .setStyle('PRIMARY'),

            new MessageButton()
                .setCustomId('role3')
                .setLabel('Ocean 🌊')
                .setStyle('PRIMARY'),



            new MessageButton()
                .setCustomId('page3')
                .setLabel('->')
                .setStyle('PRIMARY'),

        );

        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
    }
    if(interaction.customId === 'page3'){
        const embed = new MessageEmbed()
            .setColor('#6b0004')
            .setTitle('page 3 test')
            .setAuthor(client.user.username, client.user.avatarURL)
            .addFields(
            {name: 'Rose', value: `🌹`, inline: true},

        );

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('page2')
                .setLabel('<-')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('role2')
                .setLabel("Rose 🌹")
                .setStyle('PRIMARY'),





        );

        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
    }
});