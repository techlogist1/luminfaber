# INTEGRATIONS.md — Luminfaber Phase B Playbook

This document is the step-by-step procedure to take the Phase A local build to production. Execute top to bottom. Estimated total: 1–2 hours if accounts are ready.

---

## Preconditions

Create or sign in to each account first. Have credentials in a password manager.

- **Supabase** — https://supabase.com (project will live in ap-south-1)
- **Resend** — https://resend.com (transactional email sender)
- **Cal.com** — https://cal.com (booking iframe; username `luminfaber`)
- **Vercel** — https://vercel.com (GitHub-connected deploys)
- **Cloudflare** — https://cloudflare.com (DNS for `luminfaber.com`)
- **GitHub** — `techlogist1/luminfaber` (repo; create fresh if it doesn't exist)

---

## Step 1 — Supabase

1. `New project` → **Name:** `luminfaber-prod`. **Region:** `Asia Pacific (Mumbai) — ap-south-1`. **Password:** strong, save to manager.
2. Wait ~2 min for provisioning.
3. Open **Project Settings → API**. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key (NOT anon) → `SUPABASE_SERVICE_ROLE_KEY`
4. Paste both into `.env.local` replacing `PENDING`.
5. Open **SQL Editor** → paste and run:

```sql
create table if not exists public.contact_submissions (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  company      text,
  message      text not null,
  user_agent   text,
  ip           text
);

alter table public.contact_submissions enable row level security;
-- Only the service role (server-side) can insert. No public policy.
```

---

## Step 2 — Swap mock for real handler

```bash
npm install @supabase/supabase-js resend
```

Replace the entire contents of `app/api/contact/route.ts` with:

```ts
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try { data = await req.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  const company = typeof data.company === 'string' ? data.company.trim() : '';

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!email.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const ua = req.headers.get('user-agent') ?? '';
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';

  const { error: dbError } = await supabase
    .from('contact_submissions')
    .insert({ name, email, company, message, user_agent: ua, ip });

  if (dbError) {
    console.error('[supabase insert failed]', dbError);
    return Response.json({ error: 'Could not save submission' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: `New Luminfaber inquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\n\n${message}`,
    });
  } catch (e) {
    console.error('[resend send failed, DB row saved]', e);
    // Don't fail the request — the row exists.
  }

  return Response.json({ success: true });
}
```

---

## Step 3 — Resend

1. Sign up at resend.com → **Add domain** → `luminfaber.com`.
2. Resend shows 3 DNS records (MX, SPF TXT, DKIM TXT). Copy each.
3. In Cloudflare → DNS tab for `luminfaber.com`, add all three records **exactly**. Set Proxy status to `DNS only` (grey cloud) for the MX and the DKIM CNAME.
4. Back in Resend → **Verify DNS** → wait for green checks (usually < 5 min, can take 1 hour).
5. Once verified, **API Keys → Create API key** → scope `Full access`, name `luminfaber-prod`. Copy once (can't view again).
6. Paste into `.env.local` as `RESEND_API_KEY`. Confirm `RESEND_FROM_EMAIL=contact@luminfaber.com` and `RESEND_TO_EMAIL=lokavya12@gmail.com`.

---

## Step 4 — Cal.com

1. Claim username `luminfaber` at cal.com.
2. **Event types → New** → `30 Minute Meeting`. URL slug: `30min`. Default availability.
3. Verify the URL `https://cal.com/luminfaber/30min` loads in an incognito window.
4. The `/book` route's iframe will now resolve correctly.

---

## Step 5 — GitHub + Vercel

1. Confirm repo `techlogist1/luminfaber` exists (create via `gh repo create techlogist1/luminfaber --public --source=. --remote=origin` if not). Push:

```bash
git add -A
git commit -m "Phase B integrations: real Supabase + Resend handler"
git push -u origin main
```

2. Vercel dashboard → **Add New → Project** → import `techlogist1/luminfaber`. Framework: Next.js (auto-detected). Root: `./`.
3. **Environment variables** — add all five (copy from `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL`
   Scope each to `Production + Preview + Development`.
4. **Deploy**. First deploy may take 3–4 min (cold cache).
5. Once green, `luminfaber.vercel.app` is live. Verify the contact form + /book route before pointing DNS.

---

## Step 6 — Cloudflare DNS

1. Cloudflare dashboard → `luminfaber.com` → DNS.
2. Delete any existing A records for `@` and `www`.
3. Add records:
   - Type `A`, Name `@`, Content `76.76.21.21`, Proxy `DNS only` (grey cloud). (Vercel apex IP — verify current value in Vercel's domain settings page; they occasionally rotate.)
   - Type `CNAME`, Name `www`, Content `cname.vercel-dns.com`, Proxy `DNS only`.
4. In Vercel → Project → **Domains** → add `luminfaber.com` and `www.luminfaber.com`. Follow the verification flow. Vercel auto-issues a TLS certificate.
5. Propagation: 1–10 min. Check via `dig luminfaber.com` or https://www.whatsmydns.net.

---

## Step 7 — Production verification

End-to-end walk, in Chrome incognito on production URL:

1. Home page loads. Hero morph cycles. Premise typewriter fires on scroll. All section images render as AVIF/WebP (check `chrome://inspect` → Network).
2. Desktop: 3 nav links top-right. Mobile (DevTools device toolbar, 390x844): "Book a call" only.
3. `/work`, `/command-center` load with correct content.
4. `/book` loads the Cal.com iframe cleanly.
5. **Contact form e2e:**
   - Fill name/email/message → Submit.
   - Form replaces with "Thanks — we'll be in touch within 24 hours."
   - Check Supabase → Table Editor → `contact_submissions` — new row present.
   - Check `lokavya12@gmail.com` inbox — Resend email arrived with reply-to set to submitter.
6. Run Lighthouse mobile on production URL — confirm Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## Step 8 — Post-launch TODOs

These don't block launch but should happen within the first week:

- [ ] **Favicon** — add `app/icon.png` (512x512, Luminfaber wordmark monochrome on cream).
- [ ] **OG image** — add `app/opengraph-image.png` (1200x630). Prata wordmark over hero bg crop.
- [ ] **Real photos of Lokavya, Raghav, Bhomik** — swap dashed placeholders in `components/sections/WhoWeAre.tsx`.
- [ ] **Real case studies** — replace `/work` placeholders with actual project pages.
- [ ] **Plausible analytics** — `npm i next-plausible`, wrap layout with `<PlausibleProvider domain="luminfaber.com">`. Create Plausible site first.
- [ ] **Monitoring** — Vercel Analytics is auto-enabled; enable Log Drains or Sentry if scale warrants.
- [ ] **Rate limit** on `/api/contact` — add Upstash Redis or Vercel's built-in rate limit to prevent abuse.

---

## Troubleshooting

**Contact form returns 500 in prod, works locally.**
Likely missing env vars on Vercel. Project → Settings → Environment Variables → confirm all five are set for the Production environment. Redeploy after adding.

**Resend emails not arriving.**
1. Resend dashboard → **Logs** — check whether send succeeded. If yes, the issue is deliverability; check Gmail spam.
2. If send failed with `domain not verified`, DNS records haven't propagated or are wrong. Re-check Cloudflare DNS tab vs. Resend's required records.
3. SPF record must NOT be proxied (grey cloud only).

**Cal.com iframe shows 404.**
Username or event slug wrong. Verify `https://cal.com/luminfaber/30min` in a browser tab. If the username is taken, update the iframe src in `app/book/page.tsx`.

**Cloudflare proxy causing SSL errors on apex.**
The `@` A record must be `DNS only` (grey cloud), not proxied, while Vercel handles TLS. If you want Cloudflare proxy, switch Vercel to the "Other" provider path and manage certs via CF — not worth the complexity for v1.

**Lighthouse mobile Perf < 90 in prod.**
1. Check that next/image is actually serving AVIF on mobile (Network tab → filter `.avif`).
2. Font-display: swap is already set; confirm no custom fonts are late-binding.
3. Hero bg image file size — if > 500 KB in AVIF, re-export at lower quality (80–85 is plenty for photographic stills).
4. Check Largest Contentful Paint — it should be the hero morph text, not the background. If the bg image is winning, the `<Image priority/>` on hero is correct; nothing more to do.

**Supabase RLS blocking insert.**
Confirm you're using the `service_role` key (not `anon`) in `.env` — service role bypasses RLS.
