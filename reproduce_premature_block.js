
async function verifyPrematureBlock() {
    // Simulate the history where bot asks for confirmation BEFORE saving
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
            // This matches my CURRENT broad check, causing premature blocking
            content: "Thank you, Adil. I have your Name, Email, Phone, Company, Goal, and Timeline. Is there anything else I can help you with before I save these details for follow-up?"
        },
        {
            role: 'user',
            content: "that is all"
        }
    ];

    console.log('--- Simulating "Before I Save" Scenario ---');

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

        // We EXPECT the bot to call the tool (or say "Saved!").
        // If my blocking logic is active, it might return empty or "Lead already saved" message if it's a tool result loop,
        // but here we just see what text comes back.
        // If "High Traffic" or strange refusal -> Failure.

        if (text && !text.includes("high traffic")) {
            console.log('✅ RESPONSE RECEIVED (Check content to see if it actually saved).');
        } else {
            console.log('❌ FAILURE: High traffic error or empty response.');
        }

    } catch (error) {
        console.error('Network error:', error);
    }
}

verifyPrematureBlock();
