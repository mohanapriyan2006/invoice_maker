# InvoiceManager

<div align="center">

<img src="./public/logo.png" width="140" alt="InvoiceManager" />

# InvoiceManager

### Create. Manage. Track. Get Paid.

A modern invoice management platform designed for freelancers, startups, agencies, and growing businesses.

[Live Demo](https://msinvoice.vercel.app/) •
[Features](#features) •
[Architecture](#architecture) •
[Getting Started](#getting-started)

<br/>

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge\&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?style=for-the-badge\&logo=fastapi)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge\&logo=tailwindcss)
![PDF Export](https://img.shields.io/badge/PDF-Export-red?style=for-the-badge)
![Business Tools](https://img.shields.io/badge/Business-Management-black?style=for-the-badge)

</div>

---

## Overview

InvoiceManager is a complete billing and business management solution that helps organizations create professional invoices, manage customers, organize products, maintain company profiles, and streamline financial record-keeping.

Built with a clean and intuitive interface, InvoiceManager reduces administrative overhead while helping businesses maintain accurate invoicing workflows.

Whether you're a freelancer, consultant, agency, retailer, or enterprise team, InvoiceManager provides the tools needed to manage billing operations efficiently.

---

## Why InvoiceManager?

Managing invoices manually often leads to:

* Duplicate records
* Payment tracking issues
* Customer management challenges
* Tax classification confusion
* Inconsistent invoice formats

InvoiceManager centralizes everything into a single platform.

### Traditional Workflow

```text
Create Invoice Manually
        ↓
Track Customer Separately
        ↓
Maintain Product Records
        ↓
Generate PDF Externally
        ↓
Store Files Manually
```

### InvoiceManager Workflow

```text
Companies
     ↓
Customers
     ↓
Products
     ↓
Invoice Creation
     ↓
PDF Export
     ↓
Status Tracking
```

---

## Features

### Professional Invoice Creation

Create polished and business-ready invoices within minutes.

Capabilities:

* Invoice generation
* Invoice editing
* Invoice history
* Detailed invoice view
* GST-ready layouts
* Professional formatting
* Downloadable PDF invoices

---

### Customer Management

Maintain customer information in one place.

Features:

* Customer profiles
* Contact information
* Invoice associations
* Customer history
* Quick search and retrieval

---

### Product Management

Organize products and services used in invoices.

Capabilities:

* Product catalog
* Pricing management
* Tax information
* Product descriptions
* Reusable invoice items

---

### Multi-Company Support

Manage multiple business entities from a single platform.

Store:

* Company information
* GST details
* Addresses
* Contact information
* Branding data

Perfect for agencies, consultants, and businesses operating multiple entities.

---

### Invoice Status Tracking

Track the lifecycle of every invoice.

Supported workflows:

```text
Draft
 ↓
Pending
 ↓
Sent
 ↓
Completed
```

Maintain visibility over payment progress and client interactions.

---

### Notes & Documentation

Add contextual information to invoices.

Use notes for:

* Internal records
* Payment instructions
* Client communication
* Additional invoice details

---

### HSN/SAC AI Assistant

Built-in AI assistance helps businesses identify appropriate:

* HSN Codes
* SAC Codes
* Product classifications
* Service classifications

Reducing manual effort and improving invoicing accuracy.

---

### Recent Invoices Dashboard

Get quick access to:

* Latest invoices
* Recent transactions
* Customer activities
* Invoice summaries

Designed for faster business operations.

---

### Privacy-First Design

Your data remains under your control.

Features:

* Local-first storage
* Browser persistence
* No mandatory cloud dependency
* Optional backend integration

Ideal for businesses that value data ownership.

---

## Product Architecture

```text
┌──────────────────────┐
│ Company Profiles     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Customer Management  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Product Catalog      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Invoice Generator    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PDF Export Engine    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Invoice Tracking     │
└──────────────────────┘
```

---

## Tech Stack

### Frontend

```txt
React
Vite
Tailwind CSS
Lucide Icons
React Context API
```

### Backend

```txt
FastAPI
Python
REST APIs
SQLite
PostgreSQL (Optional)
```

### Document Generation

```txt
jsPDF
html2canvas
PDF Export Engine
```

---

## Project Structure

```text
invoice_manager/

├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── API/
│   ├── data/
│   └── style/
│
├── public/
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

* Node.js 16+
* npm or yarn
* Python 3.10+ (Optional)

---

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/invoice_manager.git
```

Navigate to project:

```bash
cd invoice_manager/invoice_maker
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application:

```text
http://localhost:5173
```

---

## Backend Setup (Optional)

Navigate to backend:

```bash
cd invoice_api-master
```

Install requirements:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend API:

```text
http://localhost:8000
```

---

## Use Cases

### Freelancers

* Create professional invoices
* Track clients
* Export billing documents

### Agencies

* Manage multiple customers
* Handle recurring projects
* Maintain invoice history

### Small Businesses

* Organize products and services
* Track payments
* Manage company records

### Growing Enterprises

* Centralized invoice operations
* Business record management
* Scalable invoicing workflows

---

## Roadmap

### Current

* Invoice Creation
* Customer Management
* Product Management
* Company Profiles
* PDF Export
* HSN/SAC Assistant

### Upcoming

* User Authentication
* Cloud Synchronization
* Payment Gateway Integration
* Invoice Sharing
* Email Delivery
* GST Reporting
* Recurring Invoices
* Analytics Dashboard
* Team Collaboration
* Mobile Application

---

## Live Application

🌐 https://msinvoice.vercel.app/

---

## License

This project is intended for educational, demonstration, and business management purposes.

Choose your preferred license:

* MIT
* Apache 2.0
* Proprietary

---

## Vision

Businesses should spend less time managing paperwork and more time growing revenue.

InvoiceManager aims to provide a fast, intuitive, and reliable invoicing experience that helps organizations stay organized, professional, and efficient.

---

<div align="center">

### Simplifying Business Billing & Invoice Management

⭐ Star the repository if you find InvoiceManager useful.

**InvoiceManager — Modern Invoicing for Modern Businesses.**

https://msinvoice.vercel.app/

</div>
