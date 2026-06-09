// home_impact.jsx — Impact (gamification) and Perks (referral inline).

const { useState: useStateI } = React;

function BarChart({ run }) {
  const max = Math.max(...IMPACT_MONTHS.map((d) => d.v));
  const curIdx = IMPACT_MONTHS.findIndex((d) => d.v === 0) - 1;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 116, padding: '0 2px' }}>
      {IMPACT_MONTHS.map((d, i) => {
        const h = d.v === 0 ? 3 : Math.max(8, (d.v / max) * 100);
        const isCur = i === curIdx;
        const empty = d.v === 0;
        return (
          <div key={d.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', maxWidth: 16, height: `${h}%`, borderRadius: 5,
              background: empty ? 'var(--line)' : (isCur ? 'var(--emerald-500)' : 'color-mix(in srgb, var(--emerald-500) 30%, #e8efe9)'),
              transformOrigin: 'bottom', transform: run ? 'scaleY(1)' : 'scaleY(0)',
              transition: `transform .7s cubic-bezier(.2,.8,.2,1) ${i * 45}ms` }} />
            <span style={{ fontSize: 9.5, fontWeight: 600, color: isCur ? 'var(--emerald-700)' : 'var(--ink-40)' }}>{d.m[0]}</span>
          </div>
        );
      })}
    </div>
  );
}

function RecipientRow({ r }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
      <Avatar initials={r.initials} hue={r.hue} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--emerald-900)' }}>{r.name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-55)' }}>{r.rel} · {r.sends} transfers</div>
      </div>
      <span className="tnum" style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--emerald-900)' }}>£{fmt(r.total, 0)}</span>
    </div>
  );
}

function Impact() {
  const run = useReveal(200);
  const total = useCountUp(IMPACT_TOTAL, run, 1400);
  const [showAll, setShowAll] = useStateI(false);
  const list = showAll ? RECIPIENTS : RECIPIENTS.slice(0, 3);
  return (
    <section>
      <SectionHead title="Your impact" sub="Every transfer adds up to something that matters." />
      <div className="card" style={{ padding: 'var(--pad)', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #F3F8F4 0%, var(--card-bg) 40%)' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--emerald-600)', marginBottom: 9 }}>
            <IconHeart size={16} sw={1.8} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Sent home in 2026</span>
          </div>
          <div className="serif" style={{ fontSize: 18, color: 'var(--ink-70)', fontWeight: 400, lineHeight: 1.3 }}>You've sent</div>
          {/* number uses sans, not serif */}
          <div className="tnum" style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 48, letterSpacing: '-0.03em', color: 'var(--emerald-900)', lineHeight: 1 }}>£{fmt(total, 0)}</div>
          <div className="serif" style={{ fontSize: 18, color: 'var(--ink-70)', fontWeight: 400, lineHeight: 1.3, marginTop: 3 }}>to the people you love.</div>
        </div>

        <BarChart run={run} />
        <hr className="hr" />

        <div>
          <div className="label-sm" style={{ marginBottom: 4 }}>Where it went</div>
          {list.map((r) => <RecipientRow key={r.name} r={r} />)}
          {!showAll && (
            <button onClick={() => setShowAll(true)} className="link-cta" style={{ marginTop: 8 }}>+ {RECIPIENTS.length - 3} more recipient</button>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Perks (referral, inline) ──
function Perks({ onShare, onCopy }) {
  const [how, setHow] = useStateI(false);
  return (
    <section>
      <SectionHead title="Perks" sub="A little extra for sending with Taptap." />
      <div className="card" style={{ padding: 'var(--pad)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}>
            <IconGift size={26} sw={1.7} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontWeight: 500, fontSize: 20, color: 'var(--emerald-900)', lineHeight: 1.15 }}>Invite a friend, you both get £5</div>
          </div>
        </div>

        <div className="label-sm" style={{ marginBottom: 8 }}>Your referral code</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px dashed rgba(56,185,126,0.5)', borderRadius: 12, padding: '13px 14px', background: 'var(--emerald-50)' }}>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '0.06em', color: 'var(--emerald-900)' }}>VAIBHAV149</span>
          <button onClick={onCopy} className="pressable" aria-label="Copy code" style={{ border: 0, background: 'transparent', color: 'var(--emerald-600)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700, fontSize: 13.5 }}>
            <IconCopy size={18} sw={1.8} /> Copy
          </button>
        </div>

        <button onClick={onShare} className="btn-secondary pressable" style={{ width: '100%', height: 46, marginTop: 12 }}>
          <IconShare size={18} sw={1.9} /> Share invite
        </button>

        <button onClick={() => setHow((h) => !h)} className="pressable" style={{ width: '100%', border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, color: 'var(--emerald-600)', fontWeight: 600, fontSize: 14.5 }}>
          How it works <span style={{ transform: how ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-flex' }}><IconChevDown size={16} sw={2} /></span>
        </button>
        {how && (
          <div className="anim-rise" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
            {[['1', 'Share your code with a friend'], ['2', 'They send their first transfer'], ['3', 'You both earn £5, paid to your wallet']].map(([n, txt]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, background: 'var(--emerald-100)', color: 'var(--emerald-700)', fontWeight: 800, fontSize: 12.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>
                <span style={{ fontSize: 14, color: 'var(--emerald-900)', fontWeight: 500 }}>{txt}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--ink-40)', margin: '4px 0 0' }}>Rewards appear in your Activity as a credit. Minimum send requirements apply.</p>
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { Impact, Perks });
