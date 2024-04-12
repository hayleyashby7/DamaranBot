import { Command } from '../types/Command';
import { Ping } from './ping/ping';
import { Campaign } from './campaign/campaign';

export const Commands: Command[] = [Ping, Campaign];
