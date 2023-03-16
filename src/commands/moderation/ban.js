const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "no reason provided";
        
        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply(`That user doesn't exist.`);
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply(`You can't ban the server owner`);
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (interaction.member.id === interaction.guild.ownerId) {
            try {
                await targetUser.ban({ reason });
                await interaction.editReply(
                    `User ${targetUser} has been banned from ${interaction.guild.name}`
                )
            } catch (error) {
                console.log(`There was an error (ban.js): ${error}`)
            }
            return;
        }

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`You can't ban someone with an equal or higher rank than you.`);
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`I can't ban this user because they have an equal or higher rank than me.`);
            return;
        }

        try {
            await targetUser.ban({ reason });
            await interaction.editReply(
                `User ${targetUser} has been banned from ${interaction.guild.name}`
            )
        } catch (error) {
            console.log(`There was an error (ban.js): ${error}`)
        }
    },

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
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
}