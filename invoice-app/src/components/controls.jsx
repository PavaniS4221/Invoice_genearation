import React from 'react';

const Controls = ({
  // Basic Information
  invoiceNo, setInvoiceNo,
  invoiceDate, setInvoiceDate,
  buyerOrder, setBuyerOrder,
  customerCode, setCustomerCode,
  placeOfSupply, setPlaceOfSupply,
  paymentTerms, setPaymentTerms,
  deliveryTerms, setDeliveryTerms,
  
  // Seller Information
  sellerName, setSellerName,
  sellerAddress, setSellerAddress,
  sellerPhone, setSellerPhone,
  sellerGST, setSellerGST,
  
  // Customer Information
  customerName, setCustomerName,
  customerAddress, setCustomerAddress,
  customerGST, setCustomerGST,
  
  // Tax Configuration
  taxMode, setTaxMode,
  taxRatePercent, setTaxRatePercent
}) => {
  return (
    <div style={{ marginBottom: 20, padding: 15, border: '1px solid #ddd', borderRadius: 5, backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginTop: 0 }}>Invoice Configuration</h3>
      
      {/* Basic Invoice Info */}
      <div style={{ marginBottom: 15 }}>
        <h4>Basic Information</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label>Invoice No: <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} /></label>
          <label>Date: <input value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} /></label>
          <label>Buyer Order: <input value={buyerOrder} onChange={e => setBuyerOrder(e.target.value)} /></label>
          <label>Customer Code: <input value={customerCode} onChange={e => setCustomerCode(e.target.value)} /></label>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <label>Place of Supply: <input value={placeOfSupply} onChange={e => setPlaceOfSupply(e.target.value)} /></label>
        </div>
      </div>

      {/* Seller Information */}
      <div style={{ marginBottom: 15 }}>
        <h4>Seller/Supplier Information</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label>Seller Name: <input value={sellerName} onChange={e => setSellerName(e.target.value)} style={{ width: 200 }} /></label>
          <label>GST: <input value={sellerGST} onChange={e => setSellerGST(e.target.value)} /></label>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <label>Address: <input value={sellerAddress} onChange={e => setSellerAddress(e.target.value)} style={{ width: 300 }} /></label>
          <label>Phone: <input value={sellerPhone} onChange={e => setSellerPhone(e.target.value)} /></label>
        </div>
      </div>

      {/* Customer Information */}
      <div style={{ marginBottom: 15 }}>
        <h4>Customer Information</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label>Customer Name: <input value={customerName} onChange={e => setCustomerName(e.target.value)} style={{ width: 200 }} /></label>
          <label>GST: <input value={customerGST} onChange={e => setCustomerGST(e.target.value)} /></label>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Address: <input value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} style={{ width: 400 }} /></label>
        </div>
      </div>

      {/* Terms Information */}
      <div style={{ marginBottom: 15 }}>
        <h4>Terms Information</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label>Payment Terms: <input value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} style={{ width: 250 }} /></label>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Delivery Terms: <input value={deliveryTerms} onChange={e => setDeliveryTerms(e.target.value)} style={{ width: 400 }} /></label>
        </div>
      </div>

      {/* Tax Configuration */}
      <div>
        <h4>Tax Configuration</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label>Tax Mode: 
            <select value={taxMode} onChange={e => setTaxMode(e.target.value)}>
              <option value="cgst_sgst">CGST + SGST</option>
              <option value="igst">IGST</option>
            </select>
          </label>
          <label>Tax %: <input type="number" value={taxRatePercent} onChange={e => setTaxRatePercent(e.target.value)} style={{ width: 70 }} /></label>
        </div>
      </div>
    </div>
  );
};

export default Controls;
