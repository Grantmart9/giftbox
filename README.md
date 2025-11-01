# 🎁 GiftBox Studio - 3D Custom Gift Box Builder

A full-stack web application where users can design and order personalized gift boxes with interactive 3D visualization.

## ✨ Features

### 🎨 Core Functionality

- **Interactive 3D Box Builder**: Drag & drop items into customizable gift boxes
- **Real-time 3D Preview**: Visualize your box as you build it
- **Item Catalog**: Browse items by category (Flowers, Chocolates, Cards, Toys, Books, Jewelry)
- **Customization Options**: Choose box colors, wrapping styles, and ribbon colors
- **Dynamic Pricing**: Real-time total calculation as items are added/removed

### 🔐 User Management

- **Supabase Authentication**: Secure login/signup system
- **User Profiles**: Save and manage gift box configurations
- **Order History**: Track previous orders and saved designs

### 💳 E-commerce

- **Checkout Flow**: Complete order with delivery information
- **Payment Integration Ready**: Structured for Stripe/PayPal integration
- **Order Management**: Track order status and delivery

### 👨‍💼 Admin Dashboard

- **Item Management**: CRUD operations for gift items
- **Category Management**: Organize items by categories
- **Order Management**: View and update order status
- **Analytics**: Track sales and popular items

### 🎭 UI/UX

- **Responsive Design**: Optimized for desktop and mobile
- **Smooth Animations**: Framer Motion for delightful interactions
- **Modern Interface**: Clean, gift-themed design with soft pastels
- **Accessibility**: WCAG compliant components

## 🛠 Tech Stack

### Frontend

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Framer Motion** for animations
- **React Three Fiber + Drei** for 3D visualization
- **Zustand** for state management

### Backend

- **Next.js API Routes** for server logic
- **Supabase** for database and authentication
- **PostgreSQL** database with RLS (Row Level Security)

### External Services

- **Supabase Auth** for user authentication
- **Supabase Storage** for file uploads (ready)
- **Email Service** integration (SMTP ready)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone and setup the project**

```bash
cd giftbox-studio
npm install
```

2. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. **Setup Supabase Database**

```bash
# In your Supabase dashboard:
# 1. Create a new project
# 2. Run the SQL from supabase-schema.sql in the SQL editor
# 3. Note your project URL and anon key
```

4. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
giftbox-studio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── build/             # Box builder page
│   │   ├── checkout/          # Checkout flow
│   │   └── admin/             # Admin dashboard
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── auth/             # Authentication components
│   ├── lib/                  # Utilities and configurations
│   │   ├── supabase.ts       # Supabase client
│   │   └── utils.ts          # Utility functions
│   ├── store/                # State management
│   │   └── boxStore.ts       # Zustand store
│   └── types/                # TypeScript definitions
│       └── index.ts          # Type definitions
├── public/                   # Static assets
├── supabase-schema.sql       # Database schema
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── .env.example
```

## 🎮 Usage Guide

### For Users

1. **Build Your Box**

   - Visit the homepage and click "Start Building Your Box"
   - Browse items by category
   - Click "Add" to include items in your box
   - Customize box color and ribbon
   - Preview in 3D mode

2. **Checkout**
   - Click "Proceed to Checkout" when ready
   - Sign up/login to save your design
   - Fill in delivery information
   - Complete your order (demo mode)

### For Admins

1. **Access Admin Dashboard**

   - Sign in with an admin account (email containing 'admin')
   - Visit `/admin` to manage the platform

2. **Manage Items**

   - Add new gift items with images, prices, and categories
   - Edit existing items
   - Deactivate items instead of deleting

3. **View Orders**
   - Monitor all orders and their status
   - Update order status (pending → processing → shipped → delivered)

## 🔧 Configuration

### Database Schema

The `supabase-schema.sql` file contains:

- User profiles table
- Gift items catalog
- Box configurations
- Orders management
- Categories system
- Row Level Security policies

### Authentication Flow

- Users sign up via Supabase Auth
- Profile created automatically via trigger
- Admin access via `is_admin` flag in profiles

### State Management

Zustand store manages:

- Current box configuration
- User authentication state
- Available items and categories
- UI state (3D preview, loading, etc.)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ENV=production
```

### Database Setup

1. Create production Supabase project
2. Run `supabase-schema.sql` in production
3. Configure authentication providers if needed

## 🎨 Customization

### Styling

- **Colors**: Edit `tailwind.config.js` for brand colors
- **Components**: Modify shadcn/ui components in `src/components/ui/`
- **Animations**: Adjust Framer Motion configurations

### 3D Visualization

- Replace placeholder 3D box with React Three Fiber
- Add realistic 3D models for items
- Implement drag & drop in 3D space

### Payment Integration

- Add Stripe SDK to `package.json`
- Implement payment processing in checkout flow
- Add webhook handling for payment confirmation

## 🧪 Testing

Run tests (when implemented):

```bash
npm test
```

Build and preview production:

```bash
npm run build
npm start
```

## 📊 Features Roadmap

### Phase 1 (Current)

- ✅ Basic 3D box visualization
- ✅ Item catalog and categories
- ✅ User authentication
- ✅ Checkout flow
- ✅ Admin dashboard

### Phase 2 (Next)

- 🔄 Real React Three Fiber 3D implementation
- 🔄 Advanced drag & drop functionality
- 🔄 Payment processing integration
- 🔄 Email notifications
- 🔄 Image upload for items

### Phase 3 (Future)

- 📅 AI-powered gift suggestions
- 📅 Social sharing features
- 📅 Mobile app with React Native
- 📅 Advanced 3D animations
- 📅 Subscription box service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Issues**: Report bugs via GitHub Issues
- **Documentation**: Check this README and code comments
- **Community**: Join discussions in GitHub Discussions

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Framer Motion** for smooth animations
- **Supabase** for backend services
- **Next.js** team for the amazing framework
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ using Next.js, Supabase, and modern web technologies**
