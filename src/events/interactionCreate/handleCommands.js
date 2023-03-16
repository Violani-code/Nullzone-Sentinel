const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
        
        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only the developers are currently allowed to use this command',
                    ephemeral: true,
                })
                return;
            }
        }
        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: 'This command is currently in its testing phase',
                    ephemeral: true,
                })
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'You do not have the required permissions',
                        ephemeral: true,
                    })
                    return;
                }
            }
        }
        if (commandObject.botPermissions?.lenght) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: 'The bot has insufficient permissions',
                        ephemeral: true,
                    })
                    return;
                }
            }
        }
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error (handleCommands): ${error}`)
    }
}