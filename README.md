# InvoiceManager

A modern, intuitive web application for managing invoices, customers, products, and companies. Built with **React** (frontend) and **FastAPI** (backend), InvoiceManager streamlines billing and record-keeping for freelancers, small businesses, and growing enterprises.

---

## Features

- **Create & Track Invoices:** Generate professional invoices, view details, and export as PDF.
- **Customer & Product Management:** Add, edit, and manage customers and products.
- **Company Profiles:** Store and manage multiple company profiles.
- **HSN/SAC Code Assistance:** Built-in AI assistant to help you find HSN/SAC codes for products/services.
- **Recent Invoices Dashboard:** Quickly access and review your latest transactions.
- **Notes & Status:** Add notes and update invoice status (pending, completed, etc.).
- **Responsive UI:** Works great on desktop and mobile.
- **Data Privacy:** Your data stays on your device (localStorage) unless using the backend.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons
- **Backend:** FastAPI (Python), SQLite/PostgreSQL (optional)
- **PDF Export:** jsPDF, html2canvas

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- (Optional) [Python 3.10+](https://www.python.org/) for backend

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/invoice_manager.git
   cd invoice_manager/invoice_maker
   ```

2. **Install frontend dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the frontend:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **(Optional) Start the backend:**
   - Go to `invoice_api-master` and follow its `README.md` or run:
     ```sh
     pip install -r requirements.txt
     uvicorn app.main:app --reload
     ```

---

## Usage

- Access the app at [http://localhost:5173](http://localhost:5173) (default Vite port).
- Create companies, customers, and products.
- Generate invoices and export them as PDF.
- Use the AI assistant for HSN/SAC code queries.

---

## Project Structure

```
invoice_maker/
  src/
    components/      # React components (InvoiceForm, RecentInvoices, etc.)
    context/         # Context providers (DataContext, AI config)
    data/            # Static data (Terms & Conditions, etc.)
    hooks/           # Custom React hooks
    pages/           # Page components (Home, Invoices, About, etc.)
    style/           # CSS files
    API/             # API utilities
  public/            # Static assets
  package.json
  vite.config.js
  ...
```

---

## Terms & Conditions

See [src/data/Terms&Condition.js](src/data/Terms&Condition.js) or the in-app Terms & Conditions page for details.

---

## License

This project is for educational and demonstration purposes. All design, branding, and source code (except user-entered data) are the intellectual property of the developers.

---

## Credits

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/),