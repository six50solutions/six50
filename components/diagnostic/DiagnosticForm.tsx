'use client';
// components/diagnostic/DiagnosticForm.tsx
//
// Mobile-first single column: a sticky top progress bar replaces the old
// desktop sidebar rail, options and inputs use ~52px touch targets, and the
// primary action is a full-width button (thumb-reachable, one clear CTA)
// with "Back" demoted to a small text link. All of this collapses back to a
// centered, comfortably-wide column on desktop rather than a second layout.
//
// Colors still flow from CSS custom properties (THEME below) so this
// inherits the real site's --ledger-* tokens once merged into the six50.io
// app — that's a standard, safe pattern in a normal Next.js/Tailwind build.
// (The separate standalone preview artifact hit a case where an external
// sandbox stripped custom-property declarations entirely; that's specific
// to that preview's rendering path, not to this app's real CSS pipeline.)

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DOMAINS, SCALE_A, type Question, type Tier } from '@/lib/diagnostic/instrument';

const THEME = {
  '--dx-bg': 'var(--ledger-bg, #0c0d10)',
  '--dx-surface': 'var(--ledger-surface, #15171c)',
  '--dx-rule': 'var(--ledger-rule, #333844)',
  '--dx-ink': 'var(--ledger-ink, #f4f2ee)',
  '--dx-muted': 'var(--ledger-muted, #9199a3)',
  '--dx-accent': 'var(--ledger-accent, #d4b45f)',
} as React.CSSProperties;

type SavedRow = { question_key: string; value_num: number | null; value_choice: string | null; value_choices: string[] | null; value_text: string | null };
type Local = Record<string, { num?: number | null; choice?: string | null; choices?: string[]; text?: string }>;

