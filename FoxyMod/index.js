const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//gotta get our config
require('dotenv').config();


//prefix can be whatever
const prefix = ">";

client.login(process.env.TOKEN);
//bot token for logging in

client.on("ready", () => {
    console.log("bot started");
    client.user.setActivity("over my friends", {
        type: "WATCHING",
        url: "https://bloodrose.net"
    })
});

//this is when the bot gets a message
client.on("messageCreate", async message => {
    //
    if (message.content === "!d bump") {
        message.channel.send("thank you for your bump!").then(msg => {
            setTimeout(function () {
                message.channel.send("<@&916888170044489808>")
            }, 7200000);
        })
    };

    if (message.content === "123verify") {
        if (message.guild.id != "653748158115086336") return console.log(message.guild.name)
        let embed = new MessageEmbed()
            .setTitle("Summit Verification")
            .addField("Info", `To enter ${message.guild.name} please react to the button below!`)
            .setThumbnail(message.guild.iconURL())
            .setColor("DARK_BLUE")
        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("verify")
                    .setLabel("Verify!")
                    .setStyle("PRIMARY")
            )
        await message.channel.send({ embeds: embed, components: [row] })
        message.delete();
    }
    if (message.content === "9roles") {
        if (!message.member.permissions.has("MANAGE_ROLES")) return;



        if (message.guild.id === "653748158115086336") {
            //sumit section
            var color1 = "#0c00b8"
            let embed = new MessageEmbed()
                .setTitle(`${message.guild.name}'s role menu`)
                .addField("Access", `To Access the ${message.guild.name} role menu please press the button below`)
                .setThumbnail(message.guild.iconURL())
                .setColor("DARK_BLUE")
            let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('role1')
                        .setLabel('role menu')
                        .setStyle('DANGER'),
                );
            await message.channel.send({ embeds: [embed], ephemeral: true, components: [row] })
            message.delete();

        } else {
            //other servers
            var color1 = "#0c00b8"
            let embed = new MessageEmbed()
                .setTitle(`${message.guild.name} has no role menu created for ${client.user.username}`)
                .addField("Access", `to make a menu please contact <@270673291411324929>`)
                .setThumbnail(message.guild.iconURL())
                .setColor(color1)
            await message.channel.send({ embeds: [embed], ephemeral: true })
            message.delete();
        }

    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton === true) {

    }
})

