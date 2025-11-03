// Simple end-to-end registration script
// Usage: node scripts/register-e2e.js
// Requires backend running at http://localhost:5000

(async () => {
  try {
    const base = process.env.BACKEND_URL || 'http://localhost:5000';
    const email = `test+${Date.now()}@example.com`;
    const payload = {
      firstName: 'E2E',
      lastName: 'Tester',
      email,
      password: 'password123',
      country: 'Testland',
      agreeToTerms: true
    };

    console.log('Registering user:', email);
    const res = await fetch(`${base}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const body = await res.json().catch(() => null);
    console.log('Status:', res.status);
    console.log('Body:', body);
    if (body?.token) {
      console.log('Received token (first 32 chars):', body.token.substring(0, 32) + '...');
    }
  } catch (err) {
    console.error('E2E script error:', err);
    process.exit(1);
  }
})();
