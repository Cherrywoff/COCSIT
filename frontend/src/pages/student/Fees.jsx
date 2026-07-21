import React from 'react';

const Fees = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--accent-indigo)', marginBottom: '20px' }}>Fees & Ledger</h2>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eaeaea' }}>
          <h3>Fee Status: <span style={{ color: 'green' }}>No Dues</span></h3>
          <button className="btn btn-primary">Pay Online</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eaeaea' }}>
              <th style={{ padding: '12px' }}>Installment</th>
              <th style={{ padding: '12px' }}>Amount</th>
              <th style={{ padding: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No fee records found for the current academic year.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;
