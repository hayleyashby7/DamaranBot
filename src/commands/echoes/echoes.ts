import { CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Command } from '../../types/Command';
import { dbClient, dbConfig } from '../../services/dbClient';
import { AxiosResponse } from 'axios';

export const ECHOES_LEFT = 'EchoesLeft';

export const EchoesLeft: Command = {
    name: 'echoes-left',
    description: 'Number of Echoes left',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        try {
            const content = await getEchoesLeft();
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
};

export const EchoUsed: Command = {
    name: 'echo-used',
    description: 'Updates number of echoes used',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        try {
            const content = await setEchoUsed();
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
};

const getEchoesLeft = async (): Promise<string> => {
    const result: AxiosResponse = await dbClient.get(`/stats?name=eq.${ECHOES_LEFT}`, dbConfig);

    const value: number = result.data.data.value;

    return value
        ? value.toString()
        : (() => {
              throw new Error('No data');
          })();
};

const setEchoUsed = async (): Promise<string> => {
    const currentEchoes = Number(await getEchoesLeft());
    const updatedEchoes = currentEchoes - 1;

    const result: AxiosResponse = await dbClient.patch(
        `/stats?name=eq.${ECHOES_LEFT}`,
        { value: updatedEchoes },
        dbConfig,
    );

    const value: number = result.data.data.value;

    return value
        ? `Echoes now remaining: ${value.toString()}`
        : (() => {
              throw new Error('No data');
          })();
};
