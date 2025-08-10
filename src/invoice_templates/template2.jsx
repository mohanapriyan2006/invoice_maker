import React from 'react';
import EditableField from '../hooks/OnEdit';

const Template2 = ({ 
  componentRef, 
  invoice, 
  editableInvoice, 
  setEditableInvoice, 
  companyDetail, 
  setCompanyDetail, 
  editableField, 
  setEditableField, 
  moneyInWord, 
  changeTitle 
}) => {
  
  return (
    <div ref={componentRef} style={{ 
      maxWidth: '1024px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif', 
      fontSize: '14px', 
      background: 'white', 
      color: '#333',
      lineHeight: '1.4'
    }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '3px solid #2c3e50'
      }}>
        {/* Company Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {companyDetail.company_logo ? (
            <div style={{ 
              border: '2px solid #2c3e50', 
              borderRadius: '8px', 
              padding: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <img
                src={companyDetail.company_logo}
                alt={`${companyDetail.company_name} Logo`}
                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ) : (
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: '#2c3e50', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              borderRadius: '8px'
            }}>
              LOGO
            </div>
          )}
          
          <div>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#2c3e50' 
            }}>
              <EditableField
                value={editableInvoice.invoice_by.company_name}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                })}
              />
            </h1>
            <div style={{ color: '#555', fontSize: '12px' }}>
              <div style={{ marginBottom: '4px' }}>
                <EditableField
                  value={editableInvoice.invoice_by.company_address}
                  onChange={(val) => setEditableInvoice({
                    ...editableInvoice,
                    invoice_by: { ...editableInvoice.invoice_by, company_address: val }
                  })}
                />
              </div>
              <div style={{ marginBottom: '4px' }}>
                Email: <EditableField
                  value={editableInvoice.invoice_by.company_email}
                  onChange={(val) => setEditableInvoice({
                    ...editableInvoice,
                    invoice_by: { ...editableInvoice.invoice_by, company_email: val }
                  })}
                />
              </div>
              <div>
                GSTIN: <EditableField
                  value={editableInvoice.invoice_by.company_gstin}
                  onChange={(val) => setEditableInvoice({
                    ...editableInvoice,
                    invoice_by: { ...editableInvoice.invoice_by, company_gstin: val }
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Title */}
        <div style={{ textAlign: 'right' }}>
          <h1 style={{ 
            margin: '0', 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            letterSpacing: '2px'
          }}>
            {changeTitle ? "PROFORMA" : "TAX"} INVOICE
          </h1>
        </div>
      </div>

      {/* Invoice Details & Client Info */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '30px', 
        marginBottom: '30px' 
      }}>
        {/* Invoice Details */}
        <div>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            borderBottom: '2px solid #ecf0f1',
            paddingBottom: '8px'
          }}>
            Invoice Details
          </h3>
          <div style={{ fontSize: '12px' }}>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#555' }}>Invoice #:</span>
              <EditableField
                value={editableInvoice.invoice_number}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice, invoice_number: val
                })}
              />
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#555' }}>Date:</span>
              <EditableField
                value={editableField.date.invoice_date}
                onChange={(val) => setEditableField({
                  ...editableField,
                  date: { ...editableField.date, invoice_date: val }
                })}
              />
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#555' }}>Due Date:</span>
              <EditableField
                value={editableField.date.invoice_due_date}
                onChange={(val) => setEditableField({
                  ...editableField,
                  date: { ...editableField.date, invoice_due_date: val }
                })}
              />
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#555' }}>Terms:</span>
              <EditableField
                value={editableInvoice.invoice_terms}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice, invoice_terms: val
                })}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ width: '100px', fontWeight: 'bold', color: '#555' }}>Place of Supply:</span>
              <EditableField
                value={editableInvoice.invoice_place_of_supply}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice, invoice_place_of_supply: val
                })}
              />
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#2c3e50',
            borderBottom: '2px solid #ecf0f1',
            paddingBottom: '8px'
          }}>
            Bill To
          </h3>
          <div style={{ fontSize: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#2c3e50' }}>
              <EditableField
                value={editableInvoice.client.customer_name}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_name: val }
                })}
              />
            </div>
            <div style={{ marginBottom: '4px' }}>
              <EditableField
                value={editableInvoice.client.customer_address_line1}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_address_line1: val }
                })}
              />
            </div>
            <div style={{ marginBottom: '4px' }}>
              <EditableField
                value={editableInvoice.client.customer_address_line2}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_address_line2: val }
                })}
              />
            </div>
            <div style={{ marginBottom: '4px' }}>
              <EditableField
                value={editableInvoice.client.customer_city}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_city: val }
                })}
              /> - <EditableField
                value={editableInvoice.client.customer_postal_code}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_postal_code: val }
                })}
              />
            </div>
            <div style={{ marginBottom: '4px' }}>
              <EditableField
                value={editableInvoice.client.customer_country}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_country: val }
                })}
              />
            </div>
            <div>
              GSTIN: <EditableField
                value={editableInvoice.client.customer_gstin}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_gstin: val }
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div style={{ marginBottom: '30px' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          fontSize: '11px',
          border: '2px solid #2c3e50'
        }}>
          <thead>
            <tr style={{ background: '#2c3e50', color: 'white' }}>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>#</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'left', fontWeight: 'bold' }}>Item & Description</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>HSN/SAC</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>Qty</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>Rate</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>CGST%</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>CGST Amt</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>SGST%</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>SGST Amt</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>IGST%</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>IGST Amt</th>
              <th style={{ border: '1px solid #34495e', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products?.map((item, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f8f9fa' : 'white' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{i + 1}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  <EditableField
                    value={editableField.products[i]?.invoice_item_name || item.invoice_item_name}
                    onChange={(val) => {
                      setEditableField({
                        ...editableField,
                        products: {
                          ...editableField.products,
                          [i]: {
                            ...editableField.products[i],
                            invoice_item_name: val
                          }
                        }
                      });
                    }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <EditableField
                    value={editableField.products[i]?.product_hsn_sac_code}
                    onChange={(val) => {
                      setEditableField({
                        ...editableField,
                        products: {
                          ...editableField.products,
                          [i]: {
                            ...editableField.products[i],
                            product_hsn_sac_code: val
                          }
                        }
                      });
                    }}
                  />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_unit_price.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_cgst_rate}%</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_cgst_amount.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_sgst_rate}%</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_sgst_amount.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_igst_rate}%</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_igst_amount.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>₹{item.invoice_item_total_amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals and Notes Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto', 
        gap: '30px', 
        marginBottom: '30px' 
      }}>
        {/* Notes */}
        <div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Total In Words: </span>
            <EditableField
              value={moneyInWord}
              onChange={(val) => moneyInWord = val}
            />
          </div>
          <div>
            <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Notes: </span>
            <EditableField
              value={editableInvoice.invoice_notes}
              onChange={(val) => setEditableInvoice({
                ...editableInvoice, invoice_notes: val
              })}
            />
          </div>
        </div>

        {/* Totals */}
        <div style={{ 
          minWidth: '250px', 
          border: '2px solid #2c3e50',
          borderRadius: '8px'
        }}>
          <div style={{ 
            background: '#2c3e50', 
            color: 'white', 
            padding: '8px 15px', 
            fontWeight: 'bold',
            borderRadius: '6px 6px 0 0'
          }}>
            Summary
          </div>
          <div style={{ padding: '15px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Sub Total:</span>
              <span>₹{invoice.invoice_subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>CGST:</span>
              <span>₹{invoice.invoice_total_cgst.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>SGST:</span>
              <span>₹{invoice.invoice_total_sgst.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>IGST:</span>
              <span>₹{invoice.invoice_total_igst.toFixed(2)}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontWeight: 'bold', 
              fontSize: '14px',
              borderTop: '2px solid #2c3e50',
              paddingTop: '8px',
              color: '#2c3e50'
            }}>
              <span>Total:</span>
              <span>₹{invoice.invoice_total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto', 
        gap: '30px',
        borderTop: '2px solid #ecf0f1',
        paddingTop: '20px'
      }}>
        {/* Bank Details */}
        <div style={{ fontSize: '11px' }}>
          <h4 style={{ 
            margin: '0 0 10px 0', 
            fontWeight: 'bold', 
            color: '#2c3e50' 
          }}>
            Bank Details:
          </h4>
          <div style={{ lineHeight: '1.5' }}>
            <div>Account No: <span style={{ fontWeight: 'bold' }}>
              <EditableField
                value={companyDetail.company_bank_account_no}
                onChange={(val) => setCompanyDetail({
                  ...companyDetail, company_bank_account_no: val
                })}
              />
            </span></div>
            <div>Bank Name: <span style={{ fontWeight: 'bold' }}>
              <EditableField
                value={companyDetail.company_bank_name}
                onChange={(val) => setCompanyDetail({
                  ...companyDetail, company_bank_name: val
                })}
              />
            </span></div>
            <div>Account Holder: <span style={{ fontWeight: 'bold' }}>
              <EditableField
                value={companyDetail.company_name}
                onChange={(val) => setCompanyDetail({
                  ...companyDetail, company_name: val
                })}
              />
            </span></div>
            <div>Branch: <span style={{ fontWeight: 'bold' }}>
              <EditableField
                value={companyDetail.company_branch}
                onChange={(val) => setCompanyDetail({
                  ...companyDetail, company_branch: val
                })}
              />
            </span></div>
            <div>IFSC Code: <span style={{ fontWeight: 'bold' }}>
              <EditableField
                value={companyDetail.company_ifsc_code}
                onChange={(val) => setCompanyDetail({
                  ...companyDetail, company_ifsc_code: val
                })}
              />
            </span></div>
          </div>
        </div>

        {/* Signature */}
        <div style={{ 
          textAlign: 'right', 
          fontSize: '12px',
          minWidth: '200px'
        }}>
          <div style={{ 
            border: '2px solid #2c3e50', 
            padding: '15px',
            borderRadius: '8px'
          }}>
            <div style={{ marginBottom: '50px', fontWeight: 'bold', color: '#2c3e50' }}>
              Authorized Signature
            </div>
            <div style={{ fontWeight: 'bold' }}>
              For <EditableField
                value={editableInvoice.invoice_by.company_name}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;
