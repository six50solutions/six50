
async function verifyFormSubmission() {
    // Simulate the exact message format constructed in ChatWidget.tsx
    const simulatedFormMessage = `Here are my details for the medical/consulting assessment:
Name: Test User
Email: test@example.com
Phone: 123-456-7890
Company: Tech Corp
Goal: Automation
Timeline: ASAP`;

    let messages = [
        { role: 'user', content: simulatedFormMessage, id: '1' } // This is what the manualSubmit sends
    ];

    console.log('--- Simulating Form Submission ---');
    console.log('Sending Message:', simulatedFormMessage);

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            console.error('Server Error:', await response.text());
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let fullText = '';
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value, { stream: true });
            if (chunkValue) fullText += chunkValue;
        }

        console.log('\nBot Response:', fullText);

        if (fullText.includes('Thank you for providing your information')) {
            console.log('✅ SUCCESS: Bot accepted form data and sent confirmation.');
        } else {
            console.log('❌ FAILURE: Bot did not send the expected confirmation.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

verifyFormSubmission();
