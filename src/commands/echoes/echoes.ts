import { CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Command } from '../../types/Command';
import { SupabaseClient } from '@supabase/supabase-js';

export const EchoesLeft = (dbClient: SupabaseClient): Command => ({
    name: 'echoes-left',
    description: 'Number of Echoes left',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        const content = await getEchoesLeft(dbClient);

        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
});

const getEchoesLeft = async (dbClient: SupabaseClient): Promise<string | undefined> => {
    try {
        const { data } = await dbClient.from('stats').select('name, value').eq('name', 'Echoes Left');
        if (data && data.length > 0) {
            const { value } = data[0];
            return value.toString();
        }
    } catch (error) {
        console.error(error);
    }
};
