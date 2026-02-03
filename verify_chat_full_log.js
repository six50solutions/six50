
async function verifyChat() {
    console.log("Sending chat messages...");
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: 'Hello, are you working?' }
                ]
            })
        });

        console.log(`Response Status: ${response.status}`);

        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            const text = await response.text();
            console.error("Error Body:", text);
            return;
        }

        console.log("Stream started...");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value, { stream: true });
            console.log("RECEIVED CHUNK:", text);
        }

        console.log("Stream finished.");

    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

verifyChat();
