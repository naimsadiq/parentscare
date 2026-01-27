# 🏠 Parents Care - Professional Caregiving Platform

**Parents Care** is a modern full-stack web application designed to simplify caregiving services. It provides a reliable and trusted platform where families can find, book, and pay for verified caregivers for children, elderly family members, and those needing specialized home nursing.

## 🚀 Live Links
- **Live Deployment:** [(https://parentscare-xi.vercel.app/)]
- **GitHub Repository:** [(https://github.com/naimsadiq/parentscare.git)]

---

## 🔑 Admin Credentials (For Testing)
To review the Admin Dashboard and management features, please use the following credentials:
- **Admin Email:** `nayemsadiq2013@gmail.com` (বা আপনার দেওয়া ইমেইল)
- **Admin Password:** `Admin1234` (বা আপনার দেওয়া পাসওয়ার্ড)

---

## 👤 User Capabilities (What can a User do?)

### 1. **Explore Services**
- View various care categories like **Baby Sitting**, **Elderly Care**, and **Sick Nursing**.
- Access detailed service pages with comprehensive descriptions and features.

### 2. **Secure Registration & Login**
- Create an account with **NID Number** and contact verification.
- Experience high security with strict password validation (min 6 chars, uppercase, lowercase).
- Instant access via **Google Social Login**.

### 3. **Dynamic Service Booking**
- Use an interactive booking form to select service duration.
- Filter locations dynamically (Division > District > Area) using customized area data.
- View **Real-time Cost Calculation** (Duration × Service Charge).

### 4. **Integrated Online Payment**
- Pay securely using **Stripe Payment Gateway**.
- View automated "Paid" status upon successful transactions.

### 5. **Personal Dashboard & Tracking**
- Track all personal bookings in a clean table format.
- Monitor booking status (Pending / Confirmed / Completed / Cancelled).
- **Automated Invoices:** Receive professional email invoices via Gmail/Nodemailer immediately after payment.

### 6. **Customizable Experience**
- Switch between **Light and Night Mode** for visual comfort.
- Experience a fast, lag-free UI thanks to **Server Actions** and **Skeleton Loaders**.

---

## 🛠 Admin Capabilities (What can the Admin do?)

### 1. **Centralized Management**
- Access a private **Admin Control Center** (Role-protected).
- View every booking request made on the platform.

### 2. **Booking Supervision**
- Update the status of any booking (e.g., changing status from *Pending* to *Confirmed* or *Completed*).
- Manage user requests efficiently from a single dashboard.

### 3. **Financial Overview**
- Access a detailed **Payment History** log.
- Track total revenue and see real Stripe **Transaction IDs** for every successful payment.

---

## 💻 Tech Stack Used

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS
- **UI Components:** DaisyUI
- **Backend:** Next.js Server Actions (No external API needed)
- **Database:** MongoDB (Native Driver Integration)
- **Authentication:** NextAuth.js (JWT Strategy)
- **Payments:** Stripe SDK
- **Email:** Nodemailer (Gmail Automation)
- **Metadata & SEO:** Dynamic Metadata for Service Detail Pages

---

## 🎯 Challenges Implemented
- **Dynamic Metadata:** Implemented on Home and Service detail pages for better SEO and social sharing.
- **Private Route Protection:** Secure routes that handle reloads flawlessly without redirecting logged-in users.
- **Cascading Dropdowns:** Complex location filtering from a static JSON resource.

---
Developed with ❤️ by **[Naim Sadiq]**