import React from 'react';

const Header = ({ 
  invoiceNo, 
  invoiceDate, 
  placeOfSupply, 
  buyerOrder, 
  customerCode, 
  paymentTerms, 
  deliveryTerms,
  sellerName,
  sellerAddress,
  sellerPhone,
  sellerGST,
  customerName,
  customerAddress,
  customerGST
}) => {
  return (
    <>
      {/* Header Section - TAX INVOICE */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#000' }}>TAX INVOICE</h1>
      </div>

      {/* Top Section with Invoice Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        {/* Left Side - Seller Information */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: 5 }}>{sellerName}</div>
            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>{sellerAddress}</div>
            <div style={{ fontSize: '12px' }}>{sellerPhone}</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>GSTIN No: {sellerGST}</div>
          </div>

          {/* Consignee Information */}
          <div style={{ marginTop: 15 }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: 5 }}>Name & Address of Consignee:</div>
            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
              <div style={{ fontWeight: 'bold' }}>{customerName}</div>
              <div>{customerAddress}</div>
              <div style={{ fontWeight: 'bold' }}>GSTIN No: {customerGST}</div>
            </div>
          </div>
        </div>

        {/* Right Side - Invoice Details */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: '10px', marginBottom: 10, textAlign: 'right' }}>Original - for Buyer's</div>
          
          <div style={{ fontSize: '12px', lineHeight: '1.8', textAlign: 'left' }}>
            <div><strong>Inv no:</strong> {invoiceNo}</div>
            <div><strong>Date -</strong> {invoiceDate}</div>
            <div><strong>Place of Supply :</strong> {placeOfSupply}</div>
            <div><strong>Buyer's Order No.:</strong> {buyerOrder || ""}</div>
            <div><strong>Customer code:</strong> {customerCode || ""}</div>
            <div><strong>Payment terms:</strong> {paymentTerms}</div>
            <div><strong>Delivery terms:</strong> {deliveryTerms}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
