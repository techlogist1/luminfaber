export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!email.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  // TODO(Phase B): Replace with Supabase insert + Resend email.
  // eslint-disable-next-line no-console
  console.log('[CONTACT FORM — MOCK]', {
    timestamp: new Date().toISOString(),
    name,
    email,
    company: typeof data.company === 'string' ? data.company : '',
    message,
  });

  await new Promise((r) => setTimeout(r, 600));
  return Response.json({ success: true });
}
