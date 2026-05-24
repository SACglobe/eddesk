import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Read .env.local manually
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("--- Supabase SDK Validation ---\n");

  console.log("1. Attempting to select from table: 'achievements'...");
  const { data: achData, error: achError } = await supabase
    .from('achievements')
    .select('title, category, description, imageurl, awardlevel, year')
    .limit(1);

  if (achError) {
    console.log("❌ Result for 'achievements':", achError.message);
  } else {
    console.log("✅ Result for 'achievements': Success!", achData);
  }

  console.log("\n2. Attempting to select from table: 'schoolachievements'...");
  const { data: schoolAchData, error: schoolAchError } = await supabase
    .from('schoolachievements')
    .select('title, category, description, imageurl, awardlevel, year')
    .limit(1);

  if (schoolAchError) {
    console.log("❌ Result for 'schoolachievements':", schoolAchError.message);
  } else {
    console.log("✅ Result for 'schoolachievements': Success! Data:", schoolAchData);
  }
}

run().catch(console.error);
