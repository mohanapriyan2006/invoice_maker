import React from 'react';
import EditableField from '../hooks/OnEdit';

const Template2 = ({
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
    // Responsive utility function
    const getResponsiveValue = (mobile, tablet, desktop) => {
        if (typeof window === 'undefined') return desktop;
        const width = window.innerWidth;
        if (width <= 768) return mobile;
        if (width <= 1024) return tablet;
        return desktop;
    };

    // Responsive object with dynamic values
    const responsive = {
        isMobile: typeof window !== 'undefined' && window.innerWidth <= 768,
        isTablet: typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: isDownloading || (typeof window !== 'undefined' && window.innerWidth > 1024),
        
        // Spacing
        gap: getResponsiveValue('8px', '12px', '15px'),
        padding: getResponsiveValue('8px', '12px', '15px'),
        cardPadding: getResponsiveValue('12px', '15px', '20px'),
        largeGap: getResponsiveValue('16px', '24px', '30px'),
        
        // Typography
        fontSize: getResponsiveValue('11px', '12px', '12px'),
        headingSize: getResponsiveValue('14px', '16px', '16px'),
        titleSize: getResponsiveValue('24px', '28px', '32px'),
        
        // Layout
        borderRadius: getResponsiveValue('6px', '8px', '8px'),
        logoSize: getResponsiveValue('40px', '50px', '60px'),
    
    };

    return (
        <>
            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: responsive.largeGap,
                paddingBottom: responsive.padding,
                borderBottom: '3px solid #2c3e50',
                flexDirection: (responsive.isMobile && !isDownloading) ? 'column' : 'row',
                gap: responsive.gap
            }}>
                {/* Company Info */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: responsive.gap,
                    flexDirection: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'column' : 'row',
                    textAlign: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'center' : 'left'
                }}>
                    {companyDetail.company_logo ? (
                        <div style={{
                            border: '2px solid #2c3e50',
                            borderRadius: responsive.borderRadius,
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={companyDetail.company_logo}
                                alt={`${companyDetail.company_name} Logo`}
                                style={{ width: responsive.logoSize, height: responsive.logoSize, objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    ) : (
                        <div style={{
                            width: responsive.logoSize,
                            height: responsive.logoSize,
                            background: '#2c3e50',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            borderRadius: responsive.borderRadius,
                            fontSize: responsive.fontSize
                        }}>
                            LOGO
                        </div>
                    )}

                    <div style={{ flex: 1 }}>
                        <h1 style={{
                            margin: '0 0 8px 0',
                            fontSize: responsive.titleSize,
                            fontWeight: 'bold',
                            color: '#2c3e50'
                        }}>
                            <EditableField
                                value={editableInvoice.invoice_by?.company_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                                })}
                            />
                        </h1>
                        <div style={{ color: '#555', fontSize: responsive.fontSize }}>
                            <div style={{ marginBottom: '4px' }}>
                                <EditableField
                                    value={editableInvoice.invoice_by?.company_address}
                                    onChange={(val) => setEditableInvoice({
                                        ...editableInvoice,
                                        invoice_by: { ...editableInvoice.invoice_by, company_address: val }
                                    })}
                                />
                            </div>
                            <div style={{ marginBottom: '4px' }}>
                                Email: <EditableField
                                    value={editableInvoice.invoice_by?.company_email}
                                    onChange={(val) => setEditableInvoice({
                                        ...editableInvoice,
                                        invoice_by: { ...editableInvoice.invoice_by, company_email: val }
                                    })}
                                />
                            </div>
                            <div>
                                GSTIN: <EditableField
                                    value={editableInvoice.invoice_by?.company_gstin}
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
                <div style={{ 
                    textAlign: (responsive.isMobile && !isDownloading) ? 'center' : 'right',
                    marginTop: (responsive.isMobile && !isDownloading) ? responsive.gap : '0'
                }}>
                    <h1 style={{
                        margin: '0',
                        fontSize: responsive.titleSize,
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        letterSpacing: (responsive.isMobile && !isDownloading) ? '1px' : '2px'
                    }}>
                        {changeTitle ? "PROFORMA" : "TAX"} INVOICE
                    </h1>
                </div>
            </div>

            {/* Invoice Details & Client Info */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr' : '1fr 1fr',
                gap: responsive.largeGap,
                marginBottom: responsive.largeGap
            }}>
                {/* Invoice Details */}
                <div>
                    <h3 style={{
                        margin: '0 0 15px 0',
                        fontSize: responsive.headingSize,
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        borderBottom: '2px solid #ecf0f1',
                        paddingBottom: '8px'
                    }}>
                        Invoice Details
                    </h3>
                    <div style={{ fontSize: responsive.fontSize }}>
                        <div style={{ 
                            display: 'flex', 
                            marginBottom: '8px',
                            flexDirection: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'column' : 'row'
                        }}>
                            <span style={{ 
                                width: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'auto' : '100px', 
                                fontWeight: 'bold', 
                                color: '#555',
                                marginBottom: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? '4px' : '0'
                            }}>Invoice #:</span>
                            <EditableField
                                value={editableInvoice.invoice_number}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_number: val
                                })}
                            />
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            marginBottom: '8px',
                            flexDirection: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'column' : 'row'
                        }}>
                            <span style={{ 
                                width: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'auto' : '100px', 
                                fontWeight: 'bold', 
                                color: '#555',
                                marginBottom: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? '4px' : '0'
                            }}>Date:</span>
                            <EditableField
                                value={editableField.date.invoice_date}
                                onChange={(val) => setEditableField({
                                    ...editableField,
                                    date: { ...editableField.date, invoice_date: val }
                                })}
                            />
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            marginBottom: '8px',
                            flexDirection: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'column' : 'row'
                        }}>
                            <span style={{ 
                                width: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'auto' : '100px', 
                                fontWeight: 'bold', 
                                color: '#555',
                                marginBottom: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? '4px' : '0'
                            }}>Due Date:</span>
                            <EditableField
                                value={editableField.date.invoice_due_date}
                                onChange={(val) => setEditableField({
                                    ...editableField,
                                    date: { ...editableField.date, invoice_due_date: val }
                                })}
                            />
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            marginBottom: '8px',
                            flexDirection: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'column' : 'row'
                        }}>
                            <span style={{ 
                                width: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'auto' : '100px', 
                                fontWeight: 'bold', 
                                color: '#555',
                                marginBottom: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? '4px' : '0'
                            }}>Terms:</span>
                            <EditableField
                                value={editableInvoice.invoice_terms}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_terms: val
                                })}
                            />
                        </div>
                        <div style={{ 
                            display: 'flex',
                            flexDirection: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'column' : 'row'
                        }}>
                            <span style={{ 
                                width: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'auto' : '100px', 
                                fontWeight: 'bold', 
                                color: '#555',
                                marginBottom: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? '4px' : '0'
                            }}>Place of Supply:</span>
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
                        fontSize: responsive.headingSize,
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        borderBottom: '2px solid #ecf0f1',
                        paddingBottom: '8px'
                    }}>
                        Bill To
                    </h3>
                    <div style={{ fontSize: responsive.fontSize }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#2c3e50' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_name: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_address_line1}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line1: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_address_line2}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line2: val }
                                })}
                            />
                        </div>
                        <div style={{ marginBottom: '4px' }}>
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
                        <div style={{ marginBottom: '4px' }}>
                            <EditableField
                                value={editableInvoice.client?.customer_country}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_country: val }
                                })}
                            />
                        </div>
                        <div>
                            GSTIN: <EditableField
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
            <div style={{ marginBottom: responsive.largeGap, overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: responsive.fontSize,
                    border: '2px solid #2c3e50',
                    minWidth: (responsive.isMobile && !isDownloading) ? '800px' : 'auto'
                }}>
                    <thead>
                        <tr style={{ background: '#2c3e50', color: 'white' }}>
                            <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>#</th>
                            <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'left', fontWeight: 'bold', minWidth: (responsive.isMobile && !isDownloading) ? '120px' : '150px' }}>Item & Description</th>
                            {!(responsive.isMobile && !isDownloading) && (
                                <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>HSN/SAC</th>
                            )}
                            <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>Qty</th>
                            <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>Rate</th>
                            {!(responsive.isMobile && !isDownloading) && (
                                <>
                                    <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>CGST%</th>
                                    <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>CGST Amt</th>
                                    <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>SGST%</th>
                                    <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>SGST Amt</th>
                                    <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>IGST%</th>
                                    <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>IGST Amt</th>
                                </>
                            )}
                            <th style={{ border: '1px solid #34495e', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.products?.map((item, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? '#f8f9fa' : 'white' }}>
                                <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>{i + 1}</td>
                                <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'left' }}>
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
                                    {(responsive.isMobile && !isDownloading) && (
                                        <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                                            HSN: <EditableField
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
                                        </div>
                                    )}
                                </td>
                                {!(responsive.isMobile && !isDownloading) && (
                                    <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>
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
                                )}
                                <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>{item.invoice_item_quantity}</td>
                                <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>₹{item.invoice_item_unit_price?.toFixed(2)}</td>
                                {!(responsive.isMobile && !isDownloading) && (
                                    <>
                                        <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>{item.invoice_item_cgst_rate}%</td>
                                        <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>₹{item.invoice_item_cgst_amount?.toFixed(2)}</td>
                                        <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>{item.invoice_item_sgst_rate}%</td>
                                        <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>₹{item.invoice_item_sgst_amount?.toFixed(2)}</td>
                                        <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>{item.invoice_item_igst_rate}%</td>
                                        <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center' }}>₹{item.invoice_item_igst_amount?.toFixed(2)}</td>
                                    </>
                                )}
                                <td style={{ border: '1px solid #ddd', padding: responsive.padding, textAlign: 'center', fontWeight: 'bold' }}>₹{item.invoice_item_total_amount?.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals and Notes Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr' : '1fr auto',
                gap: responsive.largeGap,
                marginBottom: responsive.largeGap
            }}>
                {/* Notes */}
                <div style={{ order: (responsive.isMobile && !isDownloading) ? 2 : 1 }}>
                    <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: responsive.fontSize }}>Total In Words: </span>
                        {moneyInWord}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: responsive.fontSize }}>Notes: </span>
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
                    minWidth: (responsive.isMobile && !isDownloading) ? '100%' : '250px',
                    border: '2px solid #2c3e50',
                    borderRadius: responsive.borderRadius,
                    order: (responsive.isMobile && !isDownloading) ? 1 : 2
                }}>
                    <div style={{
                        background: '#2c3e50',
                        color: 'white',
                        padding: responsive.padding,
                        fontWeight: 'bold',
                        borderRadius: `${parseInt(responsive.borderRadius) - 2}px ${parseInt(responsive.borderRadius) - 2}px 0 0`,
                        fontSize: responsive.fontSize
                    }}>
                        Summary
                    </div>
                    <div style={{ padding: responsive.padding, fontSize: responsive.fontSize }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span>Sub Total:</span>
                            <span>₹{invoice.invoice_subtotal?.toFixed(2)}</span>
                        </div>
                        {!(responsive.isMobile && !isDownloading) && (
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
                            fontSize: responsive.headingSize,
                            borderTop: '2px solid #2c3e50',
                            paddingTop: '8px',
                            color: '#2c3e50'
                        }}>
                            <span>Total:</span>
                            <span>₹{invoice.invoice_total?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr' : '1fr auto',
                gap: responsive.largeGap,
                borderTop: '2px solid #ecf0f1',
                paddingTop: responsive.padding
            }}>
                {/* Bank Details */}
                <div style={{ fontSize: responsive.fontSize, order: (responsive.isMobile && !isDownloading) ? 2 : 1 }}>
                    <h4 style={{
                        margin: '0 0 10px 0',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        fontSize: responsive.headingSize
                    }}>
                        Bank Details:
                    </h4>
                    <div style={{ lineHeight: '1.5' }}>
                        <div style={{ marginBottom: '4px' }}>Account No: <span style={{ fontWeight: 'bold' }}>
                            <EditableField
                                value={companyDetail.company_bank_account_no}
                                onChange={(val) => setCompanyDetail({
                                    ...companyDetail, company_bank_account_no: val
                                })}
                            />
                        </span></div>
                        <div style={{ marginBottom: '4px' }}>Bank Name: <span style={{ fontWeight: 'bold' }}>
                            <EditableField
                                value={companyDetail.company_bank_name}
                                onChange={(val) => setCompanyDetail({
                                    ...companyDetail, company_bank_name: val
                                })}
                            />
                        </span></div>
                        <div style={{ marginBottom: '4px' }}>Account Holder: <span style={{ fontWeight: 'bold' }}>
                            <EditableField
                                value={companyDetail.company_name}
                                onChange={(val) => setCompanyDetail({
                                    ...companyDetail, company_name: val
                                })}
                            />
                        </span></div>
                        <div style={{ marginBottom: '4px' }}>Branch: <span style={{ fontWeight: 'bold' }}>
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
                    textAlign: (responsive.isMobile && !isDownloading) ? 'center' : 'right',
                    fontSize: responsive.fontSize,
                    minWidth: (responsive.isMobile && !isDownloading) ? '100%' : '200px',
                    order: (responsive.isMobile && !isDownloading) ? 1 : 2
                }}>
                    <div style={{
                        border: '2px solid #2c3e50',
                        padding: responsive.padding,
                        borderRadius: responsive.borderRadius
                    }}>
                        <div style={{ marginBottom: '50px', fontWeight: 'bold', color: '#2c3e50' }}>
                            Authorized Signature
                        </div>
                        <div style={{ fontWeight: 'bold' }}>
                            For <EditableField
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
        </>
    );
};

export default Template2;
