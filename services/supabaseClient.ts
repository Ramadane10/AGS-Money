import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra;

if (!extra?.SUPABASE_URL || !extra?.SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_URL or SUPABASE_ANON_KEY is missing in config');
}



export const supabase = createClient(extra.SUPABASE_URL, extra.SUPABASE_ANON_KEY);
