import { supabase } from './supabaseClient';

export async function signUp(email: string, password: string, username?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: username,
      },
    },
  });
  if (error) throw error;
  return data.user;
}

// Export an asynchronous function called signIn that takes in two parameters, email and password
export async function signIn(email: string, password: string) {
  // Use the supabase.auth.signInWithPassword function to sign in the user with the provided email and password
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  // If there is an error, throw the error
  if (error) throw error;
  // Otherwise, return the user data
  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function getUser() {
  return supabase.auth.getUser();
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return data;
}

export async function updateUserPassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  return data;
}
