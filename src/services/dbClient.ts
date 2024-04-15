import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import { Database } from '../types/database.types';

const DB_URL = 'https://sgfgpsxpmsplzwnqzgrh.supabase.co';

export const dbClient = createClient<Database>(DB_URL, config.DB_TOKEN);
