# Construction Tracker & AI Expense Management System

A full-stack **Construction Site Management & Expense Tracking** platform built using **React, Node.js, Express, MongoDB, LangChain, and Groq AI**.

This application helps manage:

- Construction sites
- Material expenses
- Labour expenses
- Budget tracking
- AI-powered construction data assistant
- Real-time construction analytics

The project combines traditional CRUD operations with an **AI-powered assistant** capable of querying construction data using natural language.

---

# Features

## Construction Site Management
- Create construction sites
- Update site details
- Delete sites
- Track owner and location
- Manage start/end dates

---

## Material Expense Tracking
- Add materials
- Update material details
- Track:
  - quantity
  - price
  - brand
  - purchase date
  - payment date
  - payment method

---

## Labour Expense Management
- Add labour entries
- Update labour payments
- Track:
  - labour type
  - salary
  - payment method
  - work dates

---

## AI-Powered Construction Assistant

Integrated AI assistant using:

- LangChain
- Groq LLM
- MongoDB Tool Calling

Users can ask questions like:

```text
What is the total material cost?
```

```text
Which site has highest expenses?
```

```text
Show labour expenses for Site A
```

The AI dynamically generates MongoDB queries using LangChain tools.

---

# Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- Recharts

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- WebSockets

## AI Stack
- LangChain
- Groq LLM
- Tool Calling Agents

---

# AI Workflow

```text
User Question
      ↓
Groq LLM
      ↓
LangChain Tool Calling
      ↓
MongoDB Query Generation
      ↓
Database Execution
      ↓
Formatted AI Response
```

---

# Key Features Implemented

- Full Stack MERN Architecture
- AI-Powered Database Querying
- Natural Language Construction Analytics
- JWT Authentication
- REST APIs
- MongoDB Aggregation
- WebSocket Integration
- Dynamic Expense Tracking
- Budget Management
- Responsive Dashboard

---

# Project Structure

```text
construction_tracker/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── dbconfig/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

# Backend Features

## Authentication
- JWT-based login/signup
- Protected routes
- Middleware authentication

---

## Site Management APIs
- Create site
- Get all sites
- Get site by ID
- Delete site

---

## Expense Management APIs
- Add materials
- Update materials
- Add labour
- Update labour

---

## AI Assistant API

The AI assistant uses:

- LangChain Tool Calling
- MongoDB Aggregation
- Groq LLM

to answer database-related questions dynamically.

---

# Environment Variables

Create `.env` file inside backend folder.

```env
MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_groq_api_key
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/kiranb9767/construction_tracker.git

cd construction_tracker
```

---

# Install Backend Dependencies

```bash
cd backend

npm install
```

---

# Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

# Run Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Run Frontend

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Database Schema

## Site

```text
- name
- location
- owner
- budget
- startDate
- endDate
```

---

## Materials

```text
- name
- quantity
- unit
- price
- brand
- dateOfPurchase
- dateOfPayment
- mediumofPayment
```

---

## Labours

```text
- name
- labourType
- salary
- date
- mediumofPayment
```

---

# AI Assistant Capabilities

The AI assistant can:

- Calculate total expenses
- Find remaining budget
- Compare site expenses
- Filter material costs
- Analyze labour expenses
- Generate construction insights

without writing manual MongoDB queries.

---

# Frontend Features

- Responsive UI
- Dashboard Layout
- Expense Tracking
- Site Management
- Data Visualization
- Charts using Recharts

---

# Future Improvements

- Role-Based Access
- PDF Report Generation
- Expense Prediction using AI
- Docker Deployment

---

# APIs & Services Used

- MongoDB Atlas
- Groq API
- LangChain
- JWT Authentication

---

# Example Use Cases

- Construction Expense Tracking
- Site Budget Management
- Labour Management
- AI-Based Expense Analytics
- Construction Reporting

---

# Author

Kiran Burle

GitHub:
https://github.com/kiranb9767

---


# GitHub Topics

mern-stack
construction-management
expense-tracker
langchain
groq
mongodb
reactjs
nodejs
ai-assistant
construction-analytics
jwt-authentication

