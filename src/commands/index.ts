import { Command } from '../types/Command';
import { Ping } from './ping/ping';
import { Campaign } from './campaign/campaign';
import { EchoesLeft } from './echoes/echoes';

export const Commands: Command[] = [Ping, Campaign, EchoesLeft];
