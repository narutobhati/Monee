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

## **ScreenShots**

1. **SignUp/SignIn:**
   
   ![Screenshot from 2024-10-26 21-00-50](https://github.com/user-attachments/assets/9eebebf8-6c7b-40dc-abf5-8d74342ce77d)
---

2. **Home Page:**
![Screenshot from 2024-10-26 21-01-30](https://github.com/user-attachments/assets/06d821d0-ac68-43d5-873d-2bfd702c02fc)
---


3. **Wallet Reacharge (Dummy HDFC Netbanking):**
   ![Screenshot from 2024-10-26 21-02-13](https://github.com/user-attachments/assets/9a69a469-4afe-4c1c-a76c-e61db7bad4a9)
      
   
   ![Untitled design](https://github.com/user-attachments/assets/afc89b26-9bbe-4dd2-93e5-97d278a68c9a)
   
   ![Screenshot from 2024-10-26 21-02-56](https://github.com/user-attachments/assets/f54ab89a-7b93-4799-8224-96da5b116794)
---
5. **Wallet Recharge (Dummy Axis Netbanking):**
   
   ![Untitled design(1)](https://github.com/user-attachments/assets/376e24fe-e5c4-4ce2-bbdd-842b899be4e2)

   ![Untitled design(2)](https://github.com/user-attachments/assets/ccf879ae-2e65-443c-85fa-04b730270e6f)
   ![Screenshot from 2024-10-26 21-05-38](https://github.com/user-attachments/assets/794786e4-9f15-487a-ae79-8aef88cb67c7)
---
6. **Peer to Peer transfer:**
   ![Screenshot from 2024-10-26 21-04-18](https://github.com/user-attachments/assets/27301eea-5666-4a5b-b198-176866c2314c)
   ![Screenshot from 2024-10-26 21-04-32](https://github.com/user-attachments/assets/87710569-29fb-4a7f-8cce-69b914c6a024)
---
7. **Transactions:**
   ![Screenshot from 2024-10-26 21-04-48](https://github.com/user-attachments/assets/37f546c4-6854-48a9-b6aa-5944ac60fbc6)

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
