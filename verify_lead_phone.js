
const lead = {
    name: "Phone Test Bot",
    email: "phone_test@example.com",
    phone: "123-456-7890",
    company: "Antigravity Connectivity",
    goal: "Verify phone field delivery",
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
