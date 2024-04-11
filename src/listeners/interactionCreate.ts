import { Client, Interaction, CommandInteraction } from 'discord.js';
import { Commands } from '../commands';

export default (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (!interaction.isCommand()) {
			return;
		}

		await handleCommand(interaction);
	});
};

const handleCommand = async (interaction: CommandInteraction) => {
	const validCommand = Commands.find((command) => command.name === interaction.commandName);
	if (!validCommand) {
		interaction.followUp({ content: 'An error has occurred' });
		return;
	}

	await interaction.deferReply();

	return validCommand.run(interaction);
};
