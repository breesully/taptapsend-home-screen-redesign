// screens.jsx — destination screens: SendFlow, WalletDetail, ScanScreen, ActivityScreen.

const { useState: useStateSc, useEffect: useEffectSc } = React;

const STATUS_PAD = 58;

function SubHeader({ title, onBack, trailing }) {
  return (
    <div style={{ paddingTop: STATUS_PAD, padding: `${STATUS_PAD}px var(--pad) 8px`, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--app-bg)', position: 'sticky', top: 0, zIndex: 5 }}>
      <button onClick={onBack} className="pressable" aria-label="Back" style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-900)', flexShrink: 0 }}>
        <IconChevLeft size={20} sw={2} />
      </button>
      <h1 className="serif" style={{ margin: 0, fontSize: 24, fontWeight: 500, color: 'var(--green-900)', flex: 1 }}>{title}</h1>
      {trailing}
    </div>
  );
}

// ── Send flow ────────────────────────────────────────────────
function SummaryRow({ label, value, bold, strike }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0' }}>
      <span style={{ fontSize: 14, color: 'var(--ink-70)', fontWeight: bold ? 700 : 500, whiteSpace: 'nowrap' }}>{label}</span>
      <span className="tnum" style={{ fontSize: bold ? 16 : 14, fontWeight: bold ? 800 : 600, color: 'var(--green-900)', textDecoration: strike ? 'line-through' : 'none', opacity: strike ? 0.5 : 1 }}>{value}</span>
    </div>
  );
}

function SendFlow({ amount, onClose, styleKey }) {
  const [step, setStep] = useStateSc(0); // 0 review, 1 paying, 2 success
  const amt = Number(amount || 150);
  const receive = fmt(Math.round(amt * RATE), 0);

  useEffectSc(() => {
    if (step === 1) { const t = setTimeout(() => setStep(2), 1700); return () => clearTimeout(t); }
  }, [step]);

  if (step === 2) {
    return (
      <div className="screen" style={{ background: 'var(--app-bg)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 96, height: 96, marginBottom: 26 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green-500)', opacity: 0.25, animation: 'ringPulse 1.6s ease-out 0.2s infinite' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'checkPop .5s cubic-bezier(.2,1.3,.4,1) both' }}>
              <IconCheck size={48} sw={2.6} color="#fff" />
            </div>
          </div>
          <h2 className="serif" style={{ fontSize: 27, fontWeight: 500, color: 'var(--green-900)', margin: '0 0 8px', whiteSpace: 'nowrap' }}>On its way!</h2>
          <p style={{ fontSize: 15, color: 'var(--ink-70)', margin: '0 0 4px', lineHeight: 1.4 }}>
            <b className="tnum">£{fmt(amt)}</b> to <b>Amara Kaul</b> · she receives <b className="tnum">Rs {receive}</b>
          </p>
          <p style={{ fontSize: 13.5, color: 'var(--green-600)', fontWeight: 600, margin: '0 0 36px' }}>Usually arrives in minutes</p>
          <button onClick={onClose} className="btn-primary pressable" style={{ maxWidth: 280 }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: 'var(--app-bg)' }}>
      <SubHeader title="Review transfer" onBack={onClose} />
      <div className="scroll" style={{ padding: '4px var(--pad) 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* recipient */}
        <div className="card" style={{ padding: 'var(--pad)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'oklch(0.94 0.045 158)', color: 'oklch(0.42 0.12 158)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>AK</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-900)' }}>Amara Kaul</div>
            <div style={{ fontSize: 13, color: 'var(--ink-55)', display: 'flex', alignItems: 'center', gap: 5 }}><FlagPK size={14} /> Easypaisa · Pakistan</div>
          </div>
          <IconChevDown size={18} color="var(--ink-40)" sw={2} />
        </div>

        {/* amounts */}
        <div className="card" style={{ padding: 'var(--pad)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-55)' }}>You send</div>
              <div className="tnum" style={{ fontSize: 28, fontWeight: 800, color: 'var(--green-900)' }}>£{fmt(amt)}</div>
            </div>
            <IconArrowRight size={22} color="var(--ink-25)" sw={2} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-55)' }}>They receive</div>
              <div className="tnum" style={{ fontSize: 28, fontWeight: 800, color: 'var(--green-900)' }}>Rs {receive}</div>
            </div>
          </div>
          <hr className="hr" />
          <SummaryRow label="Exchange rate" value={`£1 = PKR ${fmt(RATE)}`} />
          <SummaryRow label="Transfer fee" value="£0.00 · Free" />
          <SummaryRow label="Paying with" value="GBP wallet · 4144" />
          <SummaryRow label="Total to pay" value={`£${fmt(amt)}`} bold />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, alignSelf: 'center', color: '#9A7A2E' }}>
          <IconAward size={16} sw={1.7} /><span style={{ fontSize: 13.5, fontWeight: 700 }}>Best rate in 14 days — locked in</span>
        </div>
      </div>

      <div style={{ padding: 'var(--pad)', paddingBottom: 'calc(var(--pad) + 6px)', borderTop: '1px solid var(--line)', background: 'var(--app-bg)' }}>
        <button onClick={() => setStep(1)} disabled={step === 1} className="btn-primary pressable">
          {step === 1 ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spinSwap .7s linear infinite' }} /> Sending…
            </span>
          ) : <><IconSend size={20} sw={2} /> Confirm &amp; send £{fmt(amt)}</>}
        </button>
      </div>
    </div>
  );
}

