# E-Commerce Cart Application

A full-stack e-commerce shopping cart application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- 🔐 User Authentication (Sign up, Sign in with OTP verification)
- 🛒 Shopping Cart Management
- 📧 Email Receipts after Purchase
- 🗂️ Product Categories (Electronics, Jewelry, Men's & Women's Clothing)
- 📱 Responsive Design with Mobile Hamburger Menu
- ⚡ Redis for OTP Caching
- 🔒 JWT Token Authentication

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI Icons
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Redis for caching
- Nodemailer for email
- JWT for authentication
- Bcrypt for password hashing
- Zod for validation

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- Redis installed and running
- Gmail account for sending emails

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ecommerce-cart
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend directory:
```env
# MongoDB
MONGODB_STRING=mongodb://localhost:27017/ecommerce

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_PASSWORD=your_jwt_secret_key

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
PASS_USER=your-app-specific-password

# Server
PORT=3000
```

**Note:** For Gmail, you need to create an [App Password](https://support.google.com/accounts/answer/185833):
1. Go to your Google Account
2. Select Security
3. Under "Signing in to Google," select 2-Step Verification
4. At the bottom, select App passwords
5. Generate a new app password and use it in `PASS_USER`

## Running the Application

### Backend
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:3000`

### Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/v1/signup` - Register new user (sends OTP)
- `POST /api/v1/verify-otp` - Verify OTP and complete registration
- `POST /api/v1/signin` - Login user

### Cart Operations
- `GET /api/v1/cart` - Get user's cart items
- `POST /api/v1/addtocart` - Add item to cart
- `DELETE /api/v1/cart/:id` - Remove/decrease item quantity
- `PUT /api/v1/addqty/:id` - Increase item quantity

### Checkout
- `POST /api/v1/checkout` - Process checkout and send receipt via email

## Project Structure
```
ecommerce-cart/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Main server file
│   │   ├── middleware.ts     # JWT authentication middleware
│   │   └── db.ts             # Database models
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.tsx
    │   │   ├── CartProducts.tsx
    │   │   ├── Card.tsx
    │   │   └── Auth.tsx
    │   ├── hooks/
    │   │   └── useProducts.ts
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   └── Card.tsx
    │   └── App.tsx
    └── package.json
```

## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Verify OTP**: Enter the OTP sent to your email
3. **Browse Products**: View products by category
4. **Add to Cart**: Click on products to add them to your cart
5. **Manage Cart**: Increase/decrease quantities or remove items
6. **Checkout**: Complete purchase and receive receipt via email

## Features in Detail

### User Authentication
- Password must be at least 8 characters
- Must contain at least one capital letter
- Must contain at least one special character
- OTP verification via email (expires in 5 minutes)

### Shopping Cart
- Add/remove items
- Adjust quantities
- Real-time price calculation
- Persistent cart (stored in database)

### Email Receipts
- Automatic receipt generation
- Itemized list with quantities and prices
- Total amount calculation

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected API routes with middleware
- OTP expiration for security

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact


Project Link: [https://github.com/yourusername/ecommerce-cart](https://github.com/yourusername/ecommerce-cart)

## Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for product data
- Material-UI for icons
- Tailwind CSS for styling
