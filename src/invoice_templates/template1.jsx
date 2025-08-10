import React from 'react'
import EditableField from '../hooks/OnEdit'

const template1 = ({
    isDownloading,
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
    // Responsive utility function
    const getResponsiveValue = (mobile, tablet, desktop) => {
        if(isDownloading) return desktop;
        const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
        if (width <= 768) return mobile;
        if (width <= 1024) return tablet;
        return desktop;
    };

    const responsive = {
        // Spacing
        padding: getResponsiveValue('12px', '14px', '20px'),
        cardPadding: getResponsiveValue('16px', '28px', '20px'),
        gap: getResponsiveValue('12px', '14px', '18px'),
        largeGap: getResponsiveValue('16px', '18px', '20px'),
        
        // Border radius
        borderRadius: getResponsiveValue('8px', '10px', '10px'),
        largeBorderRadius: getResponsiveValue('12px', '14px', '14px'),
        
        // Typography
        fontSize: getResponsiveValue('12px', '13px', '14px'),
        titleSize: getResponsiveValue('20px', '24px', '24px'),
        headingSize: getResponsiveValue('16px', '18px', '18px'),
        companyNameSize: getResponsiveValue('18px', '20px', '20px'),
        
        // Logo
        logoSize: getResponsiveValue('40px', '40px', '50px'),
        logoContainerSize: getResponsiveValue('20px', '40px', '50px'),
        
        // Layout - Force desktop layout when downloading
        isMobile: isDownloading ? false : (typeof window !== 'undefined' ? window.innerWidth <= 768 : false),
        isTablet: isDownloading ? false : (typeof window !== 'undefined' ? window.innerWidth <= 1024 && window.innerWidth > 768 : false),
        isDesktop: isDownloading ? true : (typeof window !== 'undefined' ? window.innerWidth > 1024 : true)
    };

    return (
        <div style={{
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            backgroundColor: '#ffffff',
            color: '#1a202c',
            lineHeight: '1.6',
            fontSize: responsive.fontSize,
            maxWidth: '100%',
            margin: '0',
            padding: '0'
        }}>
        
        {/* Responsive Modern Header */}
        <div style={{
            background: 'linear-gradient(135deg, #1d2079 0%, #3769ff 100%)',
            color: 'white',
            padding: responsive.padding,
            borderRadius: `${responsive.borderRadius} ${responsive.borderRadius} 0 0`,
            marginBottom: '0',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: responsive.gap,
                flexDirection: responsive.isMobile ? 'column' : 'row'
            }}>
                {/* Company Info Section */}
                <div style={{
                    display: 'flex',
                    alignItems: responsive.isMobile ? 'flex-start' : 'center',
                    gap: responsive.gap,
                    flex: '1',
                    minWidth: responsive.isMobile ? '100%' : '300px',
                    flexDirection: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'column' : 'row'
                }}>
                    {/* Logo */}
                    {companyDetail.company_logo ? (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: responsive.largeBorderRadius,
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: responsive.logoContainerSize,
                            minHeight: responsive.logoContainerSize,
                            alignSelf: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'center' : 'auto'
                        }}>
                            <img
                                src={companyDetail.company_logo}
                                alt={`${companyDetail.company_name} Logo`}
                                style={{
                                    width: responsive.logoSize,
                                    height: responsive.logoSize,
                                    objectFit: 'contain',
                                    filter: 'brightness(1.1)'
                                }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    ) : (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: responsive.largeBorderRadius,
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: responsive.logoContainerSize,
                            minHeight: responsive.logoContainerSize,
                            fontSize: responsive.isMobile ? '12px' : '16px',
                            fontWeight: 'bold',
                            color: 'rgba(255, 255, 255, 0.9)',
                            alignSelf: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'center' : 'auto'
                        }}>
                            LOGO
                        </div>
                    )}
                    
                    {/* Company Details */}
                    <div style={{
                        flex: '1',
                        paddingLeft: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? '0' : responsive.gap,
                        borderLeft: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                        textAlign: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'center' : 'left',
                        marginTop: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? '12px' : '0'
                    }}>
                        <h2 style={{
                            fontSize: responsive.companyNameSize,
                            fontWeight: '700',
                            margin: '0 0 8px 0',
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            lineHeight: '1.2'
                        }}>
                            <EditableField
                                value={editableInvoice.invoice_by.company_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                                })}
                            />
                        </h2>
                        <p style={{ margin: '4px 0', fontSize: responsive.fontSize, opacity: '0.95' }}>
                            <EditableField
                                value={editableInvoice.invoice_by.company_address}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_address: val }
                                })}
                            />
                        </p>
                        <p style={{ 
                            margin: '4px 0', 
                            fontSize: responsive.fontSize, 
                            opacity: '0.95', 
                            display: 'flex', 
                            gap: '8px', 
                            justifyContent: (responsive.isMobile && !isDownloading && typeof window !== 'undefined' && window.innerWidth <= 480) ? 'center' : 'flex-start',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontWeight: '600' }}>GSTIN:</span>
                            <EditableField
                                value={editableInvoice.invoice_by.company_gstin}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_gstin: val }
                                })}
                            />
                        </p>
                        <p style={{ margin: '4px 0', fontSize: responsive.fontSize, opacity: '0.95' }}>
                            <EditableField
                                value={editableInvoice.invoice_by.company_msme}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_msme: val }
                                })}
                            />
                        </p>
                        <p style={{ margin: '4px 0', fontSize: responsive.fontSize, opacity: '0.95' }}>
                            <EditableField
                                value={editableInvoice.invoice_by.company_email}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_email: val }
                                })}
                            />
                        </p>
                    </div>
                </div>
                
                {/* Invoice Title */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: responsive.borderRadius,
                    padding: responsive.cardPadding,
                    textAlign: 'center',
                    minWidth: responsive.isMobile ? '100%' : '200px',
                    alignSelf: responsive.isMobile ? 'stretch' : 'auto'
                }}>
                    <div style={{
                        fontSize: responsive.titleSize,
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: responsive.isMobile ? '1px' : '2px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        lineHeight: '1.2'
                    }}>
                        {changeTitle ? "PROFORMA" : "TAX"} INVOICE
                    </div>
                </div>
            </div>
        </div>

        {/* Responsive Invoice Info Cards */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: responsive.gap,
            padding: responsive.padding,
            background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '0 0 12px 12px',
            marginBottom: responsive.largeGap
        }}>
            {/* Invoice Details Card */}
            <div style={{
                background: 'white',
                borderRadius: responsive.borderRadius,
                padding: responsive.cardPadding,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0'
            }}>
                <h3 style={{
                    fontSize: responsive.headingSize,
                    fontWeight: '700',
                    color: '#4a5568',
                    marginBottom: responsive.gap,
                    borderBottom: '2px solid #667eea',
                    paddingBottom: '8px'
                }}>Invoice Details</h3>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr' : '1fr 2fr', 
                    gap: '12px', 
                    alignItems: 'center' 
                }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr 1fr' : '1fr 2fr', 
                        gap: '8px',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #e2e8f0'
                    }}>
                        <span style={{ fontWeight: '600', color: '#718096', fontSize: responsive.fontSize }}>Invoice #</span>
                        <span style={{ fontWeight: '700', color: '#2d3748', fontSize: responsive.fontSize }}>
                            <EditableField
                                value={editableInvoice.invoice_number}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_number: val
                                })}
                            />
                        </span>
                    </div>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr 1fr' : '1fr 2fr', 
                        gap: '8px',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #e2e8f0'
                    }}>
                        <span style={{ fontWeight: '600', color: '#718096', fontSize: responsive.fontSize }}>Date</span>
                        <span style={{ fontWeight: '700', color: '#2d3748', fontSize: responsive.fontSize }}>
                            <EditableField
                                value={editableField.date.invoice_date}
                                onChange={(val) => setEditableField({
                                    ...editableField,
                                    date: { ...editableField.date, invoice_date: val }
                                })}
                            />
                        </span>
                    </div>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr 1fr' : '1fr 2fr', 
                        gap: '8px',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #e2e8f0'
                    }}>
                        <span style={{ fontWeight: '600', color: '#718096', fontSize: responsive.fontSize }}>Terms</span>
                        <span style={{ fontWeight: '700', color: '#2d3748', fontSize: responsive.fontSize }}>
                            <EditableField
                                value={editableInvoice.invoice_terms}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_terms: val
                                })}
                            />
                        </span>
                    </div>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr 1fr' : '1fr 2fr', 
                        gap: '8px',
                        alignItems: 'center',
                        padding: '8px 0'
                    }}>
                        <span style={{ fontWeight: '600', color: '#718096', fontSize: responsive.fontSize }}>Due Date</span>
                        <span style={{ fontWeight: '700', color: '#2d3748', fontSize: responsive.fontSize }}>
                            <EditableField
                                value={editableField.date.invoice_due_date}
                                onChange={(val) => setEditableField({
                                    ...editableField,
                                    date: { ...editableField.date, invoice_due_date: val }
                                })}
                            />
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Supply Information Card */}
            <div style={{
                background: 'white',
                borderRadius: responsive.borderRadius,
                padding: responsive.cardPadding,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0'
            }}>
                <h3 style={{
                    fontSize: responsive.headingSize,
                    fontWeight: '700',
                    color: '#4a5568',
                    marginBottom: responsive.gap,
                    borderBottom: '2px solid #667eea',
                    paddingBottom: '8px'
                }}>Supply Information</h3>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr 1fr' : '1fr 2fr', 
                    gap: '8px', 
                    alignItems: 'center' 
                }}>
                    <span style={{ fontWeight: '600', color: '#718096', fontSize: responsive.fontSize }}>Place of Supply</span>
                    <span style={{ fontWeight: '700', color: '#2d3748', fontSize: responsive.fontSize }}>
                        <EditableField
                            value={editableInvoice.invoice_place_of_supply}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice, invoice_place_of_supply: val
                            })}
                        />
                    </span>
                </div>
            </div>
        </div>

        {/* Responsive Bill & Ship To Cards */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: (responsive.isMobile && !isDownloading) ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: responsive.largeGap,
            padding: `0 ${responsive.padding} ${responsive.largeGap}`,
            marginBottom: responsive.largeGap
        }}>
            {/* Bill To Card */}
            <div style={{
                background: 'linear-gradient(135deg, #1d2079 0%, #3769ff 100%)',
                borderRadius: responsive.largeBorderRadius,
                padding: responsive.cardPadding,
                color: 'white',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: responsive.gap,
                    paddingBottom: '12px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                    <h3 style={{
                        fontSize: responsive.headingSize,
                        fontWeight: '700',
                        margin: '0',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>Bill To</h3>
                </div>
                <div style={{ lineHeight: '1.6' }}>
                    <p style={{ 
                        margin: '0 0 8px 0', 
                        fontWeight: '700', 
                        fontSize: responsive.headingSize,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                        <EditableField
                            value={editableInvoice.client.customer_name}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_name: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', fontSize: responsive.fontSize }}>
                        <EditableField
                            value={editableInvoice.client.customer_address_line1}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_address_line1: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', fontSize: responsive.fontSize }}>
                        <EditableField
                            value={editableInvoice.client.customer_address_line2}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_address_line2: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', display: 'flex', gap: '4px', fontSize: responsive.fontSize, flexWrap: 'wrap' }}>
                        <EditableField
                            value={editableInvoice.client.customer_city}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_city: val }
                            })}
                        /> - 
                        <EditableField
                            value={editableInvoice.client.customer_postal_code}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_postal_code: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', fontSize: responsive.fontSize }}>
                        <EditableField
                            value={editableInvoice.client.customer_country}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_country: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '8px 0 0 0', fontWeight: '600', opacity: '0.95', fontSize: responsive.fontSize }}>
                        GSTIN: <EditableField
                            value={editableInvoice.client.customer_gstin}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_gstin: val }
                            })}
                        />
                    </p>
                </div>
            </div>
            
            {/* Ship To Card */}
            <div style={{
                background: 'linear-gradient(135deg, #1d2079 0%, #3769ff 100%)',
                borderRadius: responsive.largeBorderRadius,
                padding: responsive.cardPadding,
                color: 'white',
                boxShadow: '0 8px 25px rgba(118, 75, 162, 0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: responsive.gap,
                    paddingBottom: '12px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                    <h3 style={{
                        fontSize: responsive.headingSize,
                        fontWeight: '700',
                        margin: '0',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>Ship To</h3>
                </div>
                <div style={{ lineHeight: '1.6' }}>
                    <p style={{ 
                        margin: '0 0 8px 0', 
                        fontWeight: '700', 
                        fontSize: responsive.headingSize,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                        <EditableField
                            value={editableInvoice.client.customer_name}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_name: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', fontSize: responsive.fontSize }}>
                        <EditableField
                            value={editableInvoice.client.customer_address_line1}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_address_line1: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', fontSize: responsive.fontSize }}>
                        <EditableField
                            value={editableInvoice.client.customer_address_line2}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_address_line2: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', display: 'flex', gap: '4px', fontSize: responsive.fontSize, flexWrap: 'wrap' }}>
                        <EditableField
                            value={editableInvoice.client.customer_city}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_city: val }
                            })}
                        /> - 
                        <EditableField
                            value={editableInvoice.client.customer_postal_code}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_postal_code: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '4px 0', opacity: '0.95', fontSize: responsive.fontSize }}>
                        <EditableField
                            value={editableInvoice.client.customer_country}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_country: val }
                            })}
                        />
                    </p>
                    <p style={{ margin: '8px 0 0 0', fontWeight: '600', opacity: '0.95', fontSize: responsive.fontSize }}>
                        GSTIN: <EditableField
                            value={editableInvoice.client.customer_gstin}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                client: { ...editableInvoice.client, customer_gstin: val }
                            })}
                        />
                    </p>
                </div>
            </div>
        </div>

        {/* Responsive Products Table */}
        <div style={{
            padding: `0 ${responsive.padding} ${responsive.largeGap}`,
            marginBottom: responsive.largeGap
        }}>
            <div style={{
                background: 'white',
                borderRadius: responsive.largeBorderRadius,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: responsive.fontSize
                    }}>
                        <thead>
                            <tr style={{
                                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                borderBottom: '2px solid #667eea'
                            }}>
                                <th style={{
                                    padding: responsive.cardPadding,
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    color: '#2d3748',
                                    borderRight: '1px solid #e2e8f0',
                                    fontSize: responsive.fontSize
                                }}>#</th>
                                <th style={{
                                    padding: responsive.cardPadding,
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    color: '#2d3748',
                                    borderRight: '1px solid #e2e8f0',
                                    minWidth: (responsive.isMobile && !isDownloading) ? '120px' : '200px',
                                    fontSize: responsive.fontSize
                                }}>Item & Description</th>
                                {!(responsive.isMobile && !isDownloading) && (
                                    <th style={{
                                        padding: responsive.cardPadding,
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        color: '#2d3748',
                                        borderRight: '1px solid #e2e8f0',
                                        fontSize: responsive.fontSize
                                    }}>HSN/SAC</th>
                                )}
                                <th style={{
                                    padding: responsive.cardPadding,
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    color: '#2d3748',
                                    borderRight: '1px solid #e2e8f0',
                                    fontSize: responsive.fontSize
                                }}>Qty</th>
                                <th style={{
                                    padding: responsive.cardPadding,
                                    textAlign: 'right',
                                    fontWeight: '700',
                                    color: '#2d3748',
                                    borderRight: '1px solid #e2e8f0',
                                    fontSize: responsive.fontSize
                                }}>Rate</th>
                                {!(responsive.isMobile && !isDownloading) && (
                                    <>
                                        <th style={{
                                            padding: responsive.cardPadding,
                                            textAlign: 'center',
                                            fontWeight: '700',
                                            color: '#2d3748',
                                            borderRight: '1px solid #e2e8f0',
                                            fontSize: responsive.fontSize
                                        }}>CGST%</th>
                                        <th style={{
                                            padding: responsive.cardPadding,
                                            textAlign: 'right',
                                            fontWeight: '700',
                                            color: '#2d3748',
                                            borderRight: '1px solid #e2e8f0',
                                            fontSize: responsive.fontSize
                                        }}>CGST Amt</th>
                                        <th style={{
                                            padding: responsive.cardPadding,
                                            textAlign: 'center',
                                            fontWeight: '700',
                                            color: '#2d3748',
                                            borderRight: '1px solid #e2e8f0',
                                            fontSize: responsive.fontSize
                                        }}>SGST%</th>
                                        <th style={{
                                            padding: responsive.cardPadding,
                                            textAlign: 'right',
                                            fontWeight: '700',
                                            color: '#2d3748',
                                            borderRight: '1px solid #e2e8f0',
                                            fontSize: responsive.fontSize
                                        }}>SGST Amt</th>
                                        <th style={{
                                            padding: responsive.cardPadding,
                                            textAlign: 'center',
                                            fontWeight: '700',
                                            color: '#2d3748',
                                            borderRight: '1px solid #e2e8f0',
                                            fontSize: responsive.fontSize
                                        }}>IGST%</th>
                                        <th style={{
                                            padding: responsive.cardPadding,
                                            textAlign: 'right',
                                            fontWeight: '700',
                                            color: '#2d3748',
                                            borderRight: '1px solid #e2e8f0',
                                            fontSize: responsive.fontSize
                                        }}>IGST Amt</th>
                                    </>
                                )}
                                <th style={{
                                    padding: responsive.cardPadding,
                                    textAlign: 'right',
                                    fontWeight: '700',
                                    color: '#2d3748',
                                    fontSize: responsive.fontSize
                                }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.products?.map((item, i) => (
                                <tr key={i} style={{
                                    borderBottom: '1px solid #e2e8f0',
                                    background: i % 2 === 0 ? '#ffffff' : '#f8fafc',
                                    transition: 'background-color 0.2s ease'
                                }}>
                                    <td style={{
                                        padding: responsive.cardPadding,
                                        textAlign: 'center',
                                        fontWeight: '600',
                                        color: '#4a5568',
                                        borderRight: '1px solid #e2e8f0'
                                    }}>{i + 1}</td>
                                    <td style={{
                                        padding: responsive.cardPadding,
                                        borderRight: '1px solid #e2e8f0',
                                        fontWeight: '600',
                                        color: '#2d3748'
                                    }}>
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
                                            <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
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
                                        <td style={{
                                            padding: responsive.cardPadding,
                                            textAlign: 'center',
                                            borderRight: '1px solid #e2e8f0',
                                            fontWeight: '600',
                                            color: '#4a5568'
                                        }}>
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
                                    <td style={{
                                        padding: responsive.cardPadding,
                                        textAlign: 'center',
                                        borderRight: '1px solid #e2e8f0',
                                        fontWeight: '600',
                                        color: '#4a5568'
                                    }}>{item.invoice_item_quantity}</td>
                                    <td style={{
                                        padding: responsive.cardPadding,
                                        textAlign: 'right',
                                        borderRight: '1px solid #e2e8f0',
                                        fontWeight: '600',
                                        color: '#4a5568'
                                    }}>₹{item.invoice_item_unit_price.toFixed(2)}</td>
                                    {!(responsive.isMobile && !isDownloading) && (
                                        <>
                                            <td style={{
                                                padding: responsive.cardPadding,
                                                textAlign: 'center',
                                                borderRight: '1px solid #e2e8f0',
                                                color: '#4a5568'
                                            }}>{item.invoice_item_cgst_rate}%</td>
                                            <td style={{
                                                padding: responsive.cardPadding,
                                                textAlign: 'right',
                                                borderRight: '1px solid #e2e8f0',
                                                color: '#4a5568'
                                            }}>₹{item.invoice_item_cgst_amount.toFixed(2)}</td>
                                            <td style={{
                                                padding: responsive.cardPadding,
                                                textAlign: 'center',
                                                borderRight: '1px solid #e2e8f0',
                                                color: '#4a5568'
                                            }}>{item.invoice_item_sgst_rate}%</td>
                                            <td style={{
                                                padding: responsive.cardPadding,
                                                textAlign: 'right',
                                                borderRight: '1px solid #e2e8f0',
                                                color: '#4a5568'
                                            }}>₹{item.invoice_item_sgst_amount.toFixed(2)}</td>
                                            <td style={{
                                                padding: responsive.cardPadding,
                                                textAlign: 'center',
                                                borderRight: '1px solid #e2e8f0',
                                                color: '#4a5568'
                                            }}>{item.invoice_item_igst_rate}%</td>
                                            <td style={{
                                                padding: responsive.cardPadding,
                                                textAlign: 'right',
                                                borderRight: '1px solid #e2e8f0',
                                                color: '#4a5568'
                                            }}>₹{item.invoice_item_igst_amount.toFixed(2)}</td>
                                        </>
                                    )}
                                    <td style={{
                                        padding: responsive.cardPadding,
                                        textAlign: 'right',
                                        fontWeight: '700',
                                        color: '#2d3748',
                                        background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)'
                                    }}>₹{item.invoice_item_total_amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Mobile Tax Summary */}
                {responsive.isMobile && (
                    <div style={{
                        padding: responsive.cardPadding,
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                        borderTop: '2px solid #667eea'
                    }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
                            Tax Summary
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '11px' }}>
                            <div>CGST: ₹{invoice.invoice_total_cgst.toFixed(2)}</div>
                            <div>SGST: ₹{invoice.invoice_total_sgst.toFixed(2)}</div>
                            <div>IGST: ₹{invoice.invoice_total_igst.toFixed(2)}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Responsive Totals Section */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: responsive.isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: responsive.largeGap,
            padding: `0 ${responsive.padding} ${responsive.largeGap}`,
            marginBottom: responsive.largeGap
        }}>
            {/* Notes Section */}
            <div style={{
                background: 'white',
                borderRadius: responsive.largeBorderRadius,
                padding: responsive.cardPadding,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: responsive.gap,
                    paddingBottom: '12px',
                    borderBottom: '2px solid #667eea'
                }}>
                    <h3 style={{
                        fontSize: responsive.headingSize,
                        fontWeight: '700',
                        margin: '0',
                        color: '#2d3748'
                    }}>Additional Information</h3>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <p style={{
                        fontSize: responsive.fontSize,
                        fontWeight: '600',
                        color: '#4a5568',
                        marginBottom: '8px'
                    }}>Total In Words:</p>
                    <div style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                        borderRadius: '8px',
                        padding: '12px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <strong style={{ color: '#2d3748', fontSize: responsive.fontSize }}>
                            <EditableField
                                value={moneyInWord}
                                onChange={(val) => moneyInWord = val}
                            />
                        </strong>
                    </div>
                </div>
                
                <div>
                    <p style={{
                        fontSize: responsive.fontSize,
                        fontWeight: '600',
                        color: '#4a5568',
                        marginBottom: '8px'
                    }}>Notes:</p>
                    <div style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                        borderRadius: '8px',
                        padding: '12px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <strong style={{ color: '#2d3748', fontSize: responsive.fontSize }}>
                            <EditableField
                                value={editableInvoice.invoice_notes}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_notes: val
                                })}
                            />
                        </strong>
                    </div>
                </div>
            </div>

            {/* Amounts Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1d2079 0%, #3769ff 100%)',
                borderRadius: responsive.largeBorderRadius,
                padding: responsive.cardPadding,
                color: 'white',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                    <h3 style={{
                        fontSize: responsive.headingSize,
                        fontWeight: '700',
                        margin: '0',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>Invoice Summary</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <span style={{ fontSize: responsive.fontSize, opacity: '0.9' }}>Sub Total</span>
                        <span style={{ fontWeight: '600', fontSize: responsive.fontSize }}>₹{invoice.invoice_subtotal.toFixed(2)}</span>
                    </div>
                    {!(responsive.isMobile && !isDownloading) && (
                        <>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                padding: '8px 0',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <span style={{ fontSize: responsive.fontSize, opacity: '0.9' }}>CGST</span>
                                <span style={{ fontWeight: '600', fontSize: responsive.fontSize }}>₹{invoice.invoice_total_cgst.toFixed(2)}</span>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                padding: '8px 0',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <span style={{ fontSize: responsive.fontSize, opacity: '0.9' }}>SGST</span>
                                <span style={{ fontWeight: '600', fontSize: responsive.fontSize }}>₹{invoice.invoice_total_sgst.toFixed(2)}</span>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                padding: '8px 0',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <span style={{ fontSize: responsive.fontSize, opacity: '0.9' }}>IGST</span>
                                <span style={{ fontWeight: '600', fontSize: responsive.fontSize }}>₹{invoice.invoice_total_igst.toFixed(2)}</span>
                            </div>
                        </>
                    )}
                    {responsive.isMobile && (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            padding: '8px 0',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <span style={{ fontSize: responsive.fontSize, opacity: '0.9' }}>Total Tax</span>
                            <span style={{ fontWeight: '600', fontSize: responsive.fontSize }}>₹{(invoice.invoice_total_cgst + invoice.invoice_total_sgst + invoice.invoice_total_igst).toFixed(2)}</span>
                        </div>
                    )}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '16px 12px',
                        marginTop: '8px',
                        borderTop: '2px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px'
                    }}>
                        <span style={{ fontSize: responsive.headingSize, fontWeight: '700', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Total</span>
                        <span style={{ fontSize: responsive.titleSize, fontWeight: '800', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>₹{invoice.invoice_total.toFixed(2)}</span>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '16px 12px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <span style={{ fontSize: responsive.headingSize, fontWeight: '700', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Balance Due</span>
                        <span style={{ fontSize: responsive.titleSize, fontWeight: '800', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>₹{invoice.invoice_total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Responsive Footer Section */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: responsive.isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: responsive.largeGap,
            padding: `0 ${responsive.padding} ${responsive.padding}`
        }}>
            {/* Bank Details */}
            <div style={{
                background: 'linear-gradient(135deg, #1d2079 0%, #3769ff 100%)',
                borderRadius: responsive.largeBorderRadius,
                color: 'white',
                padding: responsive.cardPadding,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: responsive.gap,
                    paddingBottom: '12px',
                    borderBottom: '2px solid #667eea'
                }}>
                    <h3 style={{
                        fontSize: responsive.headingSize,
                        fontWeight: '700',
                        margin: '0'
                    }}>Bank Details</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                        { label: 'Account No:', field: 'company_bank_account_no' },
                        { label: 'Bank Name:', field: 'company_bank_name' },
                        { label: 'Account Holder:', field: 'company_name' },
                        { label: 'Branch:', field: 'company_branch' },
                        { label: 'IFSC Code:', field: 'company_ifsc_code' }
                    ].map((item, index) => (
                        <div key={index} style={{
                            display: 'grid',
                            gridTemplateColumns: responsive.isMobile ? '1fr' : '1fr 2fr',
                            gap: '8px',
                            alignItems: 'center',
                            padding: '8px 0',
                            borderBottom: index < 4 ? '1px solid #e2e8f0' : 'none'
                        }}>
                            <span style={{ fontWeight: '600', fontSize: responsive.fontSize }}>{item.label}</span>
                            <span style={{ fontWeight: '700', fontSize: responsive.fontSize }}>
                                <EditableField
                                    value={companyDetail[item.field]}
                                    onChange={(val) => setCompanyDetail({
                                        ...companyDetail, [item.field]: val
                                    })}
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Signature Section */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: responsive.largeBorderRadius,
                padding: responsive.cardPadding,
                color: 'black',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                maxHeight:  '300px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                    <h3 style={{
                        fontSize: responsive.headingSize,
                        fontWeight: '700',
                        margin: '0',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>Authorized Signature</h3>
                </div>
                
                <div style={{
                    flex: '1',
                    minHeight: responsive.isMobile ? '60px' : '40px',
                    background: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    border: '2px dashed rgba(0, 0, 0, 0.3)',
                    fontStyle: 'italic',
                }}>
                </div>
                
                <div style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    paddingTop: '16px',
                    borderTop: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                    <p style={{ margin: '0', fontSize: responsive.fontSize, opacity: '0.9' }}>For</p>
                    <div style={{
                        fontSize: responsive.headingSize,
                        fontWeight: '700',
                        marginTop: '4px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                        <EditableField
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

export default template1;
