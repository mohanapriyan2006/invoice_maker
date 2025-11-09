import React from 'react';
import EditableField from '../hooks/OnEdit';

const Template3 = ({
    invoice,
    isDownloading,
    editableInvoice,
    setEditableInvoice,
    companyDetail,
    setCompanyDetail,
    editableField,
    setEditableField,
    moneyInWord,
    changeTitle
}) => {
    // Simple responsive values
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768 && !isDownloading;
    const fontSize = isMobile ? '11px' : '13px';
    const headingSize = isMobile ? '14px' : '16px';
    const titleSize = isMobile ? '24px' : '36px';
    const padding = isMobile ? '15px' : '25px';
    const gap = isMobile ? '15px' : '20px';

    return (
        <>
            {/* Header with Elegant Border */}
            <div style={{
                border: '3px double #34495e',
                padding: padding,
                marginBottom: '25px',
                borderRadius: '8px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: gap
                }}>
                    {/* Company Logo and Info */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: gap,
                        textAlign: isMobile ? 'center' : 'left'
                    }}>
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
                                    style={{ 
                                        width: isMobile ? '50px' : '70px', 
                                        height: isMobile ? '50px' : '70px', 
                                        objectFit: 'contain' 
                                    }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        ) : (
                            <div style={{
                                width: isMobile ? '50px' : '70px',
                                height: isMobile ? '50px' : '70px',
                                background: 'linear-gradient(135deg, #34495e, #2c3e50)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                borderRadius: '50%',
                                fontSize: fontSize
                            }}>
                                LOGO
                            </div>
                        )}

                        <div>
                            <h1 style={{
                                margin: '0 0 8px 0',
                                fontSize: titleSize,
                                fontWeight: 'bold',
                                color: '#34495e',
                                fontFamily: 'serif'
                            }}>
                                <EditableField
                                    value={editableInvoice.invoice_by?.company_name}
                                    onChange={(val) => setEditableInvoice({
                                        ...editableInvoice,
                                        invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                                    })}
                                />
                            </h1>
                            <div style={{
                                fontSize: fontSize,
                                color: '#7f8c8d',
                                fontStyle: 'italic'
                            }}>
                                Professional Services
                            </div>
                        </div>
                    </div>

                    {/* Invoice Title */}
                    <div style={{ 
                        textAlign: isMobile ? 'center' : 'right',
                        marginTop: isMobile ? '15px' : '0'
                    }}>
                        <h1 style={{
                            margin: '0',
                            fontSize: titleSize,
                            fontWeight: 'bold',
                            color: '#34495e',
                            fontFamily: 'serif',
                            letterSpacing: isMobile ? '1px' : '2px'
                        }}>
                            {changeTitle ? "PROFORMA" : "TAX"} INVOICE
                        </h1>
                        <div style={{
                            fontSize: headingSize,
                            color: '#95a5a6',
                            fontStyle: 'italic',
                            marginTop: '5px'
                        }}>
                            Premium Quality
                        </div>
                    </div>
                </div>
            </div>

            {/* Date and Invoice Info */}
            <div style={{ 
                fontSize: fontSize, 
                textAlign: 'center',
                marginBottom: '25px',
                padding: '15px',
                background: 'linear-gradient(135deg, #ecf0f1, #bdc3c7)',
                borderRadius: '5px'
            }}>
                Invoice Date: <strong>
                    <EditableField
                        value={editableField.date.invoice_date}
                        onChange={(val) => setEditableField({
                            ...editableField,
                            date: { ...editableField.date, invoice_date: val }
                        })}
                    />
                </strong> | Invoice Number: <strong>
                    <EditableField
                        value={editableInvoice.invoice_number}
                        onChange={(val) => setEditableInvoice({
                            ...editableInvoice, invoice_number: val
                        })}
                    />
                </strong>
            </div>

            {/* Main Content Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '25px',
                marginBottom: '25px'
            }}>
                {/* Invoice Details Card */}
                <div style={{
                    border: '2px solid #34495e',
                    borderRadius: '8px',
                    background: '#ffffff'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #34495e, #2c3e50)',
                        color: 'white',
                        padding: '12px 15px',
                        fontWeight: 'bold',
                        borderRadius: '6px 6px 0 0',
                        fontSize: headingSize
                    }}>
                        Invoice Details
                    </div>
                    <div style={{ padding: '15px', fontSize: fontSize }}>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Due Date:</strong> <EditableField
                                value={editableField.date.invoice_due_date}
                                onChange={(val) => setEditableField({
                                    ...editableField,
                                    date: { ...editableField.date, invoice_due_date: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Terms:</strong> <EditableField
                                value={editableInvoice.invoice_terms}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_terms: val
                                })}
                            />
                        </div>
                        <div>
                            <strong>Place of Supply:</strong> <EditableField
                                value={editableInvoice.invoice_place_of_supply}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_place_of_supply: val
                                })}
                            />
                        </div>
                    </div>
                </div>

                {/* Bill To Card */}
                <div style={{
                    border: '2px solid #34495e',
                    borderRadius: '8px',
                    background: '#ffffff'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #34495e, #2c3e50)',
                        color: 'white',
                        padding: '12px 15px',
                        fontWeight: 'bold',
                        borderRadius: '6px 6px 0 0',
                        fontSize: headingSize
                    }}>
                        Bill To
                    </div>
                    <div style={{ padding: '15px', fontSize: fontSize }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: headingSize }}>
                            <EditableField
                                value={editableInvoice.client?.customer_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_name: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '5px' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_address_line1}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line1: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '5px' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_address_line2}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line2: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '5px' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_city}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_city: val }
                                })}
                            /> - <EditableField
                                value={editableInvoice.client?.customer_postal_code}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_postal_code: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '5px' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_country}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_country: val }
                                })}
                            />
                        </div>
                        <div>
                            <strong>GSTIN:</strong> <EditableField
                                value={editableInvoice.client?.customer_gstin}
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
            <div style={{ marginBottom: '25px', overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: fontSize,
                    border: '2px solid #34495e',
                    minWidth: isMobile ? '800px' : 'auto'
                }}>
                    <thead>
                        <tr style={{ background: 'linear-gradient(135deg, #34495e, #2c3e50)', color: 'white' }}>
                            <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>#</th>
                            <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'left', minWidth: '150px' }}>Description</th>
                            {!isMobile && (
                                <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>HSN/SAC</th>
                            )}
                            <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>Qty</th>
                            <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>Rate</th>
                            {!isMobile && (
                                <>
                                    <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>CGST%</th>
                                    <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>CGST Amt</th>
                                    <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>SGST%</th>
                                    <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>SGST Amt</th>
                                    <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>IGST%</th>
                                    <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>IGST Amt</th>
                                </>
                            )}
                            <th style={{ border: '1px solid #2c3e50', padding: '12px 8px', textAlign: 'center' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.products?.map((item, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? '#f8f9fa' : 'white' }}>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{i + 1}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
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
                                    {isMobile && (
                                        <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                                            HSN: <EditableField
                                                value={editableField.products[i]?.product_hsn_sac_code || item.product_hsn_sac_code}
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
                                        </div>
                                    )}
                                </td>
                                {!isMobile && (
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                        <EditableField
                                            value={editableField.products[i]?.product_hsn_sac_code || item.product_hsn_sac_code}
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
                                )}
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_quantity}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_unit_price?.toFixed(2)}</td>
                                {!isMobile && (
                                    <>
                                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_cgst_rate}%</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_cgst_amount?.toFixed(2)}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_sgst_rate}%</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_sgst_amount?.toFixed(2)}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.invoice_item_igst_rate}%</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{item.invoice_item_igst_amount?.toFixed(2)}</td>
                                    </>
                                )}
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>₹{item.invoice_item_total_amount?.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                gap: '25px',
                marginBottom: '25px'
            }}>
                {/* Notes */}
                <div style={{ order: isMobile ? 2 : 1 }}>
                    <div style={{ padding: '15px', fontSize: fontSize, fontStyle: 'italic' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Amount in words:</strong> {moneyInWord}
                        </div>
                        <div>
                            <strong>Notes:</strong> <EditableField
                                value={editableInvoice.invoice_notes}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_notes: val
                                })}
                            />
                        </div>
                    </div>
                </div>

                {/* Totals */}
                <div style={{
                    minWidth: isMobile ? '100%' : '300px',
                    border: '2px solid #34495e',
                    borderRadius: '8px',
                    order: isMobile ? 1 : 2
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #34495e, #2c3e50)',
                        color: 'white',
                        padding: '12px 15px',
                        fontWeight: 'bold',
                        borderRadius: '6px 6px 0 0'
                    }}>
                        Summary
                    </div>
                    <div style={{ padding: '15px', fontSize: fontSize }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span>Subtotal:</span>
                            <span>₹{invoice.invoice_subtotal?.toFixed(2)}</span>
                        </div>
                        {!isMobile && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>CGST:</span>
                                    <span>₹{invoice.invoice_total_cgst?.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>SGST:</span>
                                    <span>₹{invoice.invoice_total_sgst?.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <span>IGST:</span>
                                    <span>₹{invoice.invoice_total_igst?.toFixed(2)}</span>
                                </div>
                            </>
                        )}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: 'bold',
                            fontSize: headingSize,
                            borderTop: '2px solid #34495e',
                            paddingTop: '8px',
                            color: '#34495e'
                        }}>
                            <span>Total:</span>
                            <span>₹{invoice.invoice_total?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                gap: '25px',
                borderTop: '3px double #34495e',
                paddingTop: '20px'
            }}>
                {/* Bank Details */}
                <div style={{ fontSize: fontSize, order: isMobile ? 2 : 1 }}>
                    <h4 style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#34495e' }}>Banking Information:</h4>
                    <div style={{ lineHeight: '1.5' }}>
                        <div><strong>Account:</strong> <EditableField
                            value={companyDetail.company_bank_account_no}
                            onChange={(val) => setCompanyDetail({
                                ...companyDetail, company_bank_account_no: val
                            })}
                        /></div>
                        <div><strong>Bank:</strong> <EditableField
                            value={companyDetail.company_bank_name}
                            onChange={(val) => setCompanyDetail({
                                ...companyDetail, company_bank_name: val
                            })}
                        /></div>
                        <div><strong>IFSC:</strong> <EditableField
                            value={companyDetail.company_ifsc_code}
                            onChange={(val) => setCompanyDetail({
                                ...companyDetail, company_ifsc_code: val
                            })}
                        /></div>
                    </div>
                </div>

                {/* Signature */}
                <div style={{
                    textAlign: isMobile ? 'center' : 'right',
                    fontSize: fontSize,
                    minWidth: isMobile ? '100%' : '250px',
                    order: isMobile ? 1 : 2
                }}>
                    <div style={{
                        border: '2px solid #34495e',
                        padding: '20px',
                        borderRadius: '8px',
                        background: '#f8f9fa'
                    }}>
                        <div style={{ marginBottom: '40px', fontWeight: 'bold', color: '#34495e' }}>
                            Authorized Signature
                        </div>
                        <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                            <EditableField
                                value={editableInvoice.invoice_by?.company_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div style={{
                textAlign: 'center',
                marginTop: '20px',
                fontSize: '10px',
                color: '#7f8c8d',
                fontStyle: 'italic'
            }}>
                Thank you for choosing our services. This is a digitally generated invoice.
            </div>
        </>
    );
};

export default Template3;
