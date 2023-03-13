require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`Welcome back! The application <${c.user.tag}> has launched.\nThis application is owned and hosted by Violani#2494`);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName);

    if (interaction.commandName === 'hey') {
        interaction.reply('hey');
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('pong');
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('seccond-number').value;

        interaction.reply(`the sum is ${num1 + num2}`)
    }

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Embed title')
            .setDescription('Embed description')
            .setColor('Random')
            .addFields({
                name: 'field title',
                value: 'some random value',
                inline: true,
            },
            {
                name: 'field 2 title',
                value: 'another random value',
                inline: true,
            }
            )

        interaction.reply({ embeds: [embed] });
    }
})

client.login(process.env.TOKEN);