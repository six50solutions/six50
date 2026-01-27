
async function testChat() {
    try {
        const res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] }),
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let result = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value);
        }

        console.log("Chat Response:", result);
    } catch (e) {
        console.error('Chat error:', e);
    }
}

testChat();
