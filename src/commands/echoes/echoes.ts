import { CommandInteraction, ApplicationCommandType } from 'discord.js';
import { dbClient } from '../../services/dbClient';
import { Command } from '../../types/Command';

export const EchoesLeft: Command = {
    name: 'echoes-left',
    description: 'Number of Echoes left',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        const content = await getEchoesLeft();

        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
};

const getEchoesLeft = async () => {
    const { data, error } = await dbClient.from('stats').select('value').eq('name', 'Echoes Left');
    if (error !== null) console.error(error);
    if (data !== null) return data.toString();
    else return 'No data';
};