client.on('interactionCreate', async interaction => {

    if (interaction.customId === "role1") {
        await interaction.deferReply({ ephemeral: true });
        let embed = new MessageEmbed()
            .setColor('#6b0004')
            .setTitle(`${interaction.guild.name}'s roles`)
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription("The Role Menu is an interactive menu to asign roles to yourself \n Press the Catagory you wanna see!")
            .addField("Space", "All Space Games like Elite Dangerous, Space Engineers, Deep Rock Galatic, Stellaris, and Destiny 2")
            .addField("Others 1", "Skyrim, Valhiem, Minecraft Vanilla, Minecraft Modded, and Sea OF Theives ")
            .addField("Others 2", "D&D, Arma, Day-Z, and Vr User")
        let row2 = new MessageActionRow()
            .addComponents(

                new MessageButton()
                    .setCustomId('Space')
                    .setLabel('Space ->')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('page2')
                    .setLabel('Others 1 ->')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('page3')
                    .setLabel('Others 2 ->')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('roles list')
                    .setLabel("Display Roles")
                    .setStyle("DANGER"),
            );

        await interaction.followUp({ embeds: [embed], ephemeral: true, components: [row2] })
    }
    if (interaction.customId === "roles list") {
        //  await interaction.deferReply({ ephemeral: true });
        let rolemap = interaction.member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(", ")
        if (rolemap.length > 1024) rolemap = "i cant display all of these";
        if (!rolemap) rolemap = "none";
        let embed = new MessageEmbed()
            .setTitle("Role Map")
            .setAuthor(interaction.guild.name)
            .setThumbnail(interaction.guild.iconURL())
            .addField("Roles that you have", rolemap)
        await interaction.followUp({ embeds: [embed], ephemeral: true })
    }
    if (interaction.customId === 'Space') {
        // await interaction.deferReply({ ephemeral: true });
        let embed = new MessageEmbed()
            .setColor('#6b0004')
            .setTitle('Space Games')
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription('Welcome to space! its kinda cold out here ')
            .addFields(
                { name: 'Elite Dangerous', value: `🌌 `, inline: true },
                { name: '|--|', value: `|--|`, inline: true },
                { name: 'Stellaris', value: `🌃`, inline: true },
                { name: '|--|', value: `|--|`, inline: true },
                { name: 'Space Engineers', value: `🚀`, inline: true },
                { name: '|--|', value: `|--|`, inline: true },
                { name: 'DEEP Rock Galatic', value: `🪐`, inline: true },
                { name: '|--|', value: `|--|`, inline: true },
                { name: 'Destiny 2', value: `🔫`, inline: true }
            );

        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ED')
                    .setLabel('ED 🌌')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('Stellaris')
                    .setLabel('Stellaris 🌃')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('SE')
                    .setLabel('Space Engineers 🚀')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('DRG')
                    .setLabel('Deep Rock Galatic 🪐')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('D2')
                    .setLabel('Destiny 2 🔫')
                    .setStyle('PRIMARY'),

            );

        await interaction.update({ embeds: [embed], ephemeral: true, components: [row] })
    }
    if (interaction.customId === 'page2') {
        // await interaction.deferReply({ ephemeral: true });

        let embed = new MessageEmbed()
            .setColor('#6b0004')
            .setTitle('Other Games')
            .setDescription("This is for the other games that are not space")
            .setAuthor(client.user.username, client.user.avatarURL)
            .addFields(
                { name: 'Skyrim', value: `⚔️`, inline: true },
                { name: '|--|', value: '|--|', inline: true },
                { name: 'Valhiem', value: `🛡️`, inline: true },
                { name: '|--|', value: '|--|', inline: true },
                { name: 'Minecraft Vanilla', value: '🍦', inline: true },
                { name: '|--|', value: '|--|', inline: true },
                { name: 'Minecraft Modded', value: '🍨', inline: true },
                { name: '|--|', value: '|--|', inline: true },
                { name: 'Sea Of Thieves', value: '⛵', inline: true },
            );
        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Skyrim')
                    .setLabel('Skyrim ⚔️')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('Valhiem')
                    .setLabel("Valhiem 🛡️")
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('Vanilla')
                    .setLabel("Minecraft Vanilla 🍦")
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('Modded')
                    .setLabel("Minecraft Modded 🍨")
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('SOT')
                    .setLabel("Sea Of Thieves ⛵")
                    .setStyle('PRIMARY'),
            );

        await interaction.update({ embeds: [embed], ephemeral: true, components: [row] })
    }
    if (interaction.customId === 'page3') {
        // await interaction.deferReply({ ephemeral: true });

        let embed = new MessageEmbed()
            .setColor('#6b0004')
            .setTitle('Other Games 2')
            .setDescription("This is for the third row of games")
            .setAuthor(client.user.username, client.user.avatarURL)
            .addFields(
                { name: 'D&D', value: `🎲`, inline: true },
                { name: '|--|', value: '|--|', inline: true },
                { name: 'Arma', value: `🩸`, inline: true },
                { name: '|--|', value: '|--|', inline: true },
                { name: 'VR User', value: '💸', inline: true },
                { name: '|--|', value: '|--|', inline: true },
                { name: 'Ark', value: '🦖', inline: true },
            );
        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('DnD')
                    .setLabel('D&D 🎲')
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('arma')
                    .setLabel("Arma 🩸")
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('vruser')
                    .setLabel("VR User 💸")
                    .setStyle('PRIMARY'),

                new MessageButton()
                    .setCustomId('Ark')
                    .setLabel("Ark 🦖")
                    .setStyle('PRIMARY')
            );

        await interaction.update({ embeds: [embed], ephemeral: true, components: [row] })
    }

    if (interaction.customId === 'ED') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Elite Dangerous");
        if (interaction.member.roles.cache.some((role) => role.name === "Elite Dangerous")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Elite Dangerous has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Elite Dangeroushas been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'Stellaris') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Stellaris");
        if (interaction.member.roles.cache.some((role) => role.name === "Stellaris")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Stellaris has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Stellaris been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'SE') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Space Engineers");
        if (interaction.member.roles.cache.some((role) => role.name === "Space Engineers")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Space Engineers has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Space Engineers been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'DRG') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Deep Rock Galactic");
        if (interaction.member.roles.cache.some((role) => role.name === "Deep Rock Galactic")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Deep Rock Galactic has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Deep Rock Galactic been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'D2') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Destiny 2");
        if (interaction.member.roles.cache.some((role) => role.name === "Destiny 2")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Destiny 2 has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            interaction.followUp({ content: 'Destiny 2 been added', ephemeral: true })
        }
    }
    //-----------------------------------------------------------------------------
    if (interaction.customId === 'Skyrim') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Skyrim");
        if (interaction.member.roles.cache.some((role) => role.name === "Skyrim")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Skyrim has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Skyrim been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'Valhiem') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Valheim");
        if (interaction.member.roles.cache.some((role) => role.name === "Valheim")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Valheim has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Valheim been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'Vanilla') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Vanilla");
        if (interaction.member.roles.cache.some((role) => role.name === "Vanilla")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Minecraft Vanilla has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Minecraft Vanilla been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'Modded') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Modded");
        if (interaction.member.roles.cache.some((role) => role.name === "Modded")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Minecraft Modded has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Minecraft Modded been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'SOT') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Sea Of Thieves");
        if (interaction.member.roles.cache.some((role) => role.name === "Sea Of Thieves")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Sea Of Thieveshas been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Sea Of Thieves been added', ephemeral: true })
        }
    }
    //-----------------------------------------------------------------------------
    if (interaction.customId === 'DnD') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "D&DNerd");
        if (interaction.member.roles.cache.some((role) => role.name === "D&DNerd")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'D&DNerd has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'D&DNerd been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'arma') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Arma");
        if (interaction.member.roles.cache.some((role) => role.name === "Arma")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Arma has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Arma been added', ephemeral: true })
        }
    }
    if (interaction.customId === 'vruser') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "VR User");
        if (interaction.member.roles.cache.some((role) => role.name === "VR User")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'VR User has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'VR User added', ephemeral: true })
        }
    }
    if (interaction.customId === 'dayz') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Day-Z");
        if (interaction.member.roles.cache.some((role) => role.name === "Day-Z")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Day-Z has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Day-Z added', ephemeral: true })
        }
    }
    if (interaction.customId === 'Ark') {
        await interaction.deferReply({ ephemeral: true });

        var role = client.guilds.cache.find(guild => guild.id === interaction.guild.id).roles.cache.find(role => role.name === "Ark: Survival Evolved");
        if (interaction.member.roles.cache.some((role) => role.name === "Ark: Survival Evolved")) {
            interaction.member.roles.remove(role)
            await interaction.followUp({ content: 'Ark! has been removed', ephemeral: true })
        } else {
            interaction.member.roles.add(role);
            await interaction.followUp({ content: 'Ark! added', ephemeral: true })
        }
    }

});