// ── Wallet detail ────────────────────────────────────────────
function ManageRow({ icon, label, danger, toggle, on, onToggle, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 0', borderBottom: last ? 'none' : '1px solid var(--line)' }}
         className="pressable" onClick={toggle ? onToggle : undefined}>
      <span style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: danger ? '#FCEAE8' : 'var(--green-50)', color: danger ? 'var(--red)' : 'var(--green-700)' }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 15.5, fontWeight: 600, color: danger ? 'var(--red)' : 'var(--green-900)' }}>{label}</span>
      {toggle ? (
        <span style={{ width: 46, height: 28, borderRadius: 999, background: on ? 'var(--green-500)' : 'var(--ink-25)', position: 'relative', transition: 'background .2s' }}>
          <span style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        </span>
      ) : <IconChevRight size={18} color="var(--ink-25)" sw={2} />}
    </div>
  );
}

function WalletDetail({ onBack, styleKey, onScan }) {
  const [idx, setIdx] = useStateSc(0);
  const [flipped, setFlipped] = useStateSc(false);
  const [frozen, setFrozen] = useStateSc(false);
  const w = WALLETS[idx];
  return (
    <div className="screen" style={{ background: 'var(--app-bg)' }}>
      <SubHeader title="Wallet" onBack={onBack} trailing={
        <button onClick={onScan} className="pressable" style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-900)' }}><IconScan size={19} sw={1.8} /></button>
      } />
      <div className="scroll" style={{ padding: '6px var(--pad) 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <VirtualCard wallet={w} styleKey={styleKey} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />

        <div style={{ display: 'flex', justifyContent: 'center', gap: 7 }}>
          {WALLETS.map((_, i) => (
            <button key={i} onClick={() => { setIdx(i); setFlipped(false); }} aria-label={`Card ${i+1}`} style={{ width: i === idx ? 20 : 7, height: 7, borderRadius: 999, border: 0, padding: 0, background: i === idx ? 'var(--green-500)' : 'var(--ink-25)', transition: 'all .25s', cursor: 'pointer' }} />
          ))}
        </div>

        <div className="card" style={{ padding: '16px var(--pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-50)', color: 'var(--green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconWallet size={21} sw={1.7} /></span>
            <div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-55)', fontWeight: 600 }}>{w.code} balance</div>
              <div className="tnum" style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-900)' }}>{w.sym}{fmt(w.balance)}</div>
            </div>
          </div>
          <IconInfo size={19} color="var(--ink-40)" sw={1.8} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary pressable" style={{ height: 50, fontSize: 15 }}><IconPlus size={19} sw={2.2} /> Add money</button>
          <button className="btn-apple pressable" style={{ width: 130, height: 50 }}><IconApplePass size={18} sw={1.7} color="#fff" /> Apple Wallet</button>
        </div>

        <div className="card" style={{ padding: '4px var(--pad)' }}>
          <ManageRow icon={<IconLock size={20} sw={1.8} />} label="Freeze card" toggle on={frozen} onToggle={() => setFrozen((f) => !f)} />
          <ManageRow icon={<IconSliders size={20} sw={1.8} />} label="Card controls" />
          <ManageRow icon={<IconEye size={20} sw={1.8} />} label="View PIN" />
          <ManageRow icon={<IconReceipt size={20} sw={1.8} />} label="Statements" last />
        </div>
      </div>
    </div>
  );
}

// ── Scan ─────────────────────────────────────────────────────
function ScanScreen({ onBack }) {
  return (
    <div className="screen" style={{ background: 'var(--app-bg)' }}>
      <SubHeader title="Scan & pay" onBack={onBack} />
      <div className="scroll" style={{ padding: '10px var(--pad) 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <p style={{ fontSize: 15, color: 'var(--ink-70)', textAlign: 'center', margin: 0, maxWidth: 280, lineHeight: 1.4 }}>Show your code to get paid, or scan a friend's to send instantly.</p>
        <div className="card" style={{ padding: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 200, height: 200, borderRadius: 18, background: 'repeating-conic-gradient(#0E3D2D 0% 25%, #fff 0% 50%) 50% / 13px 13px', maskImage: 'radial-gradient(circle, #000 70%, transparent 71%)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BrandMark size={26} bg="var(--green-100)" fg="var(--green-700)" round={8} accent="var(--red)" />
            <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--green-900)', letterSpacing: '0.04em' }}>VAIBHAV149</span>
            <IconCopy size={17} color="var(--ink-40)" sw={1.8} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="pressable" style={{ width: 60, height: 60, borderRadius: '50%', border: 0, background: 'var(--green-100)', color: 'var(--green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconShare size={24} sw={1.8} /></button>
          <button className="pressable" style={{ width: 60, height: 60, borderRadius: '50%', border: 0, background: 'var(--green-100)', color: 'var(--green-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconScan size={24} sw={1.8} /></button>
        </div>
      </div>
    </div>
  );
}

// ── Activity ─────────────────────────────────────────────────
const TXNS = [
  { name: 'Amara Kaul', sub: 'Delivered', amt: '£150.00', date: 'Jun 6', ok: true },
  { name: 'Referral reward', sub: 'Credited to wallet', amt: '+£5.00', date: 'Jun 2', ok: true, credit: true },
  { name: 'Bilal Kaul', sub: 'Delivered', amt: '£90.00', date: 'May 28', ok: true },
  { name: 'Amara Kaul', sub: 'Failed · refunded', amt: '£5.00', date: 'May 27', ok: false },
  { name: 'SNGPL — Gas bill', sub: 'Paid', amt: 'PKR 4,120', date: 'May 20', ok: true },
  { name: 'Physical card order', sub: 'Successful', amt: '£1.99', date: 'Feb 10', ok: true },
];
function ActivityScreen({ onBack }) {
  return (
    <div className="screen" style={{ background: 'var(--app-bg)' }}>
      <SubHeader title="Activity" onBack={onBack} />
      <div className="scroll" style={{ padding: '4px var(--pad) 30px' }}>
        <div className="card" style={{ padding: '4px var(--pad)' }}>
          {TXNS.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 0', borderBottom: i < TXNS.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.ok ? 'var(--green-50)' : '#FCEAE8', color: t.ok ? 'var(--green-600)' : 'var(--red)' }}>
                {t.ok ? <IconCheck size={19} sw={2.2} /> : <IconClose size={18} sw={2.2} />}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--green-900)' }}>{t.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-55)' }}>{t.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="tnum" style={{ fontSize: 14.5, fontWeight: 700, color: t.credit ? 'var(--green-600)' : 'var(--green-900)' }}>{t.amt}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-40)' }}>{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SendFlow, WalletDetail, ScanScreen, ActivityScreen, SubHeader });
