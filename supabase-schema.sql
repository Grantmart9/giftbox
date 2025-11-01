-- GiftBox Studio Database Schema

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gift Items table
CREATE TABLE public.gift_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    dimensions JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Box Configurations table
CREATE TABLE public.box_configurations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT,
    box_color TEXT NOT NULL DEFAULT '#ff6b9d',
    wrapping_style TEXT NOT NULL DEFAULT 'solid',
    ribbon_color TEXT NOT NULL DEFAULT '#ffd700',
    items JSONB NOT NULL DEFAULT '[]',
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    is_saved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    box_configuration_id UUID REFERENCES public.box_configurations(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_price DECIMAL(10,2) NOT NULL,
    delivery_info JSONB NOT NULL,
    payment_intent_id TEXT,
    tracking_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table (optional, for more flexibility)
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, description, display_order) VALUES
    ('Flowers', 'Beautiful floral arrangements and bouquets', 1),
    ('Chocolates', 'Premium chocolates and sweet treats', 2),
    ('Cards', 'Greeting cards and personalized messages', 3),
    ('Toys', 'Fun toys and games for all ages', 4),
    ('Books', 'Inspiring books and literature', 5),
    ('Jewelry', 'Elegant jewelry and accessories', 6);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.box_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can only view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Gift Items: Public read, admin write
CREATE POLICY "Anyone can view active gift items" ON public.gift_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage gift items" ON public.gift_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Box Configurations: Users can only access their own
CREATE POLICY "Users can manage own box configurations" ON public.box_configurations
    FOR ALL USING (auth.uid() = user_id);

-- Orders: Users can view their own orders, admins can view all
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON public.orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Users can create own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Categories: Public read, admin write
CREATE POLICY "Anyone can view active categories" ON public.categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage categories" ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Functions for handling user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_gift_items_updated_at BEFORE UPDATE ON public.gift_items
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_box_configurations_updated_at BEFORE UPDATE ON public.box_configurations
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Insert sample gift items
INSERT INTO public.gift_items (name, description, category, price, image_url) VALUES
    ('Red Roses Bouquet', 'Beautiful red roses with elegant wrapping', 'Flowers', 519.48, '/api/placeholder/150/150'),
    ('Premium Chocolates', 'Artisan chocolate collection', 'Chocolates', 277.21, '/api/placeholder/150/150'),
    ('Handwritten Card', 'Customizable greeting card', 'Cards', 86.49, '/api/placeholder/150/150'),
    ('Plush Teddy Bear', 'Soft and cuddly teddy bear', 'Toys', 433.09, '/api/placeholder/150/150'),
    ('Bestselling Novel', 'Popular fiction book', 'Books', 346.29, '/api/placeholder/150/150'),
    ('Silver Necklace', 'Elegant sterling silver necklace', 'Jewelry', 1559.43, '/api/placeholder/150/150'),
    ('Pink Roses', 'Soft pink roses for special occasions', 'Flowers', 571.74, '/api/placeholder/150/150'),
    ('Gourmet Truffles', 'Luxury chocolate truffles', 'Chocolates', 433.09, '/api/placeholder/150/150'),
    ('Valentine Card', 'Romantic Valentine''s Day card', 'Cards', 69.13, '/api/placeholder/150/150'),
    ('Building Blocks', 'Creative building blocks set', 'Toys', 606.43, '/api/placeholder/150/150'),
    ('Poetry Collection', 'Classic poetry anthology', 'Books', 294.36, '/api/placeholder/150/150'),
    ('Pearl Earrings', 'Classic pearl earrings', 'Jewelry', 2183.00, '/api/placeholder/150/150');