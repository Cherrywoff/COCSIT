import React from 'react';

export default function Login({ usernameInput, setUsernameInput, passwordInput, setPasswordInput, loginError, loginLoading, handleLogin }) {
  return (
    <div style={{ maxWidth: '450px', margin: '60px auto' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>Portal Authentication</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '25px' }}>Enter your COCSIT credentials to log into your dashboard.</p>

        {loginError && <div style={{ color: 'var(--accent-rose)', background: 'rgba(225,29,72,0.05)', border: '1px solid rgba(225,29,72,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>{loginError}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Username</label>
            <input type="text" className="form-input" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} placeholder="e.g. admin or student_cs" required />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }} disabled={loginLoading}>
            {loginLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '25px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Test Accounts Available:</div>
          <p>• <strong>Admin:</strong> admin / password123</p>
          <p>• <strong>HOD (CS):</strong> hod_cs / password123</p>
          <p>• <strong>Faculty:</strong> teacher_cs / password123</p>
          <p>• <strong>Student:</strong> student_cs / password123</p>
        </div>
      </div>
    </div>
  );
}
