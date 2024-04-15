import { expect, describe, it, vi, beforeEach } from 'vitest';
import { EchoesLeft } from './echoes';
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

describe('echoes-left command', () => {
    it('should reply with echoes left', async () => {
        await EchoesLeft.run(interaction);
        expect(interaction.followUp).toHaveBeenCalledWith({
            ephemeral: true,
            content: '123',
        });
    });
});
