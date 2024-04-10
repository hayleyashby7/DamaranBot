import { expect, describe, it, vi, beforeEach } from 'vitest';
import { Ping } from './ping';
import { CommandInteraction } from 'discord.js';

vi.mock('discord.js', async (importOriginal) => {
	const mod = await importOriginal<typeof import('discord.js')>();
	return {
		...mod,
		CommandInteraction: vi.fn(),
	};
});

const COMMAND_REPLY = 'Pong!';

let interaction: CommandInteraction;

beforeEach(() => {
	interaction = {
		followUp: vi.fn(),
	} as unknown as CommandInteraction;
});

describe('ping command', () => {
	it('should reply with Pong!', () => {
		Ping.run(interaction);
		expect(interaction.followUp).toHaveBeenCalledWith({
			ephemeral: true,
			content: COMMAND_REPLY,
		});
	});
});
