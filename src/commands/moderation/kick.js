const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || 'No reason provided';

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if(!targetUser){
            await interaction.editReply(`That user doesn't exist`);
            return;
        }

        if(targetUser.id === interaction.guild.ownerId){
            await interaction.editReply(`You can't ban the server owner`);
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if(interaction.member.id === interaction.guild.ownerId) {
            try{
                await targetUser.kick({reason});
                await interaction.editReply(`User ${targetUser} has been kicked from ${interaction.guild.name}`);
            }
            catch(error){
                console.log(`There was an error (kick.js): ${error}`);
            }
            return;
        }

        if(targetUserRolePosition >= requestUserRolePosition){
            await interaction.editReply(`You can't kick someone with an equal or higher rank than you.`);
            return;
        }

        if(targetUserRolePosition >= botRolePosition){
            await interaction.editReply(`I can't kick this user because they have an equal or higher rank than me.`);
            return;
        }

        try{
            await targetUser.kick({reason});
            await interaction.editReply(`User ${targetUser} has been kicked from **${interaction.guild.name}**`);
        }
        catch (error) {
            console.log(`There was an error (kick.js): ${error}`);
        }

    },

    name: 'kick',
    description: 'Kicks specified member.',
    options : [
        {
            name: 'target-user',
            description: 'The user you wish to kick.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for the kick',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers]
}