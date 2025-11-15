
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase project URL and anon key.
// It's recommended to use environment variables for this.
const supabaseUrl = process.env.SUPABASE_URL || 'https://xootpnwelrpznlnboxyf.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_gFYLgijSMPj5JIAQMl4-Iw_6Yrq9SGZ';

export let isSupabaseConfigured = true;

// Check for placeholder values
if (supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-supabase-anon-key')) {
    isSupabaseConfigured = false;
}

if (!isSupabaseConfigured) {
    console.error("---");
    console.error("CRITICAL ERROR: Supabase is not configured!");
    console.error("Please open `supabaseClient.ts` and replace the placeholder URL and anon key with your project's credentials.");
    console.error("The application will not work until this is fixed.");
    console.error("---");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
