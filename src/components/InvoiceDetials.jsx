import React, { useRef, useState } from 'react';
import '../style/Invoice.css';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png';
import editI from '../assets/edit.png';
import { Download, FileText, Image } from 'lucide-react';

const InvoiceDetail = () => {
    const { id } = useParams();
    const { yourInvoices, yourProducts, navigate } = React.useContext(DataContext);
    const componentRef = useRef();

    const invoice = yourInvoices.find(val => val.invoice_id == id);

    const [changeTitle, setChangeTitle] = useState(false);


    const product_name = (pID) => {
        // console.log(yourProducts)
        const temp = yourProducts.find(val => val.product_id == pID).product_name;
        return temp;
    }


    const downloadAsPDF = async () => {

        if (!componentRef.current) return;

        const clone = componentRef.current.cloneNode(true);

        // 🔁 Force desktop classes
        clone.classList.remove("scale-[90%]");
        clone.classList.add("scale-100", "text-[12px]", "md:text-[12px]", "p-4");

        // Force full width
        clone.style.width = "1024px";
        clone.style.maxWidth = "none";
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';

        document.body.appendChild(clone);

        try {
            const canvas = await html2canvas(clone, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * pageWidth) / canvas.width;

            if (imgHeight < pageHeight) {
                pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
            } else {
                let position = 0;
                while (position < imgHeight) {
                    pdf.addImage(imgData, 'PNG', 0, -position, pageWidth, imgHeight);
                    position += pageHeight;
                    if (position < imgHeight) pdf.addPage();
                }
            }

            pdf.save(`Invoice_${invoice.invoice_number}.pdf`);
        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("Failed to generate PDF.");
        } finally {
            document.body.removeChild(clone);
        }
    };

    const downloadAsImage = async () => {
        if (!componentRef.current) return;

        const clone = componentRef.current.cloneNode(true);


        clone.classList.remove("scale-[90%]");
        clone.classList.add("scale-100", "text-[12px]", "md:text-[12px]", "p-4");

        clone.style.width = "1024px";
        clone.style.maxWidth = "none";
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        document.body.appendChild(clone);


        try {
            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `Invoice_${invoice.invoice_number}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Image Export Error:", error);
            alert("Failed to generate image.");
        } finally {
            document.body.removeChild(clone);
        }
    };

    const handleDeleteInvoice = async (invoiceId, companyId) => {
        const isOk = window.confirm("Are you sure you want to delete this Invoice?");
        if (isOk) {
            try {
                await api.delete(`invoices/${invoiceId}?company_id=${companyId}`, {
                });
                alert("Invoice Deleted Successfully.");
                navigate('/invoices');
            } catch (e) {
                console.error("Error deleting invoice:", e);
                alert(e.response?.data?.message || "Failed to delete invoice");
            }
        }
    };


    if (!invoice) {
        return (<div className='text-center mt-10'>
            <h5 className='text-2xl font-semibold text-yellow-700'>Invoice Not Found !</h5>
            <button className='btn-1 px-4' onClick={() => navigate('/invoices')}>Go Back</button>
        </div>)
    }

    return (
        <div className="p-8 py-2">
            <h3 className="text-3xl font-bold text-center mb-6 text-blue-900">
                Invoice Details
            </h3>

            <div className="flex justify-center flex-wrap gap-1 md:gap-3 mb-2">
                <button onClick={downloadAsImage} className="btn-1 px-5 py-2 flex gap-0 md:gap-2">
                    <Image className='icon' />
                    Download PNG
                </button>
                <button onClick={downloadAsPDF} className="btn-1 px-5 py-2 flex gap-0 md:gap-2">
                    <Download className='icon' />
                    Download PDF
                </button>
            </div>

            <div className="flex justify-center mb-0 md:mb-5 gap-1">
                <h5 className='md:text-lg text-sm text-blue-800 font-semibold mr-2'>Choose Invoice Title : </h5>
                <div className='flex md:flex-row flex-col gap-1'>
                    <div onClick={() => setChangeTitle(true)} className='cursor-pointer' >
                        <input type="radio" name="invoice-title" id="invoice-title" checked={changeTitle} />
                        <span className='md:text-lg text-sm font-medium mr-2' >Perfoma</span>
                    </div>
                    <div onClick={() => setChangeTitle(false)} className='cursor-pointer'>
                        <input type="radio" name="invoice-title" id="invoice-title" checked={!changeTitle} />
                        <span className='md:text-lg text-sm  font-medium'>Tax</span>
                    </div>
                </div>
            </div>

            <div ref={componentRef} className="invoice-container">
                {/* <!-- Header --> */}
                <div className="invoice-header">
                    <div className="company-info">
                        <div className="logo">LOGO</div>
                        <div className="company-details">
                            <h2>{invoice.invoice_by.company_name}</h2>
                            <p>{invoice.invoice_by.company_address}</p>
                            <p>GSTIN {invoice.invoice_by.company_gstin}</p>
                            <p>MSME: {invoice.invoice_by.company_msme}</p>
                            <p>{invoice.invoice_by.company_email}</p>
                        </div>
                    </div>
                    <div className="invoice-title">{changeTitle ? "PERFOMA" : "TAX"} INVOICE</div>
                </div>

                {/* <!-- Invoice Info --> */}
                <div className="invoice-info">
                    <div className="info-left">
                        <div># Invoice: {invoice.invoice_number}</div>
                        <div>Date: {new Date(invoice.invoice_date).toLocaleDateString()}</div>
                        <div>Terms: {invoice.invoice_terms}</div>
                        <div>Due Date: {new Date(invoice.invoice_due_date).toLocaleDateString()}</div>
                    </div>
                    <div className="info-right">
                        <div>Place Of Supply: {invoice.invoice_place_of_supply}</div>
                    </div>
                </div>

                {/* <!-- Bill & Ship To --> */}
                <div className="billing-shipping">
                    <div className="box">
                        <div className="box-title">Bill To</div>
                        <div className="box-body">
                            <p className="bold">{invoice.client.customer_name}</p>
                            <p>{invoice.client.customer_address_line1}</p>
                            <p>{invoice.client.customer_address_line2}</p>
                            <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                            <p>{invoice.client.customer_country}</p>
                            <p>GSTIN {invoice.client.customer_gstin}</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-title">Ship To</div>
                        <div className="box-body">
                            <p className="bold">{invoice.client.customer_name}</p>
                            <p>{invoice.client.customer_address_line1}</p>
                            <p>{invoice.client.customer_address_line2}</p>
                            <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                            <p>{invoice.client.customer_country}</p>
                            <p>GSTIN {invoice.client.customer_gstin}</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Products Table --> */}
                <div className="product-table-wrapper">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item & Description</th>
                                <th>HSN/SAC</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>CGST%</th>
                                <th>CGST Amt</th>
                                <th>SGST%</th>
                                <th>SGST Amt</th>
                                <th>IGST%</th>
                                <th>IGST Amt</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.products.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{product_name(item.product_id) || "Product"}</td>
                                    <td>996819</td>
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

                {/* <!-- Totals --> */}
                <div className="totals-section">
                    <div className="notes">
                        <p><strong>Total In Words:</strong> Indian Rupee Fifteen Thousand Eight Hundred Seventy-One Only</p>
                        <p><strong>Notes:</strong> {invoice.invoice_notes}</p>
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

                {/* <!-- Signature --> */}
                <div className="signature">
                    <p>Authorized Signature</p>
                    <div>For {invoice.invoice_by.company_name}</div>
                </div>
            </div>


            <div className="details-btns">
                <button
                    onClick={() => navigate("/invoices")}
                    className="back"
                >
                    Back
                </button>
                <button
                    onClick={() => handleDeleteInvoice(invoice.invoice_id, invoice.owner_company)}
                    className="delete"
                >
                    <img src={deleteI} alt="Delete" className="btn-icon" /> Delete
                </button>
                <button
                    onClick={() => navigate(`/invoiceForm/${invoice.invoice_id}`)}
                    className="edit btn-1"
                >
                    <img src={editI} alt="Edit" className="btn-icon" /> Edit
                </button>
            </div>
        </div>
    )

};

export default InvoiceDetail;
