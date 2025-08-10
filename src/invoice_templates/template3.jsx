import React from 'react';
import EditableField from '../hooks/OnEdit';

const Template3 = ({ 
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
      fontFamily: 'Georgia, serif', 
      fontSize: '14px', 
      background: 'white', 
      color: '#2c3e50',
      lineHeight: '1.5'
    }}>
      {/* Header with Elegant Border */}
      <div style={{ 
        border: '3px double #34495e',
        padding: '25px',
        marginBottom: '25px',
        borderRadius: '8px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          {/* Company Logo and Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {companyDetail.company_logo ? (
              <div style={{ 
                border: '2px solid #34495e', 
                padding: '10px', 
                borderRadius: '50%',
                background: '#f8f9fa'
              }}>
                <img
                  src={companyDetail.company_logo}
                  alt={`${companyDetail.company_name} Logo`}
                  style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            ) : (
              <div style={{ 
                width: '70px', 
                height: '70px', 
                background: '#34495e', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 'bold',
                borderRadius: '50%',
                fontSize: '12px'
              }}>
                LOGO
              </div>
            )}
            
            <div>
              <h1 style={{ 
                margin: '0 0 5px 0', 
                fontSize: '26px', 
                fontWeight: 'bold', 
                color: '#2c3e50',
                fontFamily: 'Georgia, serif'
              }}>
                <EditableField
                  value={editableInvoice.invoice_by.company_name}
                  onChange={(val) => setEditableInvoice({
                    ...editableInvoice,
                    invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                  })}
                />
              </h1>
              <div style={{ 
                fontSize: '12px', 
                color: '#7f8c8d',
                fontStyle: 'italic' 
              }}>
                Professional Services
              </div>
            </div>
          </div>

          {/* Invoice Title */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              margin: '0', 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#2c3e50',
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              {changeTitle ? "Proforma" : "Tax"}
            </h1>
            <div style={{
              fontSize: '18px',
              color: '#7f8c8d',
              marginTop: '5px',
              letterSpacing: '2px'
            }}>
              INVOICE
            </div>
          </div>
        </div>
      </div>

      {/* Company Address Section */}
      <div style={{ 
        background: '#ecf0f1',
        padding: '15px',
        marginBottom: '25px',
        borderRadius: '5px',
        border: '1px solid #bdc3c7'
      }}>
        <div style={{ fontSize: '12px', textAlign: 'center' }}>
          <div style={{ marginBottom: '5px' }}>
            <EditableField
              value={editableInvoice.invoice_by.company_address}
              onChange={(val) => setEditableInvoice({
                ...editableInvoice,
                invoice_by: { ...editableInvoice.invoice_by, company_address: val }
              })}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span>Email: <EditableField
              value={editableInvoice.invoice_by.company_email}
              onChange={(val) => setEditableInvoice({
                ...editableInvoice,
                invoice_by: { ...editableInvoice.invoice_by, company_email: val }
              })}
            /></span>
            <span>GSTIN: <EditableField
              value={editableInvoice.invoice_by.company_gstin}
              onChange={(val) => setEditableInvoice({
                ...editableInvoice,
                invoice_by: { ...editableInvoice.invoice_by, company_gstin: val }
              })}
            /></span>
            <span>MSME: <EditableField
              value={editableInvoice.invoice_by.company_msme}
              onChange={(val) => setEditableInvoice({
                ...editableInvoice,
                invoice_by: { ...editableInvoice.invoice_by, company_msme: val }
              })}
            /></span>
          </div>
        </div>
      </div>

      {/* Invoice Info and Bill To Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '25px', 
        marginBottom: '25px' 
      }}>
        {/* Invoice Information */}
        <div style={{ 
          border: '2px solid #34495e',
          borderRadius: '5px'
        }}>
          <div style={{ 
            background: '#34495e', 
            color: 'white', 
            padding: '10px 15px', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Invoice Information
          </div>
          <div style={{ padding: '15px', fontSize: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 0', fontWeight: 'bold', width: '40%' }}>Invoice #:</td>
                  <td style={{ padding: '5px 0' }}>
                    <EditableField
                      value={editableInvoice.invoice_number}
                      onChange={(val) => setEditableInvoice({
                        ...editableInvoice, invoice_number: val
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0', fontWeight: 'bold' }}>Date:</td>
                  <td style={{ padding: '5px 0' }}>
                    <EditableField
                      value={editableField.date.invoice_date}
                      onChange={(val) => setEditableField({
                        ...editableField,
                        date: { ...editableField.date, invoice_date: val }
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0', fontWeight: 'bold' }}>Due Date:</td>
                  <td style={{ padding: '5px 0' }}>
                    <EditableField
                      value={editableField.date.invoice_due_date}
                      onChange={(val) => setEditableField({
                        ...editableField,
                        date: { ...editableField.date, invoice_due_date: val }
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0', fontWeight: 'bold' }}>Terms:</td>
                  <td style={{ padding: '5px 0' }}>
                    <EditableField
                      value={editableInvoice.invoice_terms}
                      onChange={(val) => setEditableInvoice({
                        ...editableInvoice, invoice_terms: val
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0', fontWeight: 'bold' }}>Place of Supply:</td>
                  <td style={{ padding: '5px 0' }}>
                    <EditableField
                      value={editableInvoice.invoice_place_of_supply}
                      onChange={(val) => setEditableInvoice({
                        ...editableInvoice, invoice_place_of_supply: val
                      })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bill To Section */}
        <div style={{ 
          border: '2px solid #34495e',
          borderRadius: '5px'
        }}>
          <div style={{ 
            background: '#34495e', 
            color: 'white', 
            padding: '10px 15px', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Bill To
          </div>
          <div style={{ padding: '15px', fontSize: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>
              <EditableField
                value={editableInvoice.client.customer_name}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice,
                  client: { ...editableInvoice.client, customer_name: val }
                })}
              />
            </div>
            <div style={{ lineHeight: '1.6' }}>
              <div style={{ marginBottom: '3px' }}>
                <EditableField
                  value={editableInvoice.client.customer_address_line1}
                  onChange={(val) => setEditableInvoice({
                    ...editableInvoice,
                    client: { ...editableInvoice.client, customer_address_line1: val }
                  })}
                />
              </div>
              <div style={{ marginBottom: '3px' }}>
                <EditableField
                  value={editableInvoice.client.customer_address_line2}
                  onChange={(val) => setEditableInvoice({
                    ...editableInvoice,
                    client: { ...editableInvoice.client, customer_address_line2: val }
                  })}
                />
              </div>
              <div style={{ marginBottom: '3px' }}>
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
              <div style={{ marginBottom: '3px' }}>
                <EditableField
                  value={editableInvoice.client.customer_country}
                  onChange={(val) => setEditableInvoice({
                    ...editableInvoice,
                    client: { ...editableInvoice.client, customer_country: val }
                  })}
                />
              </div>
              <div style={{ fontWeight: 'bold', marginTop: '8px' }}>
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
      </div>

      {/* Products Table */}
      <div style={{ marginBottom: '25px' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          fontSize: '11px',
          border: '2px solid #34495e',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ background: '#34495e', color: 'white' }}>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>S.No.</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'left', fontWeight: 'bold' }}>Description of Goods/Services</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>HSN/SAC</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>Qty</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>Unit Price</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>CGST %</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>CGST Amt</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>SGST %</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>SGST Amt</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>IGST %</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>IGST Amt</th>
              <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center', fontWeight: 'bold' }}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products?.map((item, i) => (
              <tr key={i} style={{ 
                background: i % 2 === 0 ? '#f8f9fa' : 'white',
                borderBottom: '1px solid #ecf0f1'
              }}>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{i + 1}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>
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
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
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
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{item.invoice_item_quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>₹{item.invoice_item_unit_price.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{item.invoice_item_cgst_rate}%</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>₹{item.invoice_item_cgst_amount.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{item.invoice_item_sgst_rate}%</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>₹{item.invoice_item_sgst_amount.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{item.invoice_item_igst_rate}%</td>
                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>₹{item.invoice_item_igst_amount.toFixed(2)}</td>
                <td style={{ 
                  border: '1px solid #ddd', 
                  padding: '10px', 
                  textAlign: 'center', 
                  fontWeight: 'bold',
                  background: '#ecf0f1'
                }}>
                  ₹{item.invoice_item_total_amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.5fr 1fr', 
        gap: '25px', 
        marginBottom: '25px' 
      }}>
        {/* Notes and Amount in Words */}
        <div>
          <div style={{ 
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            <div style={{ 
              background: '#ecf0f1', 
              padding: '8px 15px', 
              fontWeight: 'bold',
              borderBottom: '1px solid #bdc3c7'
            }}>
              Amount in Words
            </div>
            <div style={{ padding: '15px', fontSize: '12px', fontStyle: 'italic' }}>
              <EditableField
                value={moneyInWord}
                onChange={(val) => moneyInWord = val}
              />
            </div>
          </div>
          
          <div style={{ 
            border: '1px solid #bdc3c7',
            borderRadius: '5px'
          }}>
            <div style={{ 
              background: '#ecf0f1', 
              padding: '8px 15px', 
              fontWeight: 'bold',
              borderBottom: '1px solid #bdc3c7'
            }}>
              Terms & Conditions / Notes
            </div>
            <div style={{ padding: '15px', fontSize: '12px' }}>
              <EditableField
                value={editableInvoice.invoice_notes}
                onChange={(val) => setEditableInvoice({
                  ...editableInvoice, invoice_notes: val
                })}
              />
            </div>
          </div>
        </div>

        {/* Amount Summary */}
        <div style={{ 
          border: '2px solid #34495e',
          borderRadius: '5px'
        }}>
          <div style={{ 
            background: '#34495e', 
            color: 'white', 
            padding: '10px 15px', 
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Amount Summary
          </div>
          <div style={{ padding: '15px', fontSize: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 0', borderBottom: '1px solid #ecf0f1' }}>Sub Total:</td>
                  <td style={{ padding: '5px 0', textAlign: 'right', borderBottom: '1px solid #ecf0f1' }}>
                    ₹{invoice.invoice_subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0', borderBottom: '1px solid #ecf0f1' }}>CGST:</td>
                  <td style={{ padding: '5px 0', textAlign: 'right', borderBottom: '1px solid #ecf0f1' }}>
                    ₹{invoice.invoice_total_cgst.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0', borderBottom: '1px solid #ecf0f1' }}>SGST:</td>
                  <td style={{ padding: '5px 0', textAlign: 'right', borderBottom: '1px solid #ecf0f1' }}>
                    ₹{invoice.invoice_total_sgst.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0', borderBottom: '2px solid #34495e' }}>IGST:</td>
                  <td style={{ padding: '5px 0', textAlign: 'right', borderBottom: '2px solid #34495e' }}>
                    ₹{invoice.invoice_total_igst.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ 
                    padding: '10px 0 5px 0', 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    color: '#2c3e50'
                  }}>
                    Total Amount:
                  </td>
                  <td style={{ 
                    padding: '10px 0 5px 0', 
                    textAlign: 'right', 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    color: '#2c3e50'
                  }}>
                    ₹{invoice.invoice_total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer with Bank Details and Signature */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.5fr 1fr', 
        gap: '25px',
        borderTop: '2px double #34495e',
        paddingTop: '20px'
      }}>
        {/* Bank Details */}
        <div style={{ 
          border: '1px solid #bdc3c7',
          borderRadius: '5px'
        }}>
          <div style={{ 
            background: '#ecf0f1', 
            padding: '8px 15px', 
            fontWeight: 'bold',
            borderBottom: '1px solid #bdc3c7'
          }}>
            Bank Details
          </div>
          <div style={{ padding: '15px', fontSize: '11px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '3px 0', fontWeight: 'bold', width: '35%' }}>Account No:</td>
                  <td style={{ padding: '3px 0' }}>
                    <EditableField
                      value={companyDetail.company_bank_account_no}
                      onChange={(val) => setCompanyDetail({
                        ...companyDetail, company_bank_account_no: val
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 0', fontWeight: 'bold' }}>Bank Name:</td>
                  <td style={{ padding: '3px 0' }}>
                    <EditableField
                      value={companyDetail.company_bank_name}
                      onChange={(val) => setCompanyDetail({
                        ...companyDetail, company_bank_name: val
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 0', fontWeight: 'bold' }}>Account Holder:</td>
                  <td style={{ padding: '3px 0' }}>
                    <EditableField
                      value={companyDetail.company_name}
                      onChange={(val) => setCompanyDetail({
                        ...companyDetail, company_name: val
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 0', fontWeight: 'bold' }}>Branch:</td>
                  <td style={{ padding: '3px 0' }}>
                    <EditableField
                      value={companyDetail.company_branch}
                      onChange={(val) => setCompanyDetail({
                        ...companyDetail, company_branch: val
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 0', fontWeight: 'bold' }}>IFSC Code:</td>
                  <td style={{ padding: '3px 0' }}>
                    <EditableField
                      value={companyDetail.company_ifsc_code}
                      onChange={(val) => setCompanyDetail({
                        ...companyDetail, company_ifsc_code: val
                      })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Authorized Signature */}
        <div style={{ 
          border: '1px solid #bdc3c7',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <div style={{ 
            background: '#ecf0f1', 
            padding: '8px 15px', 
            fontWeight: 'bold',
            borderBottom: '1px solid #bdc3c7'
          }}>
            For <EditableField
              value={editableInvoice.invoice_by.company_name}
              onChange={(val) => setEditableInvoice({
                ...editableInvoice,
                invoice_by: { ...editableInvoice.invoice_by, company_name: val }
              })}
            />
          </div>
          <div style={{ 
            padding: '40px 15px 15px 15px', 
            fontSize: '12px'
          }}>
            <div style={{ 
              borderTop: '1px solid #34495e',
              paddingTop: '5px',
              marginTop: '45px',
              fontWeight: 'bold'
            }}>
              Authorized Signatory
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ 
        textAlign: 'center', 
        fontSize: '10px', 
        color: '#7f8c8d',
        marginTop: '20px',
        fontStyle: 'italic'
      }}>
        This is a computer generated invoice and does not require a signature.
      </div>
    </div>
  );
};

export default Template3;
