
async function testChat() {
    const messages = [
        { role: 'user', content: 'Hi, I want to inquire about services.', id: '1' },
        { role: 'assistant', content: 'Hi, I assume. I am Dylan. What is your name?', id: '2' },
        { role: 'user', content: 'My name is Test User. My email is test@example.com. I need help with AI strategy.', id: '3' }
    ];

    try {
        console.log('Sending chat messages...');
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
            console.log('Stream started...');
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: true });
                if (chunkValue) console.log('Chunk:', chunkValue);
            }
            console.log('Stream finished.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testChat();
