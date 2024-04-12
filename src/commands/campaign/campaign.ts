import { CommandInteraction, ApplicationCommandType } from 'discord.js';
import { AxiosResponse } from 'axios';
import { kankaConfig, kankaClient } from '../../services/kankaClient';
import { Command } from '../../types/Command';

export const Campaign: Command = {
    name: 'campaign',
    description: 'Campaign overview',
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: CommandInteraction) => {
        const content = await getCampaign();

        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
};

const getCampaign = async () => {
    const result: AxiosResponse = await kankaClient.get('campaigns/98451', kankaConfig);
    const campaign: string = result.data.data.name;
    return campaign;
};
