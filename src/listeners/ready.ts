import { Client } from 'discord.js';
import { Commands } from '../commands';

export default (client: Client): void => {
    client.once('ready', async () => {
        await client.application?.commands.set(Commands);
        console.log('Journey to Damaran bleep bloop 🤖');
    });
};
