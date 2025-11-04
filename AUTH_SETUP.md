# Authentication Setup Guide

## Overview
This guide will help you set up the authentication system with Supabase for the GiftBox Studio application.

## Prerequisites
- A Supabase account (free at https://supabase.com)
- Your application running locally

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and create a new project
2. Choose a name for your project (e.g., "giftbox-studio")
3. Set a database password (save this securely)
4. Select a region closest to your users
5. Wait for the project to be created (usually 1-2 minutes)

## Step 2: Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API"
4. Copy the following values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Set Up Database Schema

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Create a new query and paste the following SQL to create the necessary tables:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create users profile table
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create box_configurations table
CREATE TABLE public.box_configurations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  configuration JSONB NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on box_configurations
ALTER TABLE public.box_configurations ENABLE ROW LEVEL SECURITY;

-- Create policy for box_configurations
CREATE POLICY "Users can view own box configurations" ON public.box_configurations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own box configurations" ON public.box_configurations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own box configurations" ON public.box_configurations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own box configurations" ON public.box_configurations
  FOR DELETE USING (auth.uid() = user_id);

-- Create orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  box_configuration JSONB NOT NULL,
  delivery_info JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered')),
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy for orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create gift_items table
CREATE TABLE public.gift_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  description TEXT,
  dimensions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on gift_items
ALTER TABLE public.gift_items ENABLE ROW LEVEL SECURITY;

-- Create policy for gift_items (read-only for authenticated users)
CREATE POLICY "Authenticated users can view gift items" ON public.gift_items
  FOR SELECT TO authenticated USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, first_name, last_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. Click "Run" to execute the SQL

## Step 5: Configure Authentication Settings

1. Go to "Authentication" in the left sidebar
2. Click on "Settings"
3. Under "Site URL", add your local development URL:
   - For local development: `http://localhost:3000`
   - For production: your actual domain

4. Under "Redirect URLs", add:
   - `http://localhost:3000/auth/callback`
   - Your production callback URL if deploying

5. Under "Email Templates", you can customize:
   - Confirmation Email
   - Reset Password Email
   - Magic Link Email

## Step 6: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Try to sign up with a new account
3. Check your email for confirmation
4. Complete the signup process
5. Try to access the checkout page

## Troubleshooting

### Common Issues:

1. **"Invalid API Key" Error**
   - Double-check your environment variables
   - Ensure you're using the `anon public` key, not the `service_role` key

2. **"Table doesn't exist" Error**
   - Make sure you ran the SQL setup in Step 4
   - Check that you're in the correct project

3. **Email not received**
   - Check your spam folder
   - Verify the Site URL is correct in Authentication settings
   - For local development, you might need to configure an email service

4. **Sign up works but can't access protected pages**
   - This is normal - you need to confirm your email first
   - Check your email for the confirmation link

### Development vs Production:

- **Development**: Use `http://localhost:3000` as your Site URL
- **Production**: Use your actual domain (e.g., `https://yourapp.com`)

## Next Steps

Once authentication is working:

1. You can customize the email templates in Supabase
2. Add additional user profile fields if needed
3. Implement additional authentication providers (Google, GitHub, etc.)
4. Set up email verification requirements based on your needs

## Support

If you encounter issues:

1. Check the Supabase documentation: https://supabase.com/docs
2. Verify your environment variables are correct
3. Check the browser console for detailed error messages
4. Ensure all SQL queries ran successfully