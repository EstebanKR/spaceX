import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ibyzcjrmivxbthhscemy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlieXpjanJtaXZ4YnRoaHNjZW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMjE5NjEsImV4cCI6MjA2Mzc5Nzk2MX0.3pRfwTmcibUBNzTP0EzUjbr7QFftS9m3JN9vNDGKDQ0';
export const supabase = createClient(supabaseUrl, supabaseKey);
