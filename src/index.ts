import { Client } from 'discord.js';
import { config } from './config';
import ready from './listeners/ready';
import interactionCreate from './listeners/interactionCreate';

export const client = new Client({
	intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
});

ready(client);
interactionCreate(client);

client.login(config.CLIENT_TOKEN);
