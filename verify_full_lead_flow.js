
async function verifyLeadFlow() {
    // Step 1: User asks to schedule
    let messages = [
        { role: 'user', content: 'I want to schedule a meeting', id: '1' }
    ];

    console.log('--- Step 1: User asks to schedule ---');
    let responseText = await sendChat(messages);
    console.log('Bot Response 1:', responseText);

    if (responseText.includes('Name') && responseText.includes('Email')) {
        console.log('✅ Bot asks for Name and Email correctly.');
    } else {
        console.log('⚠️ Bot response missing Name/Email request.');
    }

    // Step 2: User provides details
    messages.push({ role: 'assistant', content: responseText, id: '2' });
    messages.push({ role: 'user', content: 'My name is Adizz, email is adizz@test.com. I am from Six50 Testing. I want to discuss AI strategy. My phone is 555-0199 and Timeline is ASAP.', id: '3' });

    console.log('\n--- Step 2: User provides details ---');
    responseText = await sendChat(messages);
    console.log('Bot Response 2:', responseText);

    if (responseText.includes('Thank you for providing your information, someone will reach out to you soon')) {
        console.log('✅ Bot responded with the correct confirmation message.');
    } else {
        console.log('❌ Bot response DID NOT match the expected confirmation message.');
    }
}

async function sendChat(messages) {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Server error: ${text}`);
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
        return fullText;

    } catch (error) {
        console.error('Error sending chat:', error);
        return '';
    }
}

verifyLeadFlow();
