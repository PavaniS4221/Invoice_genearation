
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "./components/header";
import Table from "./components/table";
import Footer from "./components/footer";
import Controls from "./components/controls";

export default function InvoiceGenerator() {
  // Seller/Supplier Information (Sri Chowdeshwari Enterprises)
  const [sellerName, setSellerName] = useState("Sri Chowdeshwari Enterprises");
  const [sellerAddress, setSellerAddress] = useState("#6,19th Cross, 7th Main, Bandappa Garden, Muthyala Nagar, Bangalore-560054");
  const [sellerPhone, setSellerPhone] = useState("Ph- 9901975301");
  const [sellerGST, setSellerGST] = useState("29AKVPM9209L1Z5");

  // Customer Information (JAGRUTHI CABS)
  const [customerName, setCustomerName] = useState("M/s. JAGRUTHI CABS");
  const [customerAddress, setCustomerAddress] = useState("1ST FLOOR, 682/2, 17th E Cross Road, Indiranagar, Bengaluru");
  const [customerGST, setCustomerGST] = useState("29AASFJ8811A1Z6");

  // Invoice header
  const [invoiceNo, setInvoiceNo] = useState("047");
  const [invoiceDate, setInvoiceDate] = useState("18.10.2025");
  const [buyerOrder, setBuyerOrder] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("Bangalore");
  const [paymentTerms, setPaymentTerms] = useState("100 % payment at the time of installation");
  const [deliveryTerms, setDeliveryTerms] = useState("Within a day from the date of receipt of confirmed PO.");

  // Service Details
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [tripDetails, setTripDetails] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  // tax mode: 'cgst_sgst' or 'igst'
  const [taxMode, setTaxMode] = useState("cgst_sgst");
  const [taxRatePercent, setTaxRatePercent] = useState(18); // total tax percent

  // line items (matching the actual invoice)
  const [items, setItems] = useState([
    { si: 1, description: "AIS 140 Device", hsn: "85269190", qty: 1, rate: 9850.00 },
    { si: 2, description: "E-SIM Charges", hsn: "998313", qty: 1, rate: 2400.00 },
    { si: 3, description: "Panic Buttons", hsn: "998319", qty: 4, rate: 500.00 }
  ]);

  const invoiceRef = useRef(null);

  function updateItem(index, field, value) {
    const next = items.map((it, i) => i === index ? { ...it, [field]: value } : it);
    setItems(next);
  }

  function addItem() {
    setItems(prev => [...prev, { si: prev.length + 1, description: "", hsn: "", qty: 1, rate: 0 }]);
  }

  function removeItem(index) {
    const next = items.filter((_, i) => i !== index).map((it, i) => ({ ...it, si: i + 1 }));
    setItems(next);
  }

  function lineValue(item) {
    const q = Number(item.qty) || 0;
    const r = Number(item.rate) || 0;
    return q * r;
  }

  const subtotal = items.reduce((s, it) => s + lineValue(it), 0);

  // split tax
  const totalTax = +(subtotal * (Number(taxRatePercent) / 100));
  const cgst = taxMode === "cgst_sgst" ? +(totalTax / 2) : 0;
  const sgst = taxMode === "cgst_sgst" ? +(totalTax / 2) : 0;
  const igst = taxMode === "igst" ? +totalTax : 0;

  const grandTotal = +(subtotal + cgst + sgst + igst);

  async function exportPDF() {
    if (!invoiceRef.current) return;
    
    // Create PDF with professional formatting
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;

    // Helper function to add text with word wrap
    function addTextWithWrap(text, x, y, maxWidth, fontSize = 10, fontStyle = 'normal') {
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * fontSize * 0.35);
    }

    // Helper function to draw line
    function drawLine(x1, y1, x2, y2) {
      pdf.line(x1, y1, x2, y2);
    }

    // Helper function to check if we need a new page
    function checkNewPage(requiredHeight) {
      if (yPosition + requiredHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    }

    // Company Header
    pdf.setTextColor(0, 0, 0);
    yPosition = addTextWithWrap(sellerName, margin, 12, pageWidth - 2 * margin, 16, 'bold');
    yPosition += 5;

    // Invoice Title
    pdf.setFillColor(220, 220, 220);
    pdf.rect(0, yPosition - 5, pageWidth, 15, 'F');
    yPosition = addTextWithWrap("TAX INVOICE", margin, yPosition + 5, pageWidth - 2 * margin, 14, 'bold');
    yPosition += 10;

    // Company and Customer Information
    const infoWidth = (pageWidth - 3 * margin) / 2;
    
    // Service Provider Info
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text("Service Provider", margin, yPosition);
    yPosition += 5;
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    yPosition = addTextWithWrap(sellerName, margin, yPosition, infoWidth, 10);
    yPosition = addTextWithWrap(sellerAddress, margin, yPosition, infoWidth, 10);
    yPosition = addTextWithWrap(sellerPhone, margin, yPosition, infoWidth, 10);
    yPosition = addTextWithWrap(`GSTIN: ${sellerGST}`, margin, yPosition, infoWidth, 10);

    // Customer Info
    const customerStartY = yPosition - 30; // Reset to same level as company info
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text("Bill To", margin + infoWidth + margin, customerStartY);
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    let customerY = customerStartY + 5;
    customerY = addTextWithWrap(customerName, margin + infoWidth + margin, customerY, infoWidth, 10);
    customerY = addTextWithWrap(customerAddress, margin + infoWidth + margin, customerY, infoWidth, 10);
    customerY = addTextWithWrap(`GST: ${customerGST}`, margin + infoWidth + margin, customerY, infoWidth, 10);

    yPosition = Math.max(yPosition, customerY) + 10;

    // Invoice Details
    checkNewPage(30);
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, yPosition - 5, pageWidth, 25, 'F');
    
    const invoiceDetails = [
      `Invoice No: ${invoiceNo}`,
      `Date: ${invoiceDate}`,
      `Buyer's Order: ${buyerOrder || ""}`,
      `Customer Code: ${customerCode || ""}`,
      `Payment Terms: ${paymentTerms}`,
      `Delivery Terms: ${deliveryTerms}`
    ];

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    let detailsY = yPosition + 5;
    
    // Invoice details
    invoiceDetails.forEach(detail => {
      pdf.text(detail, margin, detailsY);
      detailsY += 4;
    });

    yPosition += 25;

    // Items Table Header
    checkNewPage(40);
    pdf.setFillColor(240, 240, 240);
    pdf.rect(0, yPosition - 5, pageWidth, 15, 'F');
    
    const colWidths = [15, 80, 20, 20, 25, 30, 20]; // Column widths in mm
    const colPositions = [margin];
    for (let i = 1; i < colWidths.length; i++) {
      colPositions[i] = colPositions[i-1] + colWidths[i-1];
    }

    const headers = ["SI", "Description", "HSN", "Qty", "Rate", "Amount", "Actions"];
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'bold');
    
    headers.forEach((header, index) => {
      pdf.text(header, colPositions[index], yPosition + 5);
    });
    
    drawLine(margin, yPosition + 8, pageWidth - margin, yPosition + 8);
    yPosition += 15;

    // Items Table Body
    items.forEach((item, index) => {
      checkNewPage(15);
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      
      const rowData = [
        item.si.toString(),
        item.description || "Service Description",
        item.hsn || "HSN Code",
        item.qty.toString(),
        `₹${item.rate.toFixed(2)}`,
        `₹${lineValue(item).toFixed(2)}`,
        "Remove"
      ];
      
      rowData.forEach((data, colIndex) => {
        pdf.text(data, colPositions[colIndex], yPosition + 5);
      });
      
      drawLine(margin, yPosition + 8, pageWidth - margin, yPosition + 8);
      yPosition += 12;
    });

    yPosition += 10;

    // Financial Summary
    checkNewPage(60);
    const summaryWidth = 80;
    const summaryX = pageWidth - margin - summaryWidth;
    
    pdf.setFillColor(249, 249, 249);
    pdf.rect(summaryX - 5, yPosition - 5, summaryWidth + 10, 50, 'F');
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    
    // Sub Total
    pdf.text("Sub Total:", summaryX, yPosition + 5);
    pdf.text(`₹${subtotal.toFixed(2)}`, summaryX + 50, yPosition + 5);
    yPosition += 8;
    drawLine(summaryX, yPosition, summaryX + summaryWidth, yPosition);
    yPosition += 5;

    // Tax details
    if (taxMode === 'cgst_sgst') {
      pdf.text(`CGST @${(Number(taxRatePercent)/2).toFixed(2)}%:`, summaryX, yPosition + 5);
      pdf.text(`₹${cgst.toFixed(2)}`, summaryX + 50, yPosition + 5);
      yPosition += 8;
      
      pdf.text(`SGST @${(Number(taxRatePercent)/2).toFixed(2)}%:`, summaryX, yPosition + 5);
      pdf.text(`₹${sgst.toFixed(2)}`, summaryX + 50, yPosition + 5);
      yPosition += 8;
    } else {
      pdf.text(`IGST @${Number(taxRatePercent).toFixed(2)}%:`, summaryX, yPosition + 5);
      pdf.text(`₹${igst.toFixed(2)}`, summaryX + 50, yPosition + 5);
      yPosition += 8;
    }

    drawLine(summaryX, yPosition, summaryX + summaryWidth, yPosition);
    yPosition += 8;

    // Grand Total
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text("Grand Total:", summaryX, yPosition + 5);
    pdf.text(`₹${grandTotal.toFixed(2)}`, summaryX + 50, yPosition + 5);

    yPosition += 20;

    // Amount in Words
    checkNewPage(30);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'bold');
    pdf.text("Amount in Words:", margin, yPosition);
    
    pdf.setFont(undefined, 'italic');
    yPosition = addTextWithWrap(`${numberToWords(Math.round(grandTotal))} Rupees Only`, margin + 30, yPosition, pageWidth - margin - 30, 10);
    
    yPosition += 15;

    // Terms and Conditions
    checkNewPage(50);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'bold');
    pdf.text("Terms and Conditions:", margin, yPosition);
    yPosition += 8;
    
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(8);
    
    const terms = [
      "1. Payment is due within 7 days of invoice date.",
      "2. Late payment charges may apply as per company policy.",
      "3. All disputes are subject to local jurisdiction.",
      "4. Service charges are non-refundable after service completion.",
      `5. For any queries, contact us at ${companyPhone} or ${companyEmail}`
    ];
    
    terms.forEach(term => {
      yPosition = addTextWithWrap(term, margin, yPosition, pageWidth - 2 * margin, 8);
      yPosition += 3;
    });

    yPosition += 10;

    // Signature Section
    checkNewPage(30);
    const sigWidth = (pageWidth - 3 * margin) / 2;
    
    // Customer Signature
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text("Customer Signature:", margin, yPosition);
    drawLine(margin, yPosition + 8, margin + sigWidth, yPosition + 8);
    pdf.text("Date: _______________", margin, yPosition + 15);
    
    // Company Signature
    pdf.text(`For ${sellerName}:`, margin + sigWidth + margin, yPosition);
    drawLine(margin + sigWidth + margin, yPosition + 8, pageWidth - margin, yPosition + 8);
    pdf.text("Authorized Signature", margin + sigWidth + margin, yPosition + 15);

    // Save PDF
    pdf.save(`${invoiceNo || "invoice"}.pdf`);
  }

  return (
    <div className="p-4 font-sans" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <h2 style={{ marginBottom: 12 }}>Invoice Generator</h2>

      {/* Controls */}
      <Controls
        // Basic Information
        invoiceNo={invoiceNo} setInvoiceNo={setInvoiceNo}
        invoiceDate={invoiceDate} setInvoiceDate={setInvoiceDate}
        buyerOrder={buyerOrder} setBuyerOrder={setBuyerOrder}
        customerCode={customerCode} setCustomerCode={setCustomerCode}
        placeOfSupply={placeOfSupply} setPlaceOfSupply={setPlaceOfSupply}
        paymentTerms={paymentTerms} setPaymentTerms={setPaymentTerms}
        deliveryTerms={deliveryTerms} setDeliveryTerms={setDeliveryTerms}
        
        // Seller Information
        sellerName={sellerName} setSellerName={setSellerName}
        sellerAddress={sellerAddress} setSellerAddress={setSellerAddress}
        sellerPhone={sellerPhone} setSellerPhone={setSellerPhone}
        sellerGST={sellerGST} setSellerGST={setSellerGST}
        
        // Customer Information
        customerName={customerName} setCustomerName={setCustomerName}
        customerAddress={customerAddress} setCustomerAddress={setCustomerAddress}
        customerGST={customerGST} setCustomerGST={setCustomerGST}
        
        // Tax Configuration
        taxMode={taxMode} setTaxMode={setTaxMode}
        taxRatePercent={taxRatePercent} setTaxRatePercent={setTaxRatePercent}
      />

      {/* Invoice Preview area (export this) */}
      <div ref={invoiceRef} style={{ padding: 20, border: '1px solid #ddd', maxWidth: 800, background: 'white', fontFamily: 'Arial, sans-serif' }}>
        <Header
          invoiceNo={invoiceNo}
          invoiceDate={invoiceDate}
          placeOfSupply={placeOfSupply}
          buyerOrder={buyerOrder}
          customerCode={customerCode}
          paymentTerms={paymentTerms}
          deliveryTerms={deliveryTerms}
          sellerName={sellerName}
          sellerAddress={sellerAddress}
          sellerPhone={sellerPhone}
          sellerGST={sellerGST}
          customerName={customerName}
          customerAddress={customerAddress}
          customerGST={customerGST}
        />

        <Table
          items={items}
          updateItem={updateItem}
          removeItem={removeItem}
          addItem={addItem}
          lineValue={lineValue}
        />

        <Footer
          subtotal={subtotal}
          cgst={cgst}
          sgst={sgst}
          igst={igst}
          grandTotal={grandTotal}
          taxMode={taxMode}
          taxRatePercent={taxRatePercent}
          sellerName={sellerName}
          numberToWords={numberToWords}
        />
      </div>

      <div style={{ marginTop: 20, textAlign: 'center', padding: 20, backgroundColor: '#f0f8ff', borderRadius: 8, border: '2px solid #4CAF50' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#2E7D32' }}>Generate Professional Invoice PDF</h3>
        <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
          Export a comprehensive, professional invoice PDF with all company details, service information, financial calculations, terms & conditions, and signature areas.
        </p>
        <button 
          onClick={exportPDF}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          📄 Export Complete Invoice PDF
        </button>
        <div style={{ marginTop: 10, fontSize: '12px', color: '#666' }}>
          Includes: Company Info • Customer Details • Service Information • Financial Summary • Terms & Conditions • Signatures
        </div>
      </div>
    </div>
  );
}

// simple number to words (Indian) converter for integers up to crores (basic implementation)
function numberToWords(num) {
  if (num === 0) return 'Zero';
  const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  function inWords(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n/10)] + (n%10 ? ' ' + a[n%10] : '');
    if (n < 1000) return a[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' ' + inWords(n%100) : '');
    if (n < 100000) return inWords(Math.floor(n/1000)) + ' Thousand' + (n%1000 ? ' ' + inWords(n%1000) : '');
    if (n < 10000000) return inWords(Math.floor(n/100000)) + ' Lakh' + (n%100000 ? ' ' + inWords(n%100000) : '');
    return inWords(Math.floor(n/10000000)) + ' Crore' + (n%10000000 ? ' ' + inWords(n%10000000) : '');
  }
  return inWords(num);
}
