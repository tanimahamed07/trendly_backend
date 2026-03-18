# 🛍️ Trendly — Frontend ডকুমেন্টেশন (বাংলা)
> বিগিনার-ফ্রেন্ডলি গাইড | Next.js + TypeScript + Tailwind CSS

---

## 📋 সূচিপত্র

1. [প্রজেক্ট পরিচিতি](#প্রজেক্ট-পরিচিতি)
2. [টেকনোলজি স্ট্যাক](#টেকনোলজি-স্ট্যাক)
3. [প্রজেক্ট সেটআপ](#প্রজেক্ট-সেটআপ)
4. [ফোল্ডার স্ট্রাকচার](#ফোল্ডার-স্ট্রাকচার)
5. [Environment Variables](#environment-variables)
6. [API Base URL ও Axios সেটআপ](#api-base-url-ও-axios-সেটআপ)
7. [Public Pages — পেজসমূহের বিবরণ](#public-pages)
8. [Authentication System](#authentication-system)
9. [Dashboard (Role-Based)](#dashboard-role-based)
10. [AI Feature — Chatbot](#ai-feature--chatbot)
11. [ডিজাইন নিয়মকানুন](#ডিজাইন-নিয়মকানুন)
12. [Deployment](#deployment)
13. [Demo Credentials](#demo-credentials)

---

## প্রজেক্ট পরিচিতি

**Trendly** হলো একটি পূর্ণাঙ্গ ই-কমার্স প্ল্যাটফর্ম। Backend ইতিমধ্যে তৈরি হয়ে গেছে এবং সেখানে নিম্নলিখিত API আছে:

| মডিউল | Base URL |
|---|---|
| Authentication | `/api/auth` |
| Users | `/api/users` |
| Products (Items) | `/api/items` |
| Bookings (Orders) | `/api/bookings` |
| Reviews | `/api/reviews` |
| AI Features | `/api/ai` |
| Dashboard | `/api/dashboard` |

Frontend এর কাজ হলো এই API গুলো ব্যবহার করে সুন্দর UI বানানো।

---

## টেকনোলজি স্ট্যাক

| টেকনোলজি | কাজ |
|---|---|
| **Next.js 14** (App Router) | পেজ রাউটিং ও SSR |
| **TypeScript** | টাইপ-সেফ কোড |
| **Tailwind CSS** | স্টাইলিং |
| **Axios** | API কল করা |
| **React Hook Form** | ফর্ম ম্যানেজমেন্ট |
| **Zod** | ফর্ম ভ্যালিডেশন |
| **Recharts** | চার্ট/গ্রাফ |
| **NextAuth.js** | Authentication + Google Login |
| **Zustand** | State Management |
| **React Hot Toast** | Notification/Toast |

---

## প্রজেক্ট সেটআপ

### ধাপ ১: Next.js প্রজেক্ট তৈরি করো

```bash
npx create-next-app@latest trendly-frontend --typescript --tailwind --app --src-dir
cd trendly-frontend
```

প্রশ্ন আসলে:
- ✅ TypeScript? → **Yes**
- ✅ ESLint? → **Yes**
- ✅ Tailwind CSS? → **Yes**
- ✅ `src/` directory? → **Yes**
- ✅ App Router? → **Yes**

### ধাপ ২: প্যাকেজ ইনস্টল করো

```bash
npm install axios react-hook-form zod @hookform/resolvers
npm install recharts
npm install next-auth
npm install zustand
npm install react-hot-toast
npm install react-icons
npm install @tanstack/react-query
npm install react-loading-skeleton
```

### ধাপ ৩: Dev server চালু করো

```bash
npm run dev
```

ব্রাউজারে যাও: `http://localhost:3000`

---

## ফোল্ডার স্ট্রাকচার

```
trendly-frontend/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (public)/                 # Public pages (navbar সহ)
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── explore/
│   │   │   │   └── page.tsx          # Explore/Listing page
│   │   │   ├── items/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Product details page
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── blog/
│   │   │       └── page.tsx
│   │   ├── (auth)/                   # Auth pages (navbar নেই)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/                # Dashboard pages
│   │   │   ├── layout.tsx            # Sidebar layout
│   │   │   ├── page.tsx              # Overview
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── my-orders/
│   │   │   │   └── page.tsx
│   │   │   ├── my-reviews/
│   │   │   │   └── page.tsx
│   │   │   ├── manage-users/
│   │   │   │   └── page.tsx
│   │   │   ├── manage-products/
│   │   │   │   └── page.tsx
│   │   │   ├── manage-orders/
│   │   │   │   └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts      # NextAuth handler
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css
│   ├── components/                   # Reusable components
│   │   ├── shared/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ChatBot.tsx
│   │   ├── ui/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Modal.tsx
│   │   └── dashboard/
│   │       ├── Sidebar.tsx
│   │       ├── DashboardNavbar.tsx
│   │       └── StatsCard.tsx
│   ├── lib/
│   │   └── axios.ts                  # Axios instance
│   ├── hooks/                        # Custom hooks
│   │   ├── useAuth.ts
│   │   └── useProducts.ts
│   ├── store/                        # Zustand store
│   │   └── authStore.ts
│   └── types/                        # TypeScript types
│       ├── product.ts
│       ├── user.ts
│       ├── order.ts
│       └── review.ts
```

---

## Environment Variables

প্রজেক্টের root-এ `.env.local` ফাইল তৈরি করো:

```env
# Backend API URL (deployed হলে Render URL দাও)
NEXT_PUBLIC_API_URL=http://localhost:5000

# NextAuth সেটআপের জন্য
NEXTAUTH_SECRET=trendly_secret_key_change_this
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Google Console থেকে নাও)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> [!IMPORTANT]
> `NEXT_PUBLIC_` দিয়ে শুরু হওয়া variable গুলো browser-এ দেখা যায়।
> Secret সংক্রান্ত variable গুলো কখনো `NEXT_PUBLIC_` দিয়ে শুরু করবে না।

---

## API Base URL ও Axios সেটআপ

**`src/lib/axios.ts`** ফাইল তৈরি করো:

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// প্রতিটি request-এ JWT token যোগ করো
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
```

---

## TypeScript Types

### `src/types/product.ts`

```typescript
export interface Product {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  ratingCount: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
```

### `src/types/user.ts`

```typescript
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'manager';
  avatar?: string;
  createdAt: string;
}
```

### `src/types/order.ts`

```typescript
export interface Order {
  _id: string;
  userId: string;
  itemId: string;
  quantity: number;
  price: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
  };
  createdAt: string;
}
```

### `src/types/review.ts`

```typescript
export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: { name: string; avatar?: string };
  itemId: string;
  createdAt: string;
}
```

---

## Public Pages

### 🏠 Home Page (`/`)

**৮টি mandatory section থাকতে হবে:**

| # | Section | কী দেখাবে |
|---|---|---|
| 1 | **Hero** | Full-screen banner, CTA button, animation |
| 2 | **Featured Categories** | Electronics, Fashion, Home, Sports, etc. |
| 3 | **Trending Products** | `GET /api/items?sort=-rating&limit=8` |
| 4 | **New Arrivals** | `GET /api/items?sort=-createdAt&limit=8` |
| 5 | **Top Rated** | `GET /api/items?rating=4&limit=8` |
| 6 | **Why Shop With Us** | Icons + text cards |
| 7 | **Customer Testimonials** | Static reviews with stars |
| 8 | **Newsletter Signup** | Email input form |

**Hero Section উদাহরণ:**

```typescript
// src/app/(public)/page.tsx
export default function HomePage() {
  return (
    <main>
      {/* Hero — screen height এর 60-70% */}
      <section className="min-h-[65vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Shop Smarter with Trendly</h1>
          <p className="text-xl mb-8">Discover thousands of products at the best prices</p>
          <a href="/explore" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
            Explore Products
          </a>
        </div>
      </section>

      {/* বাকি sections যোগ করো */}
    </main>
  );
}
```

---

### 🔍 Explore Page (`/explore`)

এই পেজে সব product দেখাবে এবং filter করা যাবে।

**Backend API:** `GET /api/items`

**Query Parameters যা সাপোর্ট করে:**

| Parameter | উদাহরণ | কাজ |
|---|---|---|
| `search` | `?search=phone` | Title/description/category তে খোঁজে |
| `category` | `?category=electronics` | Category filter |
| `priceMin` | `?priceMin=100` | ন্যূনতম দাম |
| `priceMax` | `?priceMax=500` | সর্বোচ্চ দাম |
| `rating` | `?rating=4` | ন্যূনতম rating |
| `sort` | `?sort=price` | দাম অনুযায়ী (কম→বেশি) |
| `sort` | `?sort=-rating` | Rating অনুযায়ী (বেশি→কম) |
| `sort` | `?sort=-createdAt` | নতুন আগে |
| `page` | `?page=2` | পেজ নম্বর |
| `limit` | `?limit=12` | প্রতি পেজে কতটি |

**Explore Page Component উদাহরণ:**

```typescript
'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { Product, ProductsResponse } from '@/types/product';
import ProductCard from '@/components/ui/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';

export default function ExplorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get<ProductsResponse>('/api/items', {
          params: { search, category, sort, page, limit: 12 },
        });
        setProducts(res.data.data);
        setTotal(res.data.meta.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category, sort, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-6"
      />

      {/* Filters & Sort */}
      <div className="flex gap-4 mb-6">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Living</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="-createdAt">Newest First</option>
          <option value="price">Price: Low to High</option>
          <option value="-rating">Top Rated</option>
        </select>
      </div>

      {/* Product Grid — Desktop 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => <ProductCard key={product._id} product={product} />)
        }
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {Array(Math.ceil(total / 12)).fill(0).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

### 📦 Product Card Component

```typescript
// src/components/ui/ProductCard.tsx
import { Product } from '@/types/product';
import Link from 'next/link';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden h-[420px] flex flex-col hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-indigo-500 font-medium uppercase">{product.category}</span>
        <h3 className="font-semibold text-gray-800 dark:text-white mt-1 line-clamp-2">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>

        <div className="mt-auto">
          {/* Price & Rating */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-indigo-600">${product.price}</span>
            <span className="text-sm text-yellow-500">⭐ {product.rating} ({product.ratingCount})</span>
          </div>

          {/* View Details Button */}
          <Link href={`/items/${product._id}`}>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

### 📄 Product Details Page (`/items/[id]`)

**Backend API:** `GET /api/items/:id`

**এই পেজে থাকবে:**

1. **Product Overview** — বড় ছবি, title, price, description
2. **Specifications** — category, brand, stock, rating, SKU
3. **Reviews Section** — review দেখা + লেখা
4. **AI Review Summary** — Gemini দিয়ে সব review summarize
5. **Related Products** — একই category-র products

```typescript
// src/app/(public)/items/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { Product } from '@/types/product';
import { Review } from '@/types/review';
import ReviewForm from '@/components/ui/ReviewForm';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aiSummary, setAiSummary] = useState('');

  useEffect(() => {
    // Product fetch
    axiosInstance.get(`/api/items/${id}`).then(res => setProduct(res.data.data));
    // Reviews fetch
    axiosInstance.get(`/api/reviews/item/${id}`).then(res => setReviews(res.data.data));
  }, [id]);

  const handleGetAISummary = async () => {
    const res = await axiosInstance.post('/api/ai/review-summary', { itemId: id });
    setAiSummary(res.data.data.summary);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <img src={product.image} alt={product.title} className="rounded-2xl w-full" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-indigo-600 text-2xl font-bold mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Specifications */}
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="font-medium py-1">Category</td><td>{product.category}</td></tr>
              <tr><td className="font-medium py-1">Brand</td><td>{product.brand}</td></tr>
              <tr><td className="font-medium py-1">Stock</td><td>{product.stock} units</td></tr>
              <tr><td className="font-medium py-1">Rating</td><td>⭐ {product.rating} / 5</td></tr>
              <tr><td className="font-medium py-1">SKU</td><td>{product.sku}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <button onClick={handleGetAISummary} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
            🤖 AI Summary
          </button>
        </div>

        {aiSummary && (
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 rounded-xl p-4 mb-6">
            <p className="text-purple-800 dark:text-purple-200">{aiSummary}</p>
          </div>
        )}

        {/* Review list */}
        {reviews.map(review => (
          <div key={review._id} className="border rounded-xl p-4 mb-3">
            <div className="flex justify-between">
              <span className="font-medium">{review.userId.name}</span>
              <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
            </div>
            <p className="text-gray-600 mt-1">{review.comment}</p>
          </div>
        ))}

        {/* Review Form (logged in users only) */}
        <ReviewForm itemId={id as string} />
      </section>
    </div>
  );
}
```

---

## Authentication System

### Login Page (`/login`)

**Backend API:** `POST /api/auth/login`

**Request Body:**
```json
{ "email": "user@example.com", "password": "123456" }
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "...", "email": "...", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Login Page উদাহরণ:**

```typescript
// src/app/(auth)/login/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('সঠিক ইমেইল দিন'),
  password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axiosInstance.post('/api/auth/login', data);
      // Token localStorage-এ store করো
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      toast.success('Login সফল হয়েছে!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Trendly</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input {...register('email')} type="email" className="w-full border rounded-lg px-4 py-2" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input {...register('password')} type="password" className="w-full border rounded-lg px-4 py-2" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-4 space-y-2">
          <p className="text-center text-sm text-gray-500">Demo Login:</p>
          <button
            onClick={() => { setValue('email', 'user@example.com'); setValue('password', '123456'); }}
            className="w-full border border-indigo-400 text-indigo-600 py-2 rounded-lg text-sm hover:bg-indigo-50"
          >
            👤 User Demo Login
          </button>
          <button
            onClick={() => { setValue('email', 'admin@example.com'); setValue('password', '123456'); }}
            className="w-full border border-purple-400 text-purple-600 py-2 rounded-lg text-sm hover:bg-purple-50"
          >
            🔐 Admin Demo Login
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Register Page (`/register`)

**Backend API:** `POST /api/auth/register`

**Request Body:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "123456" }
```

**Response:**
```json
{ "success": true, "message": "User registered successfully", "data": { ... } }
```

---

## Dashboard (Role-Based)

### Dashboard Layout

```typescript
// src/app/dashboard/layout.tsx
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Role অনুযায়ী Sidebar Menu

| Role | Pages |
|---|---|
| **User** | My Profile, My Orders, My Reviews |
| **Admin** | Manage Users, Manage Products, Manage Orders, Analytics, Settings |
| **Manager** | Manage Orders, Analytics, Settings |

### Dashboard Overview — Stats Cards

**Backend API:** `GET /api/dashboard/stats`

```typescript
// Response shape:
{
  "data": {
    "totalUsers": 1200,
    "totalItems": 430,
    "totalOrders": 210,
    "totalRevenue": 35000
  }
}
```

```typescript
// src/app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import StatsCard from '@/components/dashboard/StatsCard';

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get('/api/dashboard/stats').then(res => setStats(res.data.data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Users" value={stats.totalUsers} icon="👥" color="blue" />
        <StatsCard title="Total Products" value={stats.totalItems} icon="📦" color="green" />
        <StatsCard title="Total Orders" value={stats.totalOrders} icon="🛒" color="orange" />
        <StatsCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon="💰" color="purple" />
      </div>

      {/* Charts এর জন্য দেখো নিচের Chart Section */}
    </div>
  );
}
```

### Dashboard Charts

**Backend API:** `GET /api/dashboard/chart-data`

```typescript
// Response shape:
{
  "data": {
    "barChart": { "labels": ["pending","confirmed","delivered"], "datasets": [{ "data": [10,25,50] }] },
    "lineChart": { "labels": ["2024-01-01","2024-01-02"], "datasets": [{ "data": [500,800] }] },
    "pieChart": { "labels": ["Electronics","Fashion"], "datasets": [{ "data": [150,200] }] }
  }
}
```

```typescript
// src/app/dashboard/analytics/page.tsx
'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    axiosInstance.get('/api/dashboard/chart-data').then(res => setChartData(res.data.data));
  }, []);

  if (!chartData) return <div>Loading charts...</div>;

  // Bar Chart data format
  const barData = chartData.barChart.labels.map((label: string, i: number) => ({
    name: label,
    count: chartData.barChart.datasets[0].data[i],
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart ও Pie Chart একইভাবে বানাও */}
    </div>
  );
}
```

---

## AI Feature — Chatbot

### Chatbot Component

**Backend API:** `POST /api/ai/chat`

**Request Body:**
```json
{ "message": "Recommend a product under $50" }
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userMessage": "Recommend a product under $50",
    "aiResponse": "I'd recommend checking out our accessories section..."
  }
}
```

```typescript
// src/components/shared/ChatBot.tsx
'use client';
import { useState } from 'react';
import axiosInstance from '@/lib/axios';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hi! I\'m your Trendly shopping assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await axiosInstance.post('/api/ai/chat', { message: userMessage });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.data.aiResponse }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-indigo-700 transition text-2xl z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-semibold">🤖 AI Shopping Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-xl text-sm">
                  <span className="animate-pulse">AI is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about products..."
              className="flex-1 border rounded-lg px-3 py-1 text-sm"
            />
            <button onClick={sendMessage} disabled={loading} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

---

## ডিজাইন নিয়মকানুন

### রঙের নিয়ম (Color System)

```css
/* globals.css এ এই CSS variables যোগ করো */
:root {
  --color-primary: #6366f1;   /* Indigo — প্রধান রঙ */
  --color-secondary: #8b5cf6; /* Purple — দ্বিতীয় রঙ */
  --color-accent: #06b6d4;    /* Cyan — accent রঙ */
}
```

### Dark Mode সেটআপ

**`tailwind.config.ts`:**

```typescript
const config = {
  darkMode: 'class', // HTML-এ class="dark" যোগ করলে dark mode হবে
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
export default config;
```

**Dark mode toggle:**

```typescript
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};
```

### Card Design — সব জায়গায় একই রাখো

```typescript
// ProductCard, StatsCard, ReviewCard — সব কার্ডে এই class গুলো রাখো:
const cardClass = "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow";
```

### Skeleton Loader

```typescript
// src/components/ui/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden h-[420px] animate-pulse">
      <div className="h-52 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mt-auto" />
      </div>
    </div>
  );
}
```

---

## All API Endpoints Quick Reference

### Auth Endpoints

| Method | Endpoint | কাজ | Auth লাগবে? |
|---|---|---|---|
| POST | `/api/auth/register` | Registration | ❌ না |
| POST | `/api/auth/login` | Login | ❌ না |
| POST | `/api/auth/refresh-token` | Token refresh | ❌ না |

### User Endpoints

| Method | Endpoint | কাজ | Auth লাগবে? |
|---|---|---|---|
| GET | `/api/users` | সব user দেখো | ✅ Admin |
| GET | `/api/users/:id` | একজন user | ✅ Admin |
| PATCH | `/api/users/:id` | User আপডেট | ✅ Admin |
| DELETE | `/api/users/:id` | User ডিলিট | ✅ Admin |
| PATCH | `/api/users/role` | Role পরিবর্তন | ✅ Admin |

### Product Endpoints

| Method | Endpoint | কাজ | Auth লাগবে? |
|---|---|---|---|
| GET | `/api/items` | সব product | ❌ না |
| GET | `/api/items/:id` | একটি product | ❌ না |
| POST | `/api/items` | Product তৈরি | ✅ Admin |
| PATCH | `/api/items/:id` | Product আপডেট | ✅ Admin |
| DELETE | `/api/items/:id` | Product ডিলিট | ✅ Admin |

### Booking/Order Endpoints

| Method | Endpoint | কাজ | Auth লাগবে? |
|---|---|---|---|
| POST | `/api/bookings` | Order করো | ✅ User/Admin |
| GET | `/api/bookings` | Orders দেখো | ✅ User/Admin |
| PATCH | `/api/bookings/:id` | Order আপডেট | ✅ Admin/Manager |
| DELETE | `/api/bookings/:id` | Order ডিলিট | ✅ Admin |

### Review Endpoints

| Method | Endpoint | কাজ | Auth লাগবে? |
|---|---|---|---|
| POST | `/api/reviews` | Review লেখো | ✅ User |
| GET | `/api/reviews/item/:itemId` | Product-এর reviews | ❌ না |
| DELETE | `/api/reviews/:id` | Review মুছো | ✅ Admin |

### AI Endpoints

| Method | Endpoint | Request Body | কাজ |
|---|---|---|---|
| POST | `/api/ai/chat` | `{ message: "..." }` | Chatbot response |
| POST | `/api/ai/generate-description` | `{ title, category?, brand? }` | Product description তৈরি |
| POST | `/api/ai/review-summary` | `{ itemId: "..." }` | Reviews summarize |

### Dashboard Endpoints

| Method | Endpoint | কাজ | Auth লাগবে? |
|---|---|---|---|
| GET | `/api/dashboard/stats` | Statistics | ✅ Admin/Manager |
| GET | `/api/dashboard/chart-data` | Chart data | ✅ Admin/Manager |

---

## Deployment

### Frontend → Vercel

```bash
# ১. Vercel CLI install করো
npm install -g vercel

# ২. Deploy করো
vercel deploy

# ৩. Production deploy
vercel --prod
```

> [!TIP]
> Vercel dashboard-এ গিয়ে Environment Variables যোগ করো।
> `.env.local` এর সব variable Vercel settings-এ add করতে হবে।

### Important Vercel Settings

`vercel.json` ফাইল তৈরি করো (routing fix করতে):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/$1" }]
}
```

---

## Demo Credentials

এই credentials গুলো Login পেজে Demo button-এ autofill করতে হবে:

| Role | Email | Password |
|---|---|---|
| 👤 **User** | `user@example.com` | `123456` |
| 🔐 **Admin** | `admin@example.com` | `123456` |

---

## সংক্ষিপ্ত Checklist

### Public Pages ✅
- [ ] Home Page (৮টি section)
- [ ] Explore Page (search + filter + sort + pagination)
- [ ] Product Details Page (description + specs + reviews + AI summary)
- [ ] About Page
- [ ] Contact Page
- [ ] Blog Page

### Auth ✅
- [ ] Login page (validation + demo buttons + Google login)
- [ ] Register page (validation)

### Dashboard ✅
- [ ] User: Profile, My Orders, My Reviews
- [ ] Admin: Manage Users, Manage Products, Manage Orders, Analytics, Settings
- [ ] Stats Cards (real data)
- [ ] Bar, Line, Pie Charts (real data)
- [ ] Data Tables (filter + pagination)

### AI Features ✅
- [ ] Chatbot (floating button + chat window)
- [ ] AI Review Summary (product details page)
- [ ] AI Description Generator (admin product form)

### Design ✅
- [ ] Dark mode + Light mode
- [ ] Responsive (Mobile/Tablet/Desktop)
- [ ] Skeleton loaders
- [ ] Toast notifications
- [ ] Consistent card design
- [ ] No Lorem Ipsum text

---

> **Backend Server Name:** Trendly  
> **Backend Base Path:** `/api`  
> **Backend পাঠানো Token type:** `Bearer <JWT>`  
> **Token store করো:** `localStorage.setItem('token', token)`
