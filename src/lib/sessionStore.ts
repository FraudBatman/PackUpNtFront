import { writable } from 'svelte/store';
import { supabase } from './supabaseClient';

export const { data: { session } } = await supabase.auth.getSession();
export const { data: { user } } = await supabase.auth.getUser();