
async function reproduceIssue() {
    const messages = [
        { role: 'user', content: 'I want to schedule a meeting', id: '1' }
    ];

    try {
        console.log('Sending message: "I want to schedule a meeting"');
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Full Error Response:', text);
        } else {
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
            console.log('Chatbot Response:', fullText);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

reproduceIssue();
