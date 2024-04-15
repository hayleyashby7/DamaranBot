import { CommandInteraction, ChatInputApplicationCommandData } from 'discord.js';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Command extends ChatInputApplicationCommandData {
    run: (interaction: CommandInteraction, dbClient?: SupabaseClient) => void;
}
