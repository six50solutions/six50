"use client";

import { useState, type FormEvent } from "react";

// Requires these in your Next.js env (Vercel project settings + .env.local):
//   NEXT_PUBLIC_SUPABASE_URL=https://isoahjpwdklvqbkzucca.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=<the anon/publishable key>
//
// This version has zero external dependencies — it calls Supabase's
// PostgREST endpoint directly via fetch() instead of the supabase-js SDK,
// so no `npm install` is required. Functionally identical to the SDK version.
//
// The anon key is safe to ship client-side — it's restricted by an
// INSERT-only RLS policy on crm_contacts, scoped to rows where
// source = 'card_qr'. It cannot read, edit, or delete existing CRM data.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  role_title: string;
  company_name_raw: string;
  relationship_notes: string;
};

const initialState: FormState = {
  full_name: "",
  email: "",
  phone: "",
  role_title: "",
  company_name_raw: "",
  relationship_notes: "",
};

async function insertLead(payload: Record<string, string | null>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/crm_contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase insert failed (${res.status}): ${detail}`);
  }
}

export default function CardConnectPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await insertLead({
        source: "card_qr",
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        role_title: form.role_title.trim() || null,
        company_name_raw: form.company_name_raw.trim() || null,
        relationship_notes: form.relationship_notes.trim() || null,
      });

      // Best-effort admin email notification — never blocks the success UX
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          role_title: form.role_title.trim() || undefined,
          company: form.company_name_raw.trim() || undefined,
          goal: form.relationship_notes.trim() || undefined,
          source: "card_qr",
        }),
      }).catch(() => {});

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div
      className="relative z-[2] flex min-h-svh items-center justify-center px-4 py-12"
      data-no-burst="true"
    >
      <main className="w-full max-w-md">
        <section className="overflow-hidden rounded-md border border-line-strong bg-ink-800/90 shadow-2xl shadow-black/60 backdrop-blur-md">
          <div className="flex items-baseline justify-between border-b border-line px-6 py-4">
            <span className="font-mono text-lg font-medium tracking-[0.02em] text-paper">
              six<span className="text-gold-500">50</span>
              <span className="text-gold-500">.</span>
            </span>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fog-2">
              Lead capture · <span className="text-gold-500">001</span>
            </span>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <h1 className="font-display text-[2rem] leading-tight">
              Let&apos;s <em className="serif-accent text-gold-500">stay in touch</em>
            </h1>
            <p className="mt-1 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-fog">
              Share your info — Adil will follow up directly
            </p>

            {status === "success" ? (
              <div className="mt-6 rounded-md border border-line bg-ink-900/70 p-5 text-center">
                <p className="text-sm text-paper">
                  <span className="text-gold-500">✓ Thanks</span> — got it.
                </p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-fog">
                  Adil will be in touch soon. In the meantime, feel free to{" "}
                  <a
                    href="mailto:adil.ghazali@six50.io"
                    className="text-gold-500 underline decoration-line-strong underline-offset-4 hover:decoration-gold-500"
                  >
                    reach out directly
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Field
                  label="Name *"
                  id="full_name"
                  required
                  value={form.full_name}
                  onChange={(v) => update("full_name", v)}
                  autoComplete="name"
                />
                <Field
                  label="Email *"
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  autoComplete="email"
                />
                <Field
                  label="Phone"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  autoComplete="tel"
                />
                <Field
                  label="Title"
                  id="role_title"
                  value={form.role_title}
                  onChange={(v) => update("role_title", v)}
                  placeholder="e.g. COO"
                />
                <Field
                  label="Company"
                  id="company_name_raw"
                  value={form.company_name_raw}
                  onChange={(v) => update("company_name_raw", v)}
                  autoComplete="organization"
                />

                <div>
                  <label
                    htmlFor="relationship_notes"
                    className="mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fog"
                  >
                    Message
                  </label>
                  <textarea
                    id="relationship_notes"
                    value={form.relationship_notes}
                    onChange={(e) => update("relationship_notes", e.target.value)}
                    placeholder="What can I help with?"
                    rows={3}
                    className="w-full resize-y rounded-[3px] border border-line-strong bg-ink-900/70 px-3.5 py-2.5 text-sm text-paper placeholder:text-fog-2 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>

                {status === "error" && (
                  <p className="font-mono text-[0.75rem] text-red-400">
                    Something went wrong — please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-gold-500 px-4 py-3.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-ink-900 transition-colors hover:bg-gold-400 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send my info"}
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-line px-6 py-3.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fog-2">
            <span>© 2026 six50 solutions</span>
            <span>Finance × Intelligence</span>
          </div>
        </section>

        <p className="mt-4 text-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fog-2">
          <a href="/card" className="border-b border-line-strong text-fog-2 hover:border-gold-500 hover:text-gold-500">
            ← Back to card
          </a>
        </p>
      </main>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fog">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-[3px] border border-line-strong bg-ink-900/70 px-3.5 py-2.5 text-sm text-paper placeholder:text-fog-2 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
      />
    </div>
  );
}
