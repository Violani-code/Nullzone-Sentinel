const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;

        await interaction.deferReply();

        const targetUser = await interaction.guild.bans.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply(`That user doesn't exist.`);
            return;
        }

        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        try {
            // console.log(targetUserId);
            await interaction.guild.bans.remove(targetUserId);
            await interaction.editReply({
                content: `User <@${targetUserId}> has been unbanned from **${interaction.guild.name}**`,
                ephemeral: true,
            });
        } catch (error) {
            console.log(`There was an error (unban.js): ${error}`);
        }
    },

    name: `unban`,
    description: `Unbans specified member`,
    options: [
        {
            name: `target-user`,
            description: `The user you wish to unban.`,
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
            choices: [

            ]
        },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
}