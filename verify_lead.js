
const lead = {
    name: "Verification Bot",
    email: "admin@six50.io",
    company: "Antigravity Testing",
    goal: "Verify email delivery logic",
    source: "chat"
};

async function test() {
    try {
        console.log("Sending:", JSON.stringify(lead));
        const res = await fetch('http://localhost:3000/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead),
        });
        const text = await res.text();
        console.log('Status:', res.status);
        console.log('Response:', text);
    } catch (e) {
        console.error('Fetch error:', e);
    }
}

test();
