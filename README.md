# Mini Order & Payment System

A full-stack, responsive mini order and payment processing application. This system allows users to browse a collection of products, add items to a shopping cart, review their choices during checkout, and seamlessly process payments using either a Mock Online Payment system or Cash on Delivery. 

The application utilizes a visually stunning, modern aesthetic by leveraging TailwindCSS and Framer Motion on the frontend, built atop robust Node.js/Express and MongoDB architectures on the backend.

## Features

- **Modern & Responsive UI**: Stunning visuals crafted with TailwindCSS, Glassmorphism, engaging gradients, and micro-animations via Framer Motion.
- **Product Catalog**: Users can browse dynamically fetching products.
- **Cart Management**: Intuitive add, remove, and update functionalities for items in the shopping cart.
- **Checkout Process**: A streamlined flow to finalize orders and select payment options.
- **Flexible Payments**: Support for integrated mock online payment processing or Cash on Delivery.
- **RESTful API back-end**: Node.js and Express.js powers the data layer over MongoDB.

## Technologies Used

### Frontend
- **React.js** (via Vite)
- **Tailwind CSS** (for styling and modern UI patterns)
- **Framer Motion** (for micro-animations and smooth page transitions)
- **Axios** (for API communication)
- **React Router** (for SPA navigation)
- **Lucide React** (for scalable vector iconography)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database and ODM)
- **Cors, Dotenv** (Middleware and Environment management)
- **Nodemon** (for efficient local development)

## Prerequisites

Before ensuring a smooth installation, ensure you have the following installed to run the application locally:
- [Node.js](https://nodejs.org/) (v16.x or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) (A Local instance or Atlas Cluster connection string)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sanjay452656/miniOrderSystem
cd orderSystem
```

### 2. Backend Setup

Open a terminal window and navigate to the backend directory:

```bash
cd backend

# Install dependencies
npm install

# Create a .env file and configure environment variables
touch .env
```

Add the following to your `backend/.env` file:
```env
# Example .env configuration
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.itu2kef.mongodb.net/mini-order-system
PORT=5000
```
*(Remember to replace the MONGO_URI string with your actual valid connection string)*

Seed the database with initial product data (optional, but recommended):
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal window and navigate to the frontend directory:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start running locally at `http://localhost:5173` (or depending on Vite's available ports). 

## Project Architecture & Directory Layout

```
orderSystem/
├── backend/
│   ├── config/         # Database and server configuration
│   ├── controllers/    # API Request handlers (orders, products)
│   ├── models/         # Mongoose schemas (Product, Order)
│   ├── routes/         # Express routing configuration
│   ├── app.js          # Core Express application entry point
│   ├── server.js       # Node server listener
│   └── seed.js         # Initial data seeding script
└── frontend/
    ├── public/         # Static assets
    ├── src/
    │   ├── App.jsx     # Main React Tree
    │   ├── pages/      # Pages: Checkout, MockPayment, ProductList, etc.
    │   └── ...         # Components, Hooks, API utils
    ├── index.html
    └── vite.config.js
```

## Contributions

Feel free to fork the repository and submit pull requests to contribute to the Mini Order & Payment System project. For significant changes or feature requests, please open an issue to discuss your proposition first!

## License

This project is licensed under the **ISC** License.
