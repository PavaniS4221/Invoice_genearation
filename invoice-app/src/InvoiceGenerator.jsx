/*
Invoice Generator (React single-file component)

How to use:
1. Create a React app (Vite or CRA).
2. Install dependencies:
   npm install jspdf html2canvas
3. Put this file in your project (e.g. src/InvoiceGenerator.jsx)
4. Import and render <InvoiceGenerator /> in App.jsx

This component provides:
- Header inputs (Invoice No, Date, Buyer Order)
- Dynamic line items (SI No, Description, HSN, Qty, Rate/No, Value INR)
- Auto-calculation of line values, subtotal, taxes (CGST/SGST or IGST), grand total
- Export invoice area to PDF using html2canvas + jsPDF
*/

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function InvoiceGenerator() {
  // header
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [buyerOrder, setBuyerOrder] = useState("");

  // tax mode: 'cgst_sgst' or 'igst'
  const [taxMode, setTaxMode] = useState("cgst_sgst");
  const [taxRatePercent, setTaxRatePercent] = useState(18); // total tax percent

  // line items
  const [items, setItems] = useState([
    { si: 1, description: "", hsn: "", qty: 1, rate: 0 }
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
    const element = invoiceRef.current;

    // make a high-res canvas snapshot
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // create PDF
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    // calculate image dims to fit A4 with margins
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    // preserve aspect ratio
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let position = margin;
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    pdf.save(`${invoiceNo || "invoice"}.pdf`);
  }

  return (
    <div className="p-4 font-sans" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <h2 style={{ marginBottom: 12 }}>Invoice Generator</h2>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <label>Invoice No: <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} /></label>
        <label>Date: <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} /></label>
        <label>Buyer Order: <input value={buyerOrder} onChange={e => setBuyerOrder(e.target.value)} /></label>

        <label>Tax Mode: 
          <select value={taxMode} onChange={e => setTaxMode(e.target.value)}>
            <option value="cgst_sgst">CGST + SGST</option>
            <option value="igst">IGST</option>
          </select>
        </label>

        <label>Tax %: <input type="number" value={taxRatePercent} onChange={e => setTaxRatePercent(e.target.value)} style={{ width: 70 }} /></label>
      </div>

      {/* Invoice Preview area (export this) */}
      <div ref={invoiceRef} style={{ padding: 18, border: '1px solid #ddd', maxWidth: 800, background: 'white' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h3 style={{ margin: 0 }}>Seller / Supplier</h3>
            <div>Company Name</div>
            <div>Address line 1</div>
            <div>City - PIN</div>
            <div>GSTIN: ________</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div><strong>TAX INVOICE</strong></div>
            <div>Invoice No: {invoiceNo}</div>
            <div>Date: {invoiceDate}</div>
            <div>Buyer's Order: {buyerOrder}</div>
          </div>
        </header>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
  <tr
    style={{
      borderBottom: '1px solid #ba5757ff',
      textAlign: 'left',
      color: 'black', // ✅ ensures header text is black
    }}
  >
    <th style={{ padding: 6 }}>SI NO</th>
    <th style={{ padding: 6 }}>Description</th>
    <th style={{ padding: 6 }}>HSN</th>
    <th style={{ padding: 6 }}>Qty</th>
    <th style={{ padding: 6 }}>Rate / No</th>
    <th style={{ padding: 6 }}>Value INR</th>
    <th style={{ padding: 6 }}>Actions</th>
  </tr>
</thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={idx} style={{ borderBottom: '1px dashed #eee' }}>
                <td style={{ padding: 6 }}>{it.si}</td>
                <td style={{ padding: 6 }}>
                  <input value={it.description} onChange={e => updateItem(idx, 'description', e.target.value)} />
                </td>
                <td style={{ padding: 6 }}>
                  <input value={it.hsn} onChange={e => updateItem(idx, 'hsn', e.target.value)} style={{ width: 80 }} />
                </td>
                <td style={{ padding: 6 }}>
                  <input type="number" value={it.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} style={{ width: 60 }} />
                </td>
                <td style={{ padding: 6 }}>
                  <input type="number" value={it.rate} onChange={e => updateItem(idx, 'rate', e.target.value)} style={{ width: 100 }} />
                </td>
                <td style={{ padding: 6 }}>{lineValue(it).toFixed(2)}</td>
                <td style={{ padding: 6 }}>
                  <button onClick={() => removeItem(idx)} disabled={items.length === 1}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 8 }}>
          <button onClick={addItem}>Add Item</button>
        </div>

        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 24 }}>
          <div style={{ minWidth: 300 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Sub Total</div><div>{subtotal.toFixed(2)}</div></div>
            {taxMode === 'cgst_sgst' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>CGST @{(Number(taxRatePercent)/2).toFixed(2)}%</div><div>{cgst.toFixed(2)}</div></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>SGST @{(Number(taxRatePercent)/2).toFixed(2)}%</div><div>{sgst.toFixed(2)}</div></div>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>IGST @{Number(taxRatePercent).toFixed(2)}%</div><div>{igst.toFixed(2)}</div></div>
            )}

            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}><div>Grand Total</div><div>{grandTotal.toFixed(2)}</div></div>
          </div>
        </div>

        <footer style={{ marginTop: 20 }}>
          <div>Total Invoice Value in Words: <em>{numberToWords(Math.round(grandTotal))} Rupees only</em></div>
        </footer>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={exportPDF}>Export as PDF</button>
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
