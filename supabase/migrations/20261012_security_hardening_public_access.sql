-- six50 security hardening — run once in the Supabase SQL editor
-- (Project "AI COO", isoahjpwdklvqbkzucca). Safe to re-run.
--
-- What it does:
--   1. Stops the public key from reading or changing the CRM pipeline view.
--   2. Requires the subscriber's private token to unsubscribe from the newsletter.
--   3. Hides future-dated (draft) newsletter issues from the public.
--   4. Makes internal functions callable only by the server (service role).
-- The website only uses these functions with the service-role key, so nothing on
-- six50.io breaks. If any other tool reads crm_pipeline_dashboard with the public
-- (anon) key, switch it to the service-role key.

begin;

-- 1. CRM pipeline view
alter view public.crm_pipeline_dashboard set (security_invoker = true);
revoke all on public.crm_pipeline_dashboard from anon, authenticated;

-- 2. Newsletter unsubscribe requires the private token
drop policy if exists "public can unsubscribe with token" on public.arbitrage_subscribers;
revoke update on public.arbitrage_subscribers from anon, authenticated;

create or replace function public.unsubscribe_arbitrage(p_token text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare n int;
begin
  if p_token is null or length(p_token) < 16 then
    return false;
  end if;
  update public.arbitrage_subscribers
     set status = 'unsubscribed', unsubscribed_at = now()
   where unsubscribe_token = p_token
     and status <> 'unsubscribed';
  get diagnostics n = row_count;
  return n > 0 or exists (select 1 from public.arbitrage_subscribers where unsubscribe_token = p_token);
end;
$$;
revoke all on function public.unsubscribe_arbitrage(text) from public;
grant execute on function public.unsubscribe_arbitrage(text) to anon, authenticated, service_role;

-- 3. Newsletter issues: public sees only issues whose date has arrived
drop policy if exists "public read published-ready issues" on public.ai_arbitrage_issues;
drop policy if exists "public read released issues" on public.ai_arbitrage_issues;
create policy "public read released issues" on public.ai_arbitrage_issues
  for select to anon, authenticated
  using (issue_date <= (now() at time zone 'America/Chicago')::date);

-- 4. Internal functions: server only
revoke execute on function public.expire_stale_invitations() from public, anon, authenticated;
revoke execute on function public.resolve_invitation(text) from public, anon, authenticated;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
grant execute on function public.expire_stale_invitations() to service_role;
grant execute on function public.resolve_invitation(text) to service_role;
grant execute on function public.rls_auto_enable() to service_role;

commit;
