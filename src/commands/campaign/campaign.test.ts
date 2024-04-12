import { expect, describe, it, vi, beforeEach } from 'vitest';
import { Campaign } from './campaign';
import { CommandInteraction } from 'discord.js';

vi.mock('discord.js', async (importOriginal) => {
    const mod = await importOriginal<typeof import('discord.js')>();
    return {
        ...mod,
        CommandInteraction: vi.fn(),
    };
});

let interaction: CommandInteraction;

beforeEach(() => {
    interaction = {
        followUp: vi.fn(),
    } as unknown as CommandInteraction;
});

describe('campaign command', () => {
    it('should reply with campaign name', async () => {
        await Campaign.run(interaction);
        expect(interaction.followUp).toHaveBeenCalledWith({
            ephemeral: true,
            content: 'Test Data',
        });
    });
});
