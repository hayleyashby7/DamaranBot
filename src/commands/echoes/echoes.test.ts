import { expect, describe, it, vi, beforeEach } from 'vitest';
import { EchoUsed, EchoesLeft } from './echoes';
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

describe('echoe-used command', () => {
    it('should remove one echo and reply with echoes left', async () => {
        await EchoUsed.run(interaction);
        expect(interaction.followUp).toHaveBeenCalledWith({
            ephemeral: true,
            content: 'Echoes now remaining: 122',
        });
    });
});
