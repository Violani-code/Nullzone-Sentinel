module.exports = {
    name: 'ping',
    description: 'Pings back!',
    deleted: false,

    callback: (client, interaction) => {
        interaction.reply(`${client.ws.ping}ms`)
    }
}