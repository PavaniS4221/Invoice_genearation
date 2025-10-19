import React, { useState } from 'react';
import './table.css';

function Table() {
  const [items, setItems] = useState([
    { id: 1, description: 'Product 1', hsn: '1001', qty: 2, rate: 100 },
    { id: 2, description: 'Product 2', hsn: '1002', qty: 1, rate: 200 },
  ]);

  const [editingCell, setEditingCell] = useState({ id: null, field: null });

  // Calculate value per row
  const getValue = (qty, rate) => {
    const q = parseFloat(qty) || 0;
    const r = parseFloat(rate) || 0;
    return q * r;
  };

  // Subtotal
  const subTotal = items.reduce((sum, item) => sum + getValue(item.qty, item.rate), 0);

  // Tax calculations
  const cgst = subTotal * 0.09;
  const sgst = subTotal * 0.09;
  const igst = 0; // 18% if applicable
  const grandTotal = subTotal + cgst + sgst + igst;
  const roundOff = Math.round(grandTotal) - grandTotal;

  // Edit handling
  const handleDoubleClick = (id, field) => {
    setEditingCell({ id, field });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') setEditingCell({ id: null, field: null });
  };

  const handleChange = (id, field, value) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: items.length + 1,
      description: '',
      hsn: '',
      qty: '',
      rate: '',
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="table_container">
      <table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Description</th>
            <th>HSN Code</th>
            <th>Qty.</th>
            <th>Rate/Unit</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>

              {['description', 'hsn', 'qty', 'rate'].map((field) => (
                <td
                  key={field}
                  onDoubleClick={() => handleDoubleClick(item.id, field)}
                >
                  {editingCell.id === item.id && editingCell.field === field ? (
                    <input
                      autoFocus
                      type={field === 'qty' || field === 'rate' ? 'number' : 'text'}
                      value={item[field]}
                      onChange={(e) =>
                        handleChange(item.id, field, e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      onBlur={() => setEditingCell({ id: null, field: null })}
                    />
                  ) : (
                    item[field]
                  )}
                </td>
              ))}

              <td>{getValue(item.qty, item.rate).toFixed(2)}</td>
            </tr>
          ))}

          {/* ---- Summary rows ---- */}
          <tr>
            <td colSpan="5" className="summary-label">Sub Total</td>
            <td className="summary-value">{subTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5" className="summary-label">CGST @ 9%</td>
            <td className="summary-value">{cgst.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5" className="summary-label">SGST @ 9%</td>
            <td className="summary-value">{sgst.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5" className="summary-label">IGST @ 18%</td>
            <td className="summary-value">{igst.toFixed(2)}</td>
          </tr>
          
          <tr className="grand-total-row">
            <td colSpan="5" className="summary-label">Grand Total</td>
            <td className="summary-value">{grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <button onClick={handleAdd}>Add Item</button>
      </div>
    </div>
  );
}

export default Table;
