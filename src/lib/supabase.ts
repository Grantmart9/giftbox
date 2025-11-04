import { createClient } from "@supabase/supabase-js";

// Check for environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase environment variables are not configured. Please copy .env.example to .env.local and add your Supabase credentials."
  );
}

// Create client with fallback values (will show errors if not properly configured)
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// Helper functions for auth
export async function signUp(email: string, password: string, metadata?: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
}

// Database helper functions
export async function getUserBoxConfigurations(userId: string) {
  const { data, error } = await supabase
    .from("box_configurations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function saveBoxConfiguration(boxConfig: any, userId: string) {
  const { data, error } = await supabase
    .from("box_configurations")
    .insert({
      user_id: userId,
      configuration: boxConfig,
      total_price: boxConfig.totalPrice,
    })
    .select()
    .single();

  return { data, error };
}

export async function createOrder(orderData: any) {
  const { data, error } = await supabase
    .from("orders")
    .insert(orderData)
    .select()
    .single();

  return { data, error };
}

export async function getAvailableItems() {
  const { data, error } = await supabase
    .from("gift_items")
    .select("*")
    .order("category");

  return { data, error };
}

export async function createGiftItem(item: any) {
  const { data, error } = await supabase
    .from("gift_items")
    .insert(item)
    .select()
    .single();

  return { data, error };
}
