const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Connected to Supabase Cloud Database Client.');
  } catch (err) {
    console.error('Error initializing Supabase client:', err.message);
  }
} else {
  console.log('Using local SQLite fallback (Supabase credentials not configured yet).');
}

module.exports = supabase;
