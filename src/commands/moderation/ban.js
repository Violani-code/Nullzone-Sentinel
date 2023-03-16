const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans specified member',
    options: [
        {
            name: 'target-user',
            description: 'The user you wish to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'time',
            description: 'Time for ban',
            type: ApplicationCommandOptionType.Integer,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply(`ban..`);
    }
}