
async function verifyCrashBySimulation() {
    // Simulate the exact history from the user's screenshot
    const history = [
        {
            role: 'user',
            content: `Here are my details for the inquiry:
Name: Adil Ghazali
Email: adizzle34@yahoo.com
Phone: 3315885097
Company: Wikibits
Goal: Revenue Increase
Timeline: 12 weeks`
        },
        {
            role: 'assistant',
            // The text that previously failed to trigger the check because it didn't match "Thank you for providing your information"
            content: "Thank you, Adil. Wikibits is noted as the company. I have: Name: Adil Ghazali Email: adizzle34@yahoo.com Phone: 3315885097 Company: Wikibits Goal: Revenue Increase Timeline: 12 weeks I will save this information now to initiate the scheduling process."
        },
        {
            role: 'user',
            content: "thx"
        }
    ];

    console.log('--- Simulating Follow-Up with Specific History ---');
    console.log('History len:', history.length);

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
            console.log('✅ SUCCESS: Bot responded naturally (tools were correctly disabled).');
        } else {
            console.log('❌ FAILURE: High traffic error or empty response.');
        }

    } catch (error) {
        console.error('Network error:', error);
    }
}

verifyCrashBySimulation();
