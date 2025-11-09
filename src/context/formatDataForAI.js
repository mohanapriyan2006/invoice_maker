export const formatDataForAI = (companies, products, customers, invoices) => {
    const formatCompany = (c) => `
🏢 ${c.company_name}
- Owner: ${c.company_owner}
- Address: ${c.company_address}, ${c.company_city}, ${c.company_state}
- GSTIN: ${c.company_gstin}
- MSME: ${c.company_msme}
- Email: ${c.company_email}
- Bank: ${c.company_bank_name}, A/C: ${c.company_bank_account_no}, IFSC: ${c.company_ifsc_code}
  `.trim();

    const formatCustomer = (c) => `
👤 ${c.customer_name}
- To: ${c.customer_to}
- Address: ${c.customer_address_line1}, ${c.customer_address_line2}, ${c.customer_city}, ${c.customer_state}, ${c.customer_postal_code}, ${c.customer_country}
- GSTIN: ${c.customer_gstin}
- Email: ${c.customer_email}
- Phone: ${c.customer_phone}
  `.trim();

    const formatProduct = (p) => `
🛒 ${p.product_name}
- Description: ${p.product_description}
- Unit Price: ₹${p.product_unit_price}
- Unit: ${p.product_unit_of_measure}
- HSN/SAC Code: ${p.product_hsn_sac_code || "Not Available"}
- Tax: CGST ${p.product_default_cgst_rate}%, SGST ${p.product_default_sgst_rate}%, IGST ${p.product_default_igst_rate}%
  `.trim();

    const formatInvoice = (inv) => `
🧾 Invoice #${inv.invoice_number}
- Date: ${new Date(inv.invoice_date).toLocaleDateString()}
- From: ${inv.invoice_by?.company_name}, ${inv.invoice_by?.company_city} (GSTIN: ${inv.invoice_by?.company_gstin})
- To: ${inv.client?.customer_name}, ${inv.client?.customer_city} (GSTIN: ${inv.client?.customer_gstin})
- Amount: ₹${inv.invoice_total}
- Place of Supply: ${inv.invoice_place_of_supply}
- Status: ${inv.invoice_status}
- Notes: ${inv.invoice_notes || "None"}
- Terms: ${inv.invoice_terms}
  `.trim();

    return `
📦 COMPANIES:
${companies.map(formatCompany).join("\n\n")}

👥 CUSTOMERS:
${customers.map(formatCustomer).join("\n\n")}

📦 PRODUCTS (with HSN/SAC):
${products.map(formatProduct).join("\n\n")}

📄 INVOICES:
${invoices.map(formatInvoice).join("\n\n")}
  `.trim();
};
