import { Command } from '../types/Command';
import { Ping } from './ping/ping';
import { Campaign } from './campaign/campaign';
import { EchoesLeft, EchoUsed } from './echoes/echoes';
import { dbClient } from '../services/dbClient';

export const Commands: Command[] = [Ping, Campaign, EchoesLeft(dbClient), EchoUsed(dbClient)];
