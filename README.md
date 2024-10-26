# **Monee Wallet App**

This is a **Wallet Web Application** that allows users to sign up, verify their identity via OTP, and simulate basic banking transactions and peer to peer. It also integrates a dummy banking API for on-ramp transactions.

---

## **Features**

- **User Registration and Login**: Secure signup and login with validation.
- **OTP Verification**: Authenticate transactions and actions with OTP verification.
- **Dummy Bank API Integration**: Supports a mock HDFC and Axis Bank interface with features like NetBanking and transaction loaders.
- **Wallet Transactions**: Simulate peer-to-peer transactions and balance management.
- **Responsive UI**: User interface inspired by real banking sites for an immersive experience.

---



---

## **Installation and Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/narutobhati/Monee.git
   cd Monee

2. **Install Dependencies:**
    ```bash
    npm install
3. **Environment Variables:** 
    
    ***create a .env file in packages/db:***
    ```bash
    DATABASE_URL=your_postgresql_url
***create a .env file in apps/user-app:***

    JWT_SECRET=mysecret
    NEXTAUTH_URL=http://localhost:3001
    Bank_URL="http://localhost:3002"
4. **Migrate the database:**
    ```bash
    cd packages\db
    npx prisma migrate dev
    npx prisma generate
    npx prisma db seed
5. **Run the Application:**
    ```bash
    npm run dev
***Your application will be available at http://localhost:3001***

---
## **License**
This project is licensed under the **MIT License.**

---
## **Author**
Developed by **Naruto Bhati** 
