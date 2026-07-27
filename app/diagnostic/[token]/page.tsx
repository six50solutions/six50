import { notFound } from 'next/navigation';
import DiagnosticForm from '@/components/diagnostic/DiagnosticForm';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { questionsFor, type Tier } from '@/lib/diagnostic/instrument';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Operating Diagnostic — six50 solutions', robots: { index: false, follow: false } };

export default async function DiagnosticPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data } = await supabaseAdmin.rpc('resolve_invitation', { p_token: token });
  const inv = data?.[0];
  if (!inv) notFound();

  if (!inv.is_valid) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <p className="text-sm uppercase tracking-[0.2em] opacity-60">Link closed</p>
        <h1 className="mt-3 text-2xl">This diagnostic link is no longer open.</h1>
        <p className="mt-4 opacity-70">
          {inv.status === 'submitted'
            ? 'Your responses were received. We\u2019ll be in touch with the write-up.'
            : 'Links expire after 30 days. Reply to the email that sent you here and we\u2019ll issue a new one.'}
        </p>
      </main>
    );
  }

  const { data: saved } = await supabaseAdmin
    .from('responses')
    .select('question_key, value_num, value_choice, value_choices, value_text')
    .eq('invitation_id', inv.invitation_id);

  return (
    <DiagnosticForm
      token={token}
      tier={inv.tier as Tier}
      orgName={inv.org_name}
      questions={questionsFor(inv.tier as Tier)}
      initialAnswers={saved ?? []}
    />
  );
}
