import { expect, describe, it, vi, beforeEach } from 'vitest';
import { EchoesLeft } from './echoes';
import { CommandInteraction } from 'discord.js';
import { SupabaseClient } from '@supabase/supabase-js';

vi.mock('discord.js', async (importOriginal) => {
    const mod = await importOriginal<typeof import('discord.js')>();
    return {
        ...mod,
        CommandInteraction: vi.fn(),
    };
});

vi.mock('@supabase/supabase-js', async (importOriginal) => {
    const mod = await importOriginal<typeof import('@supabase/supabase-js')>();
    return {
        ...mod,
        SupabaseClient: vi.fn(),
    };
});

let interaction: CommandInteraction;
let mockDbClient: SupabaseClient;

beforeEach(() => {
    interaction = {
        followUp: vi.fn(),
    } as unknown as CommandInteraction;

    mockDbClient = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: [{ value: '123' }] }),
    } as unknown as SupabaseClient;
});

describe('echoes-left command', () => {
    it('should reply with echoes left', async () => {
        const command = EchoesLeft(mockDbClient);
        await command.run(interaction);
        expect(interaction.followUp).toHaveBeenCalledWith({
            ephemeral: true,
            content: '123',
        });
    });
});
