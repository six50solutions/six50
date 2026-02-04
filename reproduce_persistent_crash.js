
async function verifyCrashPersistence() {
    // Simulate the exact history from the user's latest screenshot
    const history = [
        {
            role: 'user',
            content: `Here are my details for the inquiry:
Name: Adil Ghazali
Email: adizzle34@yahoo.com
Phone: 3314421321
Company: wikibits
Goal: revenue increase
Timeline: 12 weeks`
        },
        {
            role: 'assistant',
            // This specific response failed to trigger my previous check
            content: "Thank you, Adil. I have your Name, Email, Phone, Company, Goal, and Timeline."
        },
        {
            role: 'user',
            content: "when will someone reach out"
        }
    ];

    console.log('--- Simulating Follow-Up with "I have your..." History ---');

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: history })
        });

        if (!response.ok) {
            console.error('Server error:', await response.text());
            return;
        }

        const text = await response.text();
        console.log('Bot Response:', text);

        if (text && !text.includes("high traffic")) {
            console.log('✅ SUCCESS: Bot responded naturally.');
        } else {
            console.log('❌ FAILURE: High traffic error or empty response.');
        }

    } catch (error) {
        console.error('Network error:', error);
    }
}

verifyCrashPersistence();
