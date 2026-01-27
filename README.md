# 🏠 Parents Care - Reliable Caregiving Service Platform

Parents Care is a comprehensive web application designed to bridge the gap between families and professional caregivers. Whether it's for your little ones, the elderly, or those recovering from illness, Parents Care provides a secure, easy, and accessible way to find and book verified caregivers.

---

## 🚀 Live Demo

- **Live Link:** [Your Vercel Live Link Here]
- **Client Repo:** [Your GitHub Repo Link Here]

---

## ✨ Key Features

- 📱 **Fully Responsive Design**  
  Optimized for Mobile, Tablet, and Desktop using **Tailwind CSS** and **DaisyUI**.

- 🔐 **Secure Authentication**  
  Supports traditional Email/Password login and Google Social Login via **NextAuth.js**.

- 🛠 **Role-Based Access Control**  
  Dedicated views for:
  - Users (Bookings, Payments)
  - Admins (Managing all requests, Payment tracking)

- 📅 **Dynamic Booking System**
  - Real-time cost calculation based on duration
  - Cascading location filtering (Division → District → Area) using customized JSON resources

- 💳 **Integrated Payments**  
  Secure online payments using **Stripe Payment Gateway**.

- 📧 **Automated Email Invoices**  
  Instant professional PDF-style invoices sent via **Nodemailer** after successful payment.

- 🌓 **Dark / Light Mode**  
  User-friendly theme toggle with persistent storage.

- ⚡ **Performance Optimized**  
  Implemented Skeleton Loaders and Server Actions for a lightning-fast user experience.

- 🔍 **SEO Ready**  
  Dynamic metadata implementation for individual service pages.

---

## 🛠 Tech Stack

| Category           | Technology                                      |
| ------------------ | ----------------------------------------------- |
| Frontend           | Next.js 15 (App Router), React 19, Tailwind CSS |
| UI Library         | DaisyUI                                         |
| Backend            | Next.js Server Actions, MongoDB (Native Driver) |
| Auth               | NextAuth.js (JWT Strategy)                      |
| Payment            | Stripe SDK                                      |
| Email              | Nodemailer (Gmail App Password)                 |
| Animation / Slider | Swiper.js, React-Responsive-Carousel            |

---

## 📸 Screenshots

_Add your project screenshots here_

---

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/parentscare.git
cd parentscare
2️⃣ Install dependencies
npm install
3️⃣ Environment Variables
Create a .env.local file in the root directory and add the following:

# MongoDB
NEXT_MONGO_URI=your_mongodb_connection_string
NEXT_MONGO_NAME=parents_careDB

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
4️⃣ Run the development server
npm run dev
Open 👉 http://localhost:3000 in your browser.

📂 Project Structure
src/
├── actions/        # Server Actions (DB operations, Payments, Auth)
├── app/            # Next.js Pages & API Routes
├── components/     # Reusable UI Components (Shared, Home, Cards)
├── lib/            # Shared Library Logic (dbConnect)
├── utils/          # Helper functions (ThemeToggle, Formatter)
└── data/           # Static JSON resources (Locations)
👤 User Capabilities
Guest
View services

Read testimonials

Check about information

Registered User
Book specific care services with custom durations

Pay securely using Stripe

View personal booking history and status (Pending / Paid / Confirmed)

Receive automated email invoices

Admin
Overview of all user bookings and total revenue

Update booking status (Pending → Confirmed / Completed)

Track all successful payment transactions

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the Issues page.

📜 License
This project is licensed under the MIT License.

Developed with ❤️ by [Your Name]
```
