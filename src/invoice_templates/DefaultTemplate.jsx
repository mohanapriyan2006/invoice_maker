import React from 'react'
import EditableField from '../hooks/OnEdit';

const DefaultTemplate = ({
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

    const responsive = {
        isMobile: isDownloading ? false : (typeof window !== 'undefined' ? window.innerWidth <= 768 : false),
        isTablet: isDownloading ? false : (typeof window !== 'undefined' ? window.innerWidth <= 1024 && window.innerWidth > 768 : false),
        isDesktop: isDownloading ? true : (typeof window !== 'undefined' ? window.innerWidth > 1024 : true)
    };

    return (
        <>
            {/* <!-- Header --> */}
            <div className="invoice-header p-2">
                <div className={`company-info ${responsive.isMobile ? 'text-center flex flex-col' : ''}`}>
                    {companyDetail.company_logo ? (
                        <div className='border rounded-full p-2 flex items-center justify-center'>
                            <img
                                src={companyDetail.company_logo}
                                alt={`${companyDetail.company_name} Logo`}
                                className="w-15 h-15 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    ) :
                        <div className="logo">
                            Logo
                        </div>}
                    <div className="company-details md:ml-10 md:border-l pl-4">
                        <h2>
                            <EditableField
                                value={editableInvoice.invoice_by.company_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                                })}
                            />
                        </h2>
                        <p>
                            <EditableField
                                value={editableInvoice.invoice_by.company_address}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_address: val }
                                })}
                            />
                        </p>
                        <p className='flex gap-1'> GSTIN :
                            <EditableField
                                value={editableInvoice.invoice_by.company_gstin}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_gstin: val }
                                })}
                            />
                        </p>
                        <p>
                            <EditableField
                                value={editableInvoice.invoice_by.company_msme}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    invoice_by: { ...editableInvoice.invoice_by, company_msme: val }
                                })}
                            />
                        </p>
                        <p>
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
                <div className="invoice-title text-3xl">{changeTitle ? "PERFOMA" : "TAX"} INVOICE</div>
            </div>

            {/* <!-- Invoice Info --> */}
            <div className="invoice-info">
                <div className="info-left flex p-3 justify-around">
                    <div>
                        <p># Invoice</p>
                        <p>Date</p>
                        <p>Terms</p>
                        <p>Due Date</p>
                    </div>
                    <div>
                        <p className='font-semibold flex gap-1'>:
                            <EditableField
                                value={editableInvoice.invoice_number}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_number: val
                                })}
                            />
                        </p>
                        <p className='font-semibold flex gap-2'>:
                            <EditableField
                                value={editableField.date.invoice_date}
                                onChange={(val) => setEditableField({
                                    ...editableField,
                                    date: { ...editableField.date, invoice_date: val }
                                })}
                            />
                        </p>
                        <p className='font-semibold flex gap-1'>:
                            <EditableField
                                value={editableInvoice.invoice_terms}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_terms: val
                                })}
                            />
                        </p>
                        <p className='font-semibold flex gap-2'>:
                            <EditableField
                                value={editableField.date.invoice_due_date}
                                onChange={(val) => setEditableField({
                                    ...editableField,
                                    date: { ...editableField.date, invoice_due_date: val }
                                })}
                            />
                        </p>
                    </div>
                </div>
                <div className="info-right flex p-3 border-t-1 sm:border-l-1 sm:border-t-0 min-h-[80px] justify-around">
                    <div>
                        <p>Place Of Supply </p>
                    </div>
                    <div>
                        <p className='font-semibold flex gap-1'>:
                            <EditableField
                                value={editableInvoice.invoice_place_of_supply}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice, invoice_place_of_supply: val
                                })}
                            />
                        </p>
                    </div>
                </div>
            </div>

            {/* <!-- Bill & Ship To --> */}
            <div className="billing-shipping">
                <div className="box pb-2">
                    <div className="box-title">Bill To</div>
                    <div className="box-body">
                        <p className='bold'>
                            <EditableField
                                value={editableInvoice.client.customer_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_name: val }
                                })}
                            />
                        </p>
                        <p>
                            <EditableField
                                value={editableInvoice.client.customer_address_line1}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line1: val }
                                })}
                            />
                        </p>
                        <p>
                            <EditableField
                                value={editableInvoice.client.customer_address_line2}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line2: val }
                                })}
                            />
                        </p>
                        <p className='flex gap-1'>
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
                        <p>
                            <EditableField
                                value={editableInvoice.client.customer_country}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_country: val }
                                })}
                            />
                        </p>
                        <p className='flex gap-1'>
                            <EditableField
                                value={editableInvoice.client.customer_gstin}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_gstin: val }
                                })}
                            />
                        </p>
                    </div>
                </div>
                <div className="box pb-2">
                    <div className="box-title">Ship To</div>
                    <div className="box-body">
                        <p className='bold'>
                            <EditableField
                                value={editableInvoice.client.customer_name}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_name: val }
                                })}
                            />
                        </p>
                        <p>
                            <EditableField
                                value={editableInvoice.client.customer_address_line1}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line1: val }
                                })}
                            />
                        </p>
                        <p>
                            <EditableField
                                value={editableInvoice.client.customer_address_line2}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_address_line2: val }
                                })}
                            />
                        </p>
                        <p className='flex gap-1'>
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
                        <p>
                            <EditableField
                                value={editableInvoice.client.customer_country}
                                onChange={(val) => setEditableInvoice({
                                    ...editableInvoice,
                                    client: { ...editableInvoice.client, customer_country: val }
                                })}
                            />
                        </p>
                        <p className='flex gap-1'>
                            <EditableField
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

            {/* <!-- Products Table --> */}
            <div className="product-table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th className='font-bold'>#</th>
                            <th className='font-bold'>Item & Description</th>
                            <th className='font-bold'>HSN/SAC</th>
                            <th className='font-bold'>Qty</th>
                            <th className='font-bold'>Rate</th>
                            <th className='font-bold'>CGST%</th>
                            <th className='font-bold'>CGST Amt</th>
                            <th className='font-bold'>SGST%</th>
                            <th className='font-bold'>SGST Amt</th>
                            <th className='font-bold'>IGST%</th>
                            <th className='font-bold'>IGST Amt</th>
                            <th className='font-bold'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.products?.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
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
                                <td>
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
                                <td>{item.invoice_item_quantity}</td>
                                <td>{item.invoice_item_unit_price.toFixed(2)}</td>
                                <td>{item.invoice_item_cgst_rate}%</td>
                                <td>{item.invoice_item_cgst_amount.toFixed(2)}</td>
                                <td>{item.invoice_item_sgst_rate}%</td>
                                <td>{item.invoice_item_sgst_amount.toFixed(2)}</td>
                                <td>{item.invoice_item_igst_rate}%</td>
                                <td>{item.invoice_item_igst_amount.toFixed(2)}</td>
                                <td>{item.invoice_item_total_amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="totals-section flex flex-row">
                {/* <!-- Totals --> */}
                <div className="notes">
                    <p className='my-2'>Total In Words: <br /><strong>{moneyInWord}</strong></p>
                    <p>Notes: <br /><strong><EditableField
                        value={editableInvoice.invoice_notes}
                        onChange={(val) => setEditableInvoice({
                            ...editableInvoice, invoice_notes: val
                        })}
                    /></strong></p>
                </div>
                <div className="amounts">
                    <div><span>Sub Total</span><span>{invoice.invoice_subtotal.toFixed(2)}</span></div>
                    <div><span>CGST</span><span>{invoice.invoice_total_cgst.toFixed(2)}</span></div>
                    <div><span>SGST</span><span>{invoice.invoice_total_sgst.toFixed(2)}</span></div>
                    <div><span>IGST</span><span>{invoice.invoice_total_igst.toFixed(2)}</span></div>
                    <div className="bold total"><span>Total</span><span>₹{invoice.invoice_total.toFixed(2)}</span></div>
                    <div className="bold balance"><span>Balance Due</span><span>₹{invoice.invoice_total.toFixed(2)}</span></div>
                </div>
            </div>

            <div className='flex w-full justify-between'>
                <div className='text-[12px]'>
                    <h6 className='font-semibold'>Bank Details:</h6>
                    <p>Account No:  <EditableField
                        value={companyDetail.company_bank_account_no}
                        onChange={(val) => setCompanyDetail({
                            ...companyDetail, company_bank_account_no: val
                        })}
                        className='font-medium'
                    /></p>
                    <p>Bank Name: <EditableField
                        value={companyDetail.company_bank_name}
                        onChange={(val) => setCompanyDetail({
                            ...companyDetail, company_bank_name: val
                        })} className='font-medium'
                    /></p>
                    <p>Account Holder: <EditableField
                        value={companyDetail.company_name}
                        onChange={(val) => setCompanyDetail({
                            ...companyDetail, company_name: val
                        })} className='font-medium'
                    /></p>
                    <p>Branch: <EditableField
                        value={companyDetail.company_branch}
                        onChange={(val) => setCompanyDetail({
                            ...companyDetail, company_branch: val
                        })} className='font-medium'
                    /></p>
                    <p>IFSC Code: <EditableField
                        value={companyDetail.company_ifsc_code}
                        onChange={(val) => setCompanyDetail({
                            ...companyDetail, company_ifsc_code: val
                        })} className='font-medium'
                    /></p>
                </div>
                {/* <!-- Signature --> */}
                <div className="signature w-25 sm:w-50 p-2 flex flex-col items-end-safe justify-end-safe">
                    <p>Authorized Signature</p>
                    <div className='flex gap-1'>For <strong>
                        <EditableField
                            value={editableInvoice.invoice_by.company_name}
                            onChange={(val) => setEditableInvoice({
                                ...editableInvoice,
                                invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                            })}
                        />
                    </strong></div>
                </div>
            </div>
        </>
    )
}

export default DefaultTemplate;