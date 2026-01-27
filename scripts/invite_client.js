
const { Resend } = require('resend');

// Simple script to send an invite email
// Requires RESEND_API_KEY in environment or hardcoded for test
// Usage: node scripts/invite_client.js

// Mock env loader if dotenv not present in runtime context
if (!process.env.RESEND_API_KEY) {
    // In a real local env, we might need to load from .env.local
    // For this agent session, I'll rely on the existing env or prompt user 
    // But since I can't interactively prompt easily in a script without blocking, 
    // I will assume the user has the key or I need to find it. 
    // For now, let's try to proceed, if it fails I'll ask user.
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendInvite() {
    console.log("Sending invite to adilghazali@yahoo.com...");

    try {
        const { data, error } = await resend.emails.send({
            from: 'Adil from Six50 <adil.ghazali@six50.io>',
            to: ['adilghazali@yahoo.com'],
            subject: 'Exclusive Access: Your six50 Client Portal',
            html: `
                <div style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #111;">Welcome to your Project Portal</h1>
                    <p>Hi Adil,</p>
                    <p>We've set up a secure client portal for you to track our engagement progress, access documents, and view real-time metrics.</p>
                    
                    <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin-top: 0; font-weight: bold;">Your Login Credentials:</p>
                        <p><strong>URL:</strong> <a href="http://localhost:3000/login">http://localhost:3000/login</a></p>
                        <p><strong>Email:</strong> adilghazali@yahoo.com</p>
                        <p><strong>Temporary Password:</strong> Test1234</p>
                    </div>

                    <p>Please log in and review the initial Scope of Work and Timeline.</p>
                    <p>Best,<br>The six50 Team</p>
                </div>
            `,
        });

        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully!", data);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

// Check for API Key 
const fs = require('fs');
const path = require('path');

// Try to read .env.local to get key if process.env is empty (common in local scripts)
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        const match = envConfig.match(/RESEND_API_KEY=(.*)/);
        if (match && match[1]) {
            process.env.RESEND_API_KEY = match[1].trim();
            // Re-instantiate with found key
            resend.api_key = process.env.RESEND_API_KEY;
        }
    }
} catch (e) {
    // ignore
}

sendInvite();
