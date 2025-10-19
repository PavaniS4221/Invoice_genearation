import React from 'react';
import './foter.css';
function Footer()  {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40,backgroundColor: '#f9f9f9', padding: '20px' ,color:'black'}}> 
      
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
        <div style={{ fontSize: '10px', marginTop: 20 }}>E.& O.E</div>
      </div>
<div className="footer-divider"></div>
      {/* Right Side - Signatures */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '40px', alignItems: 'flex-end' }}>
        
      

        {/* Company Signature */}
        <div style={{ textAlign: 'center', maxWidth: '150px' }}>
          
          <div style={{ fontSize: '10px', marginBottom: 10 }}>Authorised Signatory</div>
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
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
