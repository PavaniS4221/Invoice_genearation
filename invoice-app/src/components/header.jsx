import React, { useState } from 'react';
import './header.css';
import BillerName from './billername';

function Header() {
  // Initialize all fields with default values
  const [headerData, setHeaderData] = useState({
    invoiceNo: 'INV-001',
    invoiceDate: '2025-10-19',
    placeOfSupply: 'Bangalore',
    buyerOrder: 'BO-123',
    customerCode: 'CUST-001',
    paymentTerms: 'Net 30',
    deliveryTerms: 'Door Delivery',
  });

  const [editingField, setEditingField] = useState(null);

  // Double-click to edit
  const handleDoubleClick = (field) => {
    setEditingField(field);
  };

  // Input change
  const handleChange = (field, value) => {
    setHeaderData({
      ...headerData,
      [field]: value,
    });
  };

  // Save on Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') setEditingField(null);
  };

  // Save on blur
  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <div className="header">
      <h1>Tax Invoice</h1>
      <div className="header_container">
        <div className="header_left_top">
          <BillerName />
        </div>

        <div className="header_right_section">
          {Object.entries(headerData).map(([key, value]) => (
            <div
              className="header_right_top_bottom"
              key={key}
              onDoubleClick={() => handleDoubleClick(key)}
            >
              {editingField === key ? (
                <input
                  type={key === 'invoiceDate' ? 'date' : 'text'}
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  autoFocus
                />
              ) : (
                <p>
                  {formatLabel(key)}: {value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to format field names nicely
const formatLabel = (key) => {
  switch (key) {
    case 'invoiceNo':
      return 'Inv no';
    case 'invoiceDate':
      return 'Date';
    case 'placeOfSupply':
      return 'Place of Supply';
    case 'buyerOrder':
      return "Buyer's Order No.";
    case 'customerCode':
      return 'Customer code';
    case 'paymentTerms':
      return 'Payment Terms';
    case 'deliveryTerms':
      return 'Delivery Terms';
    default:
      return key;
  }
};

export default Header;
