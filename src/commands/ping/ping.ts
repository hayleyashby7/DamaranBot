import { CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Command } from '../../types/Command';

export const Ping: Command = {
	name: 'ping',
	description: 'Replies with Pong!',
	type: ApplicationCommandType.ChatInput,
	run: async (interaction: CommandInteraction) => {
		const content = 'Pong!';

		await interaction.followUp({
			ephemeral: true,
			content,
		});
	},
};
