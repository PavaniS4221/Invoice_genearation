import React from 'react';

const Table = ({ items, updateItem, removeItem, addItem, lineValue }) => {
  return (
    <>
      {/* Line Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20, border: '1px solid #000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: 8, textAlign: 'center', border: '1px solid #000', fontSize: '12px' }}>Sl.No</th>
            <th style={{ padding: 8, textAlign: 'left', border: '1px solid #000', fontSize: '12px' }}>Description</th>
            <th style={{ padding: 8, textAlign: 'center', border: '1px solid #000', fontSize: '12px' }}>HSN Code</th>
            <th style={{ padding: 8, textAlign: 'center', border: '1px solid #000', fontSize: '12px' }}>Qty.</th>
            <th style={{ padding: 8, textAlign: 'right', border: '1px solid #000', fontSize: '12px' }}>Rate / Unit</th>
            <th style={{ padding: 8, textAlign: 'right', border: '1px solid #000', fontSize: '12px' }}>Value In INR</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: 8, border: '1px solid #000', textAlign: 'center', fontSize: '12px' }}>{item.si}</td>
              <td style={{ padding: 8, border: '1px solid #000', fontSize: '12px' }}>
                <input
                  type="text"
                  value={item.description}
                  onChange={e => updateItem(index, 'description', e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '12px' }}
                  placeholder="Description"
                />
              </td>
              <td style={{ padding: 8, border: '1px solid #000', fontSize: '12px' }}>
                <input
                  type="text"
                  value={item.hsn}
                  onChange={e => updateItem(index, 'hsn', e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '12px', textAlign: 'center' }}
                  placeholder="HSN Code"
                />
              </td>
              <td style={{ padding: 8, border: '1px solid #000', fontSize: '12px' }}>
                <input
                  type="number"
                  value={item.qty}
                  onChange={e => updateItem(index, 'qty', e.target.value)}
                  style={{ width: '50px', border: 'none', background: 'transparent', fontSize: '12px', textAlign: 'center' }}
                />
              </td>
              <td style={{ padding: 8, border: '1px solid #000', fontSize: '12px' }}>
                <input
                  type="number"
                  value={item.rate}
                  onChange={e => updateItem(index, 'rate', e.target.value)}
                  style={{ width: '80px', border: 'none', background: 'transparent', fontSize: '12px', textAlign: 'right' }}
                  placeholder="0.00"
                />
              </td>
              <td style={{ padding: 8, border: '1px solid #000', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>
                {lineValue(item).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
          {/* Add empty rows to match the original format */}
          {Array.from({ length: Math.max(0, 10 - items.length) }).map((_, index) => (
            <tr key={`empty-${index}`}>
              <td style={{ padding: 8, border: '1px solid #000', height: '30px' }}></td>
              <td style={{ padding: 8, border: '1px solid #000' }}></td>
              <td style={{ padding: 8, border: '1px solid #000' }}></td>
              <td style={{ padding: 8, border: '1px solid #000' }}></td>
              <td style={{ padding: 8, border: '1px solid #000' }}></td>
              <td style={{ padding: 8, border: '1px solid #000' }}></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 8 }}>
        <button onClick={addItem}>Add Item</button>
      </div>
    </>
  );
};

export default Table;