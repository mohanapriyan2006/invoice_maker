// Local storage data layer for preview deployments (no backend)
// Provides simple CRUD and auth using localStorage

const LS_KEYS = {
  users: 'im_users',
  companies: 'im_companies',
  products: 'im_products',
  customers: 'im_customers',
  invoices: 'im_invoices'
};

const delay = (ms=200) => new Promise(res => setTimeout(res, ms));

const b64url = (str) =>
  btoa(unescape(encodeURIComponent(str)))
    .replace(/=+$/,'')
    .replace(/\+/g,'-')
    .replace(/\//g,'_');

export const createLocalToken = (user, daysValid = 7) => {
  const header = { alg: 'none', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + daysValid * 24 * 3600;
  const payload = { sub: user.user_name, role: user.role, exp };
  const token = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}.`;
  return token;
};

const read = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const nextId = (arr, field) => (arr.length ? Math.max(...arr.map(x => x[field] || 0)) + 1 : 1);

export const seedIfEmpty = () => {
  if (!localStorage.getItem(LS_KEYS.users)) {
    const users = [
      { id: 1, name: 'Demo Artist', user_name: 'artist01', role: 'artist', email: 'artist@example.com', password: 'pass1234' },
      { id: 2, name: 'Demo Collector', user_name: 'collector01', role: 'collector', email: 'collector@example.com', password: 'pass1234' }
    ];
    write(LS_KEYS.users, users);
  }

  if (!localStorage.getItem(LS_KEYS.companies)) {
    const companies = [
      { company_id: 1, company_name: 'Demo Company Pvt Ltd', company_logo: '', company_address: '123, Main Street', company_state: 'Tamil Nadu', company_city: 'Chennai', company_email: 'info@demo.com', company_gstin: '22AAAAA0000A1Z5', company_msme: 'UDYAM-TN-0001', company_bank_account_no: '1234567890', company_bank_name: 'Demo Bank', company_account_holder: 'Demo Company', company_branch: 'Main', company_ifsc_code: 'DEMO0001234', created_at: new Date().toISOString() }
    ];
    write(LS_KEYS.companies, companies);
  }

  if (!localStorage.getItem(LS_KEYS.products)) {
    const now = new Date().toISOString();
    const products = [
      { product_id: 1, company_id: 1, product_name: 'Canvas', product_description: 'Premium cotton canvas', product_unit_of_measure: 'Piece', product_default_cgst_rate: 9, product_default_sgst_rate: 9, product_default_igst_rate: 18, product_unit_price: 1000, product_hsn_sac_code: '4911', created_at: now },
      { product_id: 2, company_id: 1, product_name: 'Oil Paint', product_description: 'Artist grade oil color', product_unit_of_measure: 'Tube', product_default_cgst_rate: 9, product_default_sgst_rate: 9, product_default_igst_rate: 18, product_unit_price: 500, product_hsn_sac_code: '3208', created_at: now }
    ];
    write(LS_KEYS.products, products);
  }

  if (!localStorage.getItem(LS_KEYS.customers)) {
    const now = new Date().toISOString();
    const customers = [
      { customer_id: 1, company_id: 1, customer_to: 1, customer_name: 'ACME Corp', customer_address_line1: 'ACME Park', customer_address_line2: 'Sector 1', customer_city: 'Bengaluru', customer_state: 'Karnataka', customer_postal_code: '560001', customer_country: 'India', customer_gstin: '29AAAAA0000A1Z5', customer_email: 'accounts@acme.com', customer_phone: '9876543210', created_at: now }
    ];
    write(LS_KEYS.customers, customers);
  }

  if (!localStorage.getItem(LS_KEYS.invoices)) {
    const invoices = [];
    write(LS_KEYS.invoices, invoices);
  }
};

// Auth
export const registerUser = async ({ name, user_name, role, email, password }) => {
  await delay();
  const users = read(LS_KEYS.users);
  if (users.some(u => u.user_name.toLowerCase() === user_name.toLowerCase())) {
    const err = new Error('Username already registered');
    err.code = 'USERNAME_TAKEN';
    throw err;
  }
  const id = nextId(users, 'id');
  const newUser = { id, name, user_name, role, email, password };
  users.push(newUser);
  write(LS_KEYS.users, users);
  return { id, name, user_name, role, email };
};

export const loginUser = async ({ user_name, password }) => {
  await delay();
  const users = read(LS_KEYS.users);
  const user = users.find(u => u.user_name === user_name && u.password === password);
  if (!user) {
    const err = new Error('Invalid username or password');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }
  const token = createLocalToken(user);
  const user_details = { id: user.id, name: user.name, user_name: user.user_name, role: user.role, email: user.email };
  return { access_token: token, user_details };
};

// Queries
export const getCompanies = async () => {
  await delay();
  return read(LS_KEYS.companies);
};

export const getProducts = async (company_id) => {
  await delay();
  const all = read(LS_KEYS.products);
  return all.filter(p => String(p.company_id) === String(company_id));
};

export const getCustomers = async (company_id) => {
  await delay();
  const all = read(LS_KEYS.customers);
  return all.filter(c => String(c.company_id) === String(company_id));
};

export const getInvoices = async (company_id) => {
  await delay();
  const all = read(LS_KEYS.invoices);
  return all.filter(inv => String(inv.company_id) === String(company_id));
};

// Mutations (optional for preview)
export const addInvoice = async (invoice) => {
  await delay();
  const invoices = read(LS_KEYS.invoices);
  const id = nextId(invoices, 'invoice_id');
  const newInv = { ...invoice, invoice_id: id };
  invoices.push(newInv);
  write(LS_KEYS.invoices, invoices);
  return newInv;
};

export const updateInvoice = async (invoice_id, patch) => {
  await delay();
  const invoices = read(LS_KEYS.invoices);
  const idx = invoices.findIndex(i => i.invoice_id === invoice_id);
  if (idx === -1) throw new Error('Invoice not found');
  invoices[idx] = { ...invoices[idx], ...patch };
  write(LS_KEYS.invoices, invoices);
  return invoices[idx];
};

export const removeInvoice = async (invoice_id) => {
  await delay();
  const invoices = read(LS_KEYS.invoices).filter(i => i.invoice_id !== invoice_id);
  write(LS_KEYS.invoices, invoices);
};

// -----------------------------
// Companies CRUD
// -----------------------------
export const addCompany = async (company) => {
  await delay();
  const companies = read(LS_KEYS.companies);
  const company_id = nextId(companies, 'company_id');
  const created_at = new Date().toISOString();
  const newCompany = { ...company, company_id, created_at };
  companies.push(newCompany);
  write(LS_KEYS.companies, companies);
  return newCompany;
};

export const updateCompany = async (company_id, patch) => {
  await delay();
  const companies = read(LS_KEYS.companies);
  const idx = companies.findIndex(c => c.company_id === company_id);
  if (idx === -1) throw new Error('Company not found');
  companies[idx] = { ...companies[idx], ...patch };
  write(LS_KEYS.companies, companies);
  return companies[idx];
};

export const removeCompany = async (company_id) => {
  await delay();
  // Remove company
  const companies = read(LS_KEYS.companies).filter(c => c.company_id !== company_id);
  write(LS_KEYS.companies, companies);
  // Cascade delete related products, customers, invoices
  const products = read(LS_KEYS.products).filter(p => p.company_id !== company_id);
  write(LS_KEYS.products, products);
  const customers = read(LS_KEYS.customers).filter(c => c.company_id !== company_id);
  write(LS_KEYS.customers, customers);
  const invoices = read(LS_KEYS.invoices).filter(i => i.company_id !== company_id);
  write(LS_KEYS.invoices, invoices);
};

// -----------------------------
// Products CRUD
// -----------------------------
export const addProduct = async (product) => {
  await delay();
  const products = read(LS_KEYS.products);
  const product_id = nextId(products, 'product_id');
  const created_at = new Date().toISOString();
  const newProduct = { ...product, product_id, created_at };
  products.push(newProduct);
  write(LS_KEYS.products, products);
  return newProduct;
};

export const updateProduct = async (product_id, patch) => {
  await delay();
  const products = read(LS_KEYS.products);
  const idx = products.findIndex(p => p.product_id === product_id);
  if (idx === -1) throw new Error('Product not found');
  products[idx] = { ...products[idx], ...patch };
  write(LS_KEYS.products, products);
  return products[idx];
};

export const removeProduct = async (product_id) => {
  await delay();
  const products = read(LS_KEYS.products).filter(p => p.product_id !== product_id);
  write(LS_KEYS.products, products);
  // Optionally remove product from invoices' items
  const invoices = read(LS_KEYS.invoices);
  invoices.forEach(inv => {
    if (Array.isArray(inv.invoice_items)) {
      inv.invoice_items = inv.invoice_items.filter(it => it.product_id !== product_id);
    }
  });
  write(LS_KEYS.invoices, invoices);
};

// -----------------------------
// Customers CRUD
// -----------------------------
export const addCustomer = async (customer) => {
  await delay();
  const customers = read(LS_KEYS.customers);
  const customer_id = nextId(customers, 'customer_id');
  const created_at = new Date().toISOString();
  const newCustomer = { ...customer, customer_id, created_at };
  customers.push(newCustomer);
  write(LS_KEYS.customers, customers);
  return newCustomer;
};

export const updateCustomer = async (customer_id, patch) => {
  await delay();
  const customers = read(LS_KEYS.customers);
  const idx = customers.findIndex(c => c.customer_id === customer_id);
  if (idx === -1) throw new Error('Customer not found');
  customers[idx] = { ...customers[idx], ...patch };
  write(LS_KEYS.customers, customers);
  return customers[idx];
};

export const removeCustomer = async (customer_id) => {
  await delay();
  const customers = read(LS_KEYS.customers).filter(c => c.customer_id !== customer_id);
  write(LS_KEYS.customers, customers);
  // Remove invoices that reference this customer (optional: or just detach)
  const invoices = read(LS_KEYS.invoices).map(inv => {
    if (inv.customer_company === customer_id) {
      return { ...inv, customer_company: null };
    }
    return inv;
  });
  write(LS_KEYS.invoices, invoices);
};

// -----------------------------
// Users (minimal) CRUD
// -----------------------------
export const updateUser = async (user_name, patch) => {
  await delay();
  const users = read(LS_KEYS.users);
  const idx = users.findIndex(u => u.user_name === user_name);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...patch };
  write(LS_KEYS.users, users);
  return { ...users[idx], password: undefined };
};

export const removeUser = async (user_name) => {
  await delay();
  const users = read(LS_KEYS.users).filter(u => u.user_name !== user_name);
  write(LS_KEYS.users, users);
};
