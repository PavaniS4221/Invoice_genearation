import React from 'react';

const Footer = ({ 
  subtotal, 
  cgst, 
  sgst, 
  igst, 
  grandTotal, 
  taxMode, 
  taxRatePercent,
  sellerName,
  numberToWords 
}) => {
  return (
    <>
      {/* Bottom Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        {/* Left Side - Terms and Conditions */}
        <div style={{ flex: 1, marginRight: 20 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: 10 }}>Terms & Conditions:</div>
          <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
            <div style={{ marginBottom: 3 }}>1. Goods once sold will not be taken back in any circumstances</div>
            <div style={{ marginBottom: 3 }}>2. Subject to Bangalore Jurisdiction only</div>
            <div style={{ marginBottom: 3 }}>3. Payment is due within 7 days of invoice date</div>
            <div style={{ marginBottom: 3 }}>4. Late payment charges may apply as per company policy</div>
            <div style={{ marginBottom: 3 }}>5. All disputes are subject to local jurisdiction</div>
            <div style={{ marginBottom: 3 }}>6. Service charges are non-refundable after service completion</div>
            <div>7. For any queries, contact us at the provided contact information</div>
          </div>
          
          {/* E.& O.E */}
          <div style={{ fontSize: '10px', marginTop: 20 }}>E.& O.E</div>
        </div>

        {/* Right Side - Financial Summary */}
        <div style={{ flex: 1, maxWidth: '300px' }}>
          <div style={{ fontSize: '12px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span>Sub Total</span>
              <span>{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {taxMode === 'cgst_sgst' ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span>CGST @{(Number(taxRatePercent)/2).toFixed(2)}%</span>
                  <span>{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span>SGST @{(Number(taxRatePercent)/2).toFixed(2)}%</span>
                  <span>{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span>IGST @{Number(taxRatePercent).toFixed(2)}%</span>
                <span>{igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span>Round off</span>
              <span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', marginTop: 10 }}>
              <span>Grand Total</span>
              <span>{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amount in Words */}
      <div style={{ marginTop: 15, fontSize: '12px' }}>
        <div><strong>Total Invoice Value in Words :</strong> {numberToWords(Math.round(grandTotal))} Rupees only</div>
      </div>

      {/* Signature Section */}
      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* Left Side - Customer Signature */}
        <div style={{ flex: 1, textAlign: 'center', maxWidth: '200px' }}>
          <div style={{ fontSize: '12px', marginBottom: 10 }}>Customer Signature</div>
          <div style={{ 
            width: '150px', 
            height: '40px', 
            border: '1px solid #000', 
            margin: '0 auto 10px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Signature Line */}
          </div>
          <div style={{ fontSize: '10px', color: '#666' }}>Date: _______________</div>
        </div>

        {/* Right Side - Company Signature */}
        <div style={{ textAlign: 'center', maxWidth: '200px' }}>
          <div style={{ fontSize: '12px', marginBottom: 10 }}>For {sellerName}</div>
          <div style={{ fontSize: '10px', marginBottom: 10 }}>Authorised Signatory</div>
          {/* Company Stamp Placeholder */}
          <div style={{ 
            width: '80px', 
            height: '80px', 
            border: '2px solid #000', 
            borderRadius: '50%', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '8px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            {sellerName.toUpperCase()}<br/>BANGALORE
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
