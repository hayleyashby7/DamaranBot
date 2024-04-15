import { CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Command } from '../../types/Command';
import { SupabaseClient } from '@supabase/supabase-js';

const ECHOES_LEFT = 'Echoes Left';

export const EchoesLeft = (dbClient: SupabaseClient): Command => ({
    name: 'echoes-left',
    description: 'Number of Echoes left',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        try {
            const content = await getEchoesLeft(dbClient);
            await interaction.followUp({
                ephemeral: true,
                content,
            });
        } catch (error) {
            console.error(error);
            await interaction.followUp({
                ephemeral: true,
                content: 'An error occurred while getting the number of echoes left.',
            });
        }
    },
});

export const EchoUsed = (dbClient: SupabaseClient): Command => ({
    name: 'echo-used',
    description: 'Updates number of echoes used',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        try {
            const content = await setEchoUsed(dbClient);
            await interaction.followUp({
                ephemeral: true,
                content,
            });
        } catch (error) {
            console.error(error);
            await interaction.followUp({
                ephemeral: true,
                content: 'An error occurred while updating the number of echoes used.',
            });
        }
    },
});

const getEchoesLeft = async (dbClient: SupabaseClient): Promise<string> => {
    const { data } = await dbClient.from('stats').select('name, value').eq('name', ECHOES_LEFT);
    if (data && data.length > 0) {
        const { value } = data[0];
        return value.toString();
    }
    throw new Error('No data');
};

const setEchoUsed = async (dbClient: SupabaseClient): Promise<string> => {
    const currentEchoes = Number(await getEchoesLeft(dbClient));
    const updatedEchoes = currentEchoes - 1;

    const { data } = await dbClient.from('stats').update({ value: updatedEchoes }).eq('name', ECHOES_LEFT).select();

    if (data && data.length > 0) {
        const { value } = data[0];
        return `Echoes now remaining: ${value}`;
    }
    throw new Error('Unable to update echoes');
};
