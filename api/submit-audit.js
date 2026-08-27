import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { companyName, founderName, email, revenueRange, scores } = req.body;

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('gates_audit_responses')
      .insert([
        {
          company_name: companyName,
          founder_name: founderName,
          email,
          revenue_range: revenueRange,
          displacement_score: scores.displacement,
          governance_score: scores.governance,
          capability_score: scores.capability,
          overall_score: scores.overall,
          readiness_level: scores.level,
          submitted: true,
        },
      ]);

    if (dbError) throw dbError;

// Send notification to contact@six50.io
await resend.emails.send({
from: 'contact@six50.io',
to: 'contact@six50.io',
subject: `New AI Readiness Assessment: ${founderName} (${companyName}) - Score: ${scores.overall}/100`,
html: `<div><h2>Assessment from ${founderName}</h2><p>Company: ${companyName}<br>Email: ${email}<br>Score: ${scores.overall}/100<br>Level: ${scores.level}</p></div>`
});

// Send confirmation to respondent
await resend.emails.send({
from: 'contact@six50.io',
to: email,
      subject: `Your AI Readiness Score: ${scores.overall}/100`,
      html: `
        <h2>Your AI Readiness Index: ${scores.overall}/100</h2>
        <p>Hi ${founderName},</p>
        <p>Thank you for completing the AI Risk Analyzer. Your readiness assessment is below:</p>
        <ul>
          <li>Displacement Risk: ${scores.displacement}%</li>
          <li>Governance Risk: ${scores.governance}%</li>
          <li>Capability Gap: ${scores.capability}%</li>
        </ul>
        <p>Schedule a consultation to discuss your AI transition strategy:</p>
        <a href="https://calendly.com/adil-ghazali-six50">Book a Call</a>
      `,
    });

    res.status(200).json({ success: true, score: scores.overall });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
