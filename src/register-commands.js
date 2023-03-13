require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'ping',
        description: 'pong',
    },


    {
        name: 'add',
        description: 'adds 2 numbers',
        options: [
            {
                name: 'first-number',
                description: 'the first number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two',
                        value: 2,
                    },
                    {
                        name: 'three',
                        value: 3,
                    },
                ],
                required: true,
            },
            {
                name: 'seccond-number',
                description: 'the seccond number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },

    {
        name: 'embed',
        description: 'sends an embed',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Slash commands were registered successfully.');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();