export default function DiagnosticForm({
  token, tier, orgName, questions, initialAnswers,
}: { token: string; tier: Tier; orgName: string | null; questions: Question[]; initialAnswers: SavedRow[] }) {
  const [answers, setAnswers] = useState<Local>(() => {
    const a: Local = {};
    for (const r of initialAnswers) {
      a[r.question_key] = { num: r.value_num, choice: r.value_choice, choices: r.value_choices ?? undefined, text: r.value_text ?? undefined };
    }
    return a;
  });
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'posted' | 'error'>('idle');
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showErrors, setShowErrors] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Group into screens: intro items first, then one screen per domain.
  const screens = useMemo(() => {
    const intro = questions.filter((q) => q.domain === null);
    const byDomain = (Object.keys(DOMAINS) as (keyof typeof DOMAINS)[])
      .map((d) => ({ code: DOMAINS[d].code, label: DOMAINS[d].label, questions: questions.filter((q) => q.domain === d) }))
      .filter((g) => g.questions.length > 0);
    return intro.length ? [{ code: '00', label: 'About your business', questions: intro }, ...byDomain] : byDomain;
  }, [questions]);

  const save = useCallback(async (q: Question, payload: Local[string]) => {
    setSaveState('saving');
    try {
      const res = await fetch(`/api/diagnostic/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionKey: q.key, domain: q.domain,
          valueNum: payload.num ?? null, valueChoice: payload.choice ?? null,
          valueChoices: payload.choices ?? null, valueText: payload.text ?? null,
        }),
      });
      setSaveState(res.ok ? 'posted' : 'error');
    } catch { setSaveState('error'); }
  }, [token]);

  const textTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const setAnswer = (q: Question, value: Local[string], debounce = false) => {
    setAnswers((prev) => ({ ...prev, [q.key]: value }));
    if (debounce) {
      clearTimeout(textTimers.current[q.key]);
      textTimers.current[q.key] = setTimeout(() => save(q, value), 700);
    } else { void save(q, value); }
  };

  useEffect(() => { headingRef.current?.focus(); }, [step]);

  const submit = async () => {
    setSubmitting(true);
    const res = await fetch(`/api/diagnostic/${token}/submit`, { method: 'POST' });
    setResult(res.ok ? await res.json() : { error: true });
    setSubmitting(false);
  };

  if (result) return <Receipt result={result} tier={tier} />;

  const current = screens[step];
  const isLast = step === screens.length - 1;
  const progressPct = Math.round(((step + 1) / screens.length) * 100);

  // Long free-text and multi-select are genuinely optional ("none apply" is a
  // real answer for multi, and indistinguishable from skipping). Everything
  // else must be answered — otherwise the score is computed from a partial
  // picture and, worse, testers sail past the intake screen leaving us with
  // submissions we can't attribute to anyone.
  const isAnswered = (q: Question) => {
    const a = answers[q.key];
    if (!a) return false;
    if (q.type === 'shortText' || q.type === 'text') return Boolean(a.text?.trim());
    if (q.type === 'multi') return true;
    return a.num != null || a.choice != null;
  };
  const isRequired = (q: Question) => q.type !== 'text' && q.type !== 'multi';

  const emailInvalid = (q: Question) => {
    if (q.key !== 'CONTACT_EMAIL') return false;
    const v = answers[q.key]?.text?.trim();
    if (!v) return false;
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const missing = current.questions.filter((q) => isRequired(q) && !isAnswered(q));
  const badEmail = current.questions.some(emailInvalid);
  const canAdvance = missing.length === 0 && !badEmail;

  const handleAdvance = () => {
    if (!canAdvance) { setShowErrors(true); return; }
    setShowErrors(false);
    if (isLast) submit();
    else { setStep((s) => s + 1); window.scrollTo(0, 0); }
  };

  return (
    <main style={THEME} className="min-h-dvh bg-[var(--dx-bg)] text-[var(--dx-ink)] pb-[env(safe-area-inset-bottom)]">
      {/* Sticky progress header — replaces the old desktop-only sidebar rail */}
      <div className="sticky top-0 z-10 border-b border-[var(--dx-rule)]/60 bg-[var(--dx-bg)]">
        <div className="h-[3px] w-full bg-[var(--dx-rule)]/40">
          <div
            className="h-full bg-[var(--dx-accent)] transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mx-auto flex max-w-[600px] items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">
            Step {step + 1} of {screens.length}
          </span>
          <span aria-live="polite" className="min-w-[44px] text-right text-[11px] uppercase tracking-[0.1em] text-[var(--dx-muted)]/70">
            {saveState === 'saving' ? 'Saving' : saveState === 'posted' ? 'Saved' : saveState === 'error' ? 'Retry' : ''}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[600px] px-5 py-7 sm:px-6 sm:py-12">
        <h1 ref={headingRef} tabIndex={-1} className="mb-7 text-[22px] font-semibold leading-tight tracking-tight focus:outline-none sm:text-[25px]">
          <span className="mr-2.5 text-[13px] font-medium tabular-nums text-[var(--dx-muted)]">{current.code}</span>
          {current.label}
        </h1>

        <div className="space-y-8">
          {current.questions.map((q) => (
            <QuestionBlock
              key={q.key}
              q={q}
              value={answers[q.key]}
              onChange={setAnswer}
              invalid={showErrors && ((isRequired(q) && !isAnswered(q)) || emailInvalid(q))}
              invalidMessage={emailInvalid(q) ? 'Enter a valid email address' : 'This one\u2019s required'}
            />
          ))}
        </div>

        {showErrors && !canAdvance && (
          <p role="alert" className="mt-7 border-l-2 border-[var(--dx-accent)] pl-4 text-[14px] leading-relaxed text-[var(--dx-ink)]">
            {badEmail && missing.length === 0
              ? 'That email address doesn\u2019t look right — mind checking it?'
              : `${missing.length} question${missing.length === 1 ? '' : 's'} still to answer on this page.`}
          </p>
        )}

        <div className="mt-11 sm:flex sm:items-center sm:gap-4">
          <button
            onClick={handleAdvance}
            disabled={submitting}
            aria-disabled={!canAdvance}
            className={`block min-h-[52px] w-full border px-6 py-4 text-[16px] font-semibold transition-colors sm:w-auto
              ${canAdvance
                ? 'border-[var(--dx-accent)] bg-[var(--dx-accent)] text-[var(--dx-bg)] active:bg-[var(--dx-accent)]/85'
                : 'border-[var(--dx-rule)] bg-transparent text-[var(--dx-muted)]'}
              disabled:opacity-40`}
          >
            {submitting ? 'Submitting' : isLast ? 'Submit diagnostic' : 'Continue'}
          </button>
          {step > 0 && (
            <button
              onClick={() => { setStep((s) => Math.max(0, s - 1)); window.scrollTo(0, 0); }}
              className="mt-2.5 block w-full py-2.5 text-center text-[14px] text-[var(--dx-muted)] active:text-[var(--dx-ink)] sm:order-first sm:mt-0 sm:w-auto sm:py-0"
            >
              Back
            </button>
          )}
        </div>

        <p className="mt-7 text-[12.5px] font-medium leading-relaxed text-[var(--dx-muted)]/80">
          Answers save as you go — you can close this and come back to the same link.
          Responses are used only to prepare your diagnostic. Scoring is automated; a human reviews every write-up before it is sent.
        </p>
      </div>
    </main>
  );
}

function QuestionBlock({ q, value, onChange, invalid, invalidMessage }: {
  q: Question; value?: Local[string];
  onChange: (q: Question, v: Local[string], d?: boolean) => void;
  invalid?: boolean; invalidMessage?: string;
}) {
  const flag = invalid ? (
    <p className="mt-1.5 text-[13px] text-[var(--dx-accent)]">{invalidMessage}</p>
  ) : null;

  if (q.type === 'shortText') {
    return (
      <label className="block">
        <span className="mb-2 block text-[14px] font-medium text-[var(--dx-ink)]/90">{q.prompt}</span>
        <input
          id={q.key} type={q.inputType ?? 'text'} defaultValue={value?.text ?? ''}
          autoComplete={q.inputType === 'email' ? 'email' : q.key === 'CONTACT_NAME' ? 'name' : 'organization'}
          aria-invalid={invalid || undefined}
          onChange={(e) => onChange(q, { text: e.target.value }, true)}
          className={`min-h-[50px] w-full border bg-[var(--dx-surface)] px-4 py-3.5 text-[16px] text-[var(--dx-ink)] caret-[var(--dx-accent)] focus:outline-none
            ${invalid ? 'border-[var(--dx-accent)]' : 'border-[var(--dx-rule)] focus:border-[var(--dx-accent)]'}`}
        />
        {flag}
      </label>
    );
  }

  const label = (
    <>
      <p className="text-[16px] font-medium leading-snug">{q.prompt}</p>
      {'help' in q && q.help && <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--dx-muted)]">{q.help}</p>}
    </>
  );

  if (q.type === 'text') {
    return (
      <div>
        <label htmlFor={q.key}>{label}</label>
        <textarea
          id={q.key} rows={3} defaultValue={value?.text ?? ''}
          onChange={(e) => onChange(q, { text: e.target.value }, true)}
          className="mt-3 w-full border border-[var(--dx-rule)] bg-[var(--dx-surface)] p-3.5 text-[16px] text-[var(--dx-ink)] caret-[var(--dx-accent)] focus:border-[var(--dx-accent)] focus:outline-none"
        />
      </div>
    );
  }

  if (q.type === 'self') {
    const v = value?.num;
    return (
      <fieldset>
        <legend>{label}</legend>
        <div className="mt-3.5 flex gap-2" role="radiogroup">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n} role="radio" aria-checked={v === n}
              onClick={() => onChange(q, { num: n })}
              className={`h-[52px] flex-1 border text-[16px] tabular-nums transition-colors active:bg-[var(--dx-surface)]
                ${v === n ? 'border-[var(--dx-accent)] bg-[var(--dx-accent)]/10 text-[var(--dx-accent)]' : 'border-[var(--dx-rule)] bg-[var(--dx-surface)] text-[var(--dx-muted)]'}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[12px] text-[var(--dx-muted)]">
          <span>Barely holding</span><span>Runs itself</span>
        </div>
        {flag}
      {flag}
    </fieldset>
    );
  }

  if (q.type === 'multi') {
    const selected = value?.choices ?? [];
    return (
      <fieldset>
        <legend>{label}</legend>
        <div className="mt-3.5 space-y-2">
          {q.options.map((o) => {
            const on = selected.includes(o.label);
            return (
              <label key={o.label} className={`flex min-h-[52px] cursor-pointer items-center gap-3.5 border px-4 py-3.5 text-[15.5px] leading-snug transition-colors active:bg-[var(--dx-surface)]
                ${on ? 'border-[var(--dx-accent)] bg-[var(--dx-accent)]/10' : 'border-[var(--dx-rule)] bg-[var(--dx-surface)]'}`}>
                <input
                  type="checkbox" checked={on} className="sr-only"
                  onChange={() => {
                    const next = on ? selected.filter((s) => s !== o.label) : [...selected, o.label];
                    onChange(q, { choices: next, num: Math.max(0, 4 - next.length * q.penalty) });
                  }}
                />
                <span aria-hidden className={`inline-block h-2.5 w-2.5 flex-none rounded-full ${on ? 'bg-[var(--dx-accent)]' : 'bg-[var(--dx-rule)]'}`} />
                {o.label}
              </label>
            );
          })}
        </div>
        {flag}
      {flag}
    </fieldset>
    );
  }

  const options = q.type === 'scaleA' ? SCALE_A : q.options;
  return (
    <fieldset>
      <legend>{label}</legend>
      <div className="mt-3.5 space-y-2" role="radiogroup">
        {options.map((o) => {
          const raw = o.score;
          const scored = q.type === 'scaleA' && q.reverse ? 4 - raw : raw;
          const on = value?.choice === o.label;
          return (
            <label key={o.label} className={`flex min-h-[52px] cursor-pointer items-center gap-3.5 border px-4 py-3.5 text-[15.5px] leading-snug transition-colors active:bg-[var(--dx-surface)]
              ${on ? 'border-[var(--dx-accent)] bg-[var(--dx-accent)]/10' : 'border-[var(--dx-rule)] bg-[var(--dx-surface)]'}`}>
              <input
                type="radio" name={q.key} checked={on} className="sr-only"
                onChange={() => onChange(q, { choice: o.label, num: scored })}
              />
              <span aria-hidden className={`inline-block h-2.5 w-2.5 flex-none rounded-full ${on ? 'bg-[var(--dx-accent)]' : 'bg-[var(--dx-rule)]'}`} />
              {o.label}
            </label>
          );
        })}
      </div>
      {flag}
    </fieldset>
  );
}

function Receipt({ result, tier }: { result: any; tier: Tier }) {
  if (result.error) {
    return (
      <main style={THEME} className="min-h-dvh bg-[var(--dx-bg)] px-5 py-20 text-[var(--dx-ink)]">
        <div className="mx-auto max-w-[600px]">
          <h1 className="text-xl font-semibold">That didn&apos;t submit.</h1>
          <p className="mt-3 text-[var(--dx-muted)]">Your answers are saved. Reload this link and submit again — nothing was lost.</p>
        </div>
      </main>
    );
  }

  if (tier === 'full') {
    return (
      <main style={THEME} className="min-h-dvh bg-[var(--dx-bg)] px-5 py-20 text-[var(--dx-ink)]">
        <div className="mx-auto max-w-[600px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">Received</p>
          <h1 className="mt-3 text-2xl font-semibold">Your responses are in.</h1>
          <p className="mt-4 leading-relaxed text-[var(--dx-muted)]">
            Scoring runs automatically; the write-up is reviewed by a person before it goes out. Expect it within two business days,
            along with a 90-day sequence built from what you told us.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={THEME} className="min-h-dvh bg-[var(--dx-bg)] pb-[env(safe-area-inset-bottom)] text-[var(--dx-ink)]">
      <div className="sticky top-0 z-10 border-b border-[var(--dx-rule)]/60 bg-[var(--dx-bg)]">
        <div className="h-[3px] w-full bg-[var(--dx-accent)]" />
        <div className="mx-auto max-w-[600px] px-5 py-3.5 sm:px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">Results</span>
        </div>
      </div>

      <div className="mx-auto max-w-[600px] px-5 py-7 sm:px-6 sm:py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">Business Efficiency Score</p>
        <p className="mt-2.5 text-[60px] font-semibold leading-none tabular-nums text-[var(--dx-accent)] sm:text-[72px]">{result.ols}</p>
        <h1 className="mt-1.5 text-2xl font-semibold">{result.band}</h1>
        <p className="mt-3.5 text-[15px] leading-relaxed text-[var(--dx-muted)]">{result.bandNote}</p>

        {result.divergences?.length > 0 && (
          <div className="mt-9 border-l-2 border-[var(--dx-accent)] pl-4.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">Blind spot</p>
            <p className="mt-2 text-[15px] leading-relaxed">
              Your self-rating and your answers disagree here by a wide margin. That gap is usually the most expensive
              thing on this page, because it&apos;s the one nobody is actively fixing.
            </p>
          </div>
        )}

        <ol className="mt-9 border-t border-[var(--dx-rule)]/60">
          {(result.flags ?? []).map((f: any, i: number) => (
            <li key={f.code} className="flex gap-3.5 border-b border-[var(--dx-rule)]/60 py-4.5">
              <span className="mt-0.5 flex-none text-[12px] tabular-nums text-[var(--dx-muted)]">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[15px] leading-relaxed">{f.finding}</span>
            </li>
          ))}
        </ol>

        {result.automation?.length > 0 && (
          <div className="mt-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">Automation opportunities</p>
            {result.automation.map((a: any) => (
              <div key={a.flagCode} className="mt-3.5 border-t border-[var(--dx-rule)]/60 pt-3.5">
                <h3 className="text-[15px] font-semibold">{a.name}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-[var(--dx-muted)]">{a.automation}</p>
              </div>
            ))}
          </div>
        )}

        {result.scaling?.length > 0 && (
          <div className="mt-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">Scaling opportunities</p>
            <ul className="mt-3.5 space-y-3.5">
              {result.scaling.map((s: any) => (
                <li key={s.code} className="border-t border-[var(--dx-rule)]/60 pt-3.5 text-[14px] leading-relaxed text-[var(--dx-muted)]">{s.finding}</li>
              ))}
            </ul>
          </div>
        )}

        {result.narrative && (
          <div className="mt-9 border border-[var(--dx-rule)] p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--dx-muted)]">For your goal</p>
            <p className="mt-3 text-[15px] leading-relaxed">{result.narrative}</p>
          </div>
        )}

        <div className="mt-11 sm:flex sm:items-center sm:gap-4">
          <a
            href="/contact"
            className="block min-h-[52px] w-full border border-[var(--dx-accent)] bg-[var(--dx-accent)] px-6 py-4 text-center text-[16px] font-semibold text-[var(--dx-bg)] active:bg-[var(--dx-accent)]/85 sm:w-auto"
          >
            Book the full diagnostic
          </a>
          {/* A submitted token is spent — restarting has to mint a fresh one,
              so send them back through /scan rather than resetting local state. */}
          <a
            href="/scan"
            className="mt-2.5 block min-h-[52px] w-full border border-[var(--dx-rule)] px-6 py-4 text-center text-[16px] font-medium active:bg-[var(--dx-surface)] sm:mt-0 sm:w-auto"
          >
            Start over
          </a>
        </div>

        <p className="mt-9 text-[12.5px] leading-relaxed text-[var(--dx-muted)]/80">
          Scored automatically from your answers. This is a screen, not a diagnosis — the full version tests these findings against your systems and numbers.
        </p>
      </div>
    </main>
  );
}
