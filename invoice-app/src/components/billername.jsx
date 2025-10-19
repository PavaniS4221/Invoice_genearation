import React, { useState } from 'react';


function BillerName() {
  // Default data
  const [billerData, setBillerData] = useState({
    ownerName: 'SRi Chowdeshwari Enterprises',
    companyDesc: 'bjhisj',
    phone: '9901975301',
    email: 'info@srichowdeshwari.com',
    address: '#6,19th Cross, 7th Main, Bandappa Garden, Muthyala Nagar, Bangalore-560054',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    pin: '560054',
    website: 'www.srichowdeshwari.com',
    contactPerson: 'Mr. John Doe',
    gstin: '29AKVPM9209L1Z5',
  });

  const [buyerData, setBuyerData] = useState({
    name: 'Buyer Name',
    address: 'Buyer Address',
    city: 'Buyer City',
    state: 'Buyer State',
    country: 'Buyer Country',
    pin: 'Buyer Pin',
    phone: 'Buyer Phone',
    email: 'Buyer Email',
  });

  const [editingField, setEditingField] = useState({ section: null, field: null });

  // Handle double-click
  const handleDoubleClick = (section, field) => {
    setEditingField({ section, field });
  };

  // Handle input change
  const handleChange = (section, field, value) => {
    if (section === 'biller') {
      setBillerData({ ...billerData, [field]: value });
    } else {
      setBuyerData({ ...buyerData, [field]: value });
    }
  };

  // Save on Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') setEditingField({ section: null, field: null });
  };

  // Save on blur
  const handleBlur = () => setEditingField({ section: null, field: null });

  return (
    <div className="biller_owner_container">
      {/* ===== Owner/Biller Section ===== */}
      <div className="biller_section">
        <h3>Owner / Biller</h3>
        {Object.entries(billerData).map(([key, value]) => (
          <div
            key={key}
            onDoubleClick={() => handleDoubleClick('biller', key)}
            className="editable_field"
          >
            {editingField.section === 'biller' && editingField.field === key ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange('biller', key, e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <p>{formatLabel(key)}: {value}</p>
            )}
          </div>
        ))}
      </div>

      {/* ===== Buyer Section ===== */}
      <div className="buyer_section">
        <h3>Buyer Address</h3>
        {Object.entries(buyerData).map(([key, value]) => (
          <div
            key={key}
            onDoubleClick={() => handleDoubleClick('buyer', key)}
            className="editable_field"
          >
            {editingField.section === 'buyer' && editingField.field === key ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange('buyer', key, e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <p>{formatLabel(key)}: {value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper to make key labels readable
const formatLabel = (key) => {
  const map = {
    ownerName: 'Owner Name',
    companyDesc: 'Description',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    city: 'City',
    state: 'State',
    country: 'Country',
    pin: 'Pin',
    website: 'Website',
    contactPerson: 'Contact Person',
    gstin: 'GSTIN',
    name: 'Name',
  };
  return map[key] || key;
};

export default BillerName;
