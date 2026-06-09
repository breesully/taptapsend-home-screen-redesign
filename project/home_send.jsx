// home_send.jsx — Header (emerald) + Send card (badge, tied currency inputs, resume drawer, smart suggestion).

const { useState: useStateS, useRef: useRefS } = React;

function Header() {
  return (
    <div style={{ padding: '4px 0 2px' }}>
      <h1 className="h-greeting" style={{ color: '#fff', margin: 0 }}>Hi Vaibhav</h1>
      <p style={{ margin: '7px 0 0', fontSize: 15.5, lineHeight: 1.4, color: 'rgba(255,255,255,0.78)', fontWeight: 500, maxWidth: 300 }}>
        Send money home in minutes — always at a fair, transparent rate.
      </p>
    </div>
  );
}

// premium, gold-accented best-rate badge
function RateBadge({ show }) {
  const r = useReveal(360);
  if (!show) return null;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
      padding: '6px 11px 6px 9px', borderRadius: 999, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #FCF7EA, #F6EED6)', border: '1px solid #E7D6A3',
      boxShadow: '0 2px 6px -2px rgba(160,120,30,0.35)',
      opacity: r ? 1 : 0, transform: r ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity .4s, transform .4s',
    }}>
      <IconAward size={15} color="#B68A2E" sw={1.7} />
      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#7A5C16', whiteSpace: 'nowrap' }}>Best rate in 14 days</span>
      <span style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)', backgroundSize: '220% 100%', animation: r ? 'shimmer 2s ease-out 0.3s 1' : 'none' }} />
    </div>
  );
}

function CurrencyTag({ flag, code, selectable }) {
  return (
    <div className={selectable ? 'pressable' : ''} style={{
      display: 'flex', alignItems: 'center', gap: 6, padding: selectable ? '6px 9px 6px 7px' : '6px 10px 6px 7px',
      borderRadius: 999, flexShrink: 0,
      background: selectable ? 'var(--emerald-50)' : 'rgba(20,32,27,0.05)',
      border: selectable ? '1px solid var(--line-2)' : '1px solid transparent',
      cursor: selectable ? 'pointer' : 'default', opacity: selectable ? 1 : 0.65,
    }}>
      {flag}
      <span style={{ fontWeight: 700, fontSize: 14, color: selectable ? 'var(--emerald-900)' : 'var(--ink-55)' }}>{code}</span>
      {selectable && <IconChevDown size={15} color="var(--ink-40)" sw={2} />}
    </div>
  );
}

function AmountBox({ label, sym, value, onChange, tag }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: 'var(--card-bg)', border: '1.5px solid var(--line)', borderRadius: 13, padding: '11px 12px', transition: 'border-color .15s' }}
         onFocusCapture={(e) => e.currentTarget.style.borderColor = 'var(--emerald-400)'}
         onBlurCapture={(e) => e.currentTarget.style.borderColor = 'var(--line)'}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 9 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-55)' }}>{label}</span>
        {tag}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-40)' }}>{sym}</span>
        <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))} onFocus={(e) => e.target.select()}
          className="tnum" style={{ width: '100%', border: 0, outline: 0, background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 25, letterSpacing: '-0.02em', color: 'var(--emerald-900)', padding: 0, minWidth: 0 }} />
      </div>
    </div>
  );
}

function SwapBtn() {
  const [spin, setSpin] = useStateS(0);
  return (
    <button onClick={() => setSpin((s) => s + 1)} className="pressable" aria-label="Swap" style={{
      width: 34, height: 34, borderRadius: '50%', flexShrink: 0, border: '1.5px solid var(--line)',
      background: 'var(--card-bg)', color: 'var(--ink-55)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) rotate(${spin * 180}deg)`,
      transition: 'transform .45s cubic-bezier(.2,.7,.2,1)', zIndex: 2, boxShadow: '0 1px 4px rgba(7,56,42,0.12)',
    }}>
      <IconSwap size={16} sw={1.9} />
    </button>
  );
}

// resume drawer tucked behind the send card
function ResumeDrawer({ onContinue, onCancel }) {
  return (
    <div style={{ position: 'relative', zIndex: 1, marginTop: -16, padding: '0 7px' }}>
      <div className="anim-rise" style={{
        background: 'var(--card-bg)', borderRadius: '0 0 16px 16px', border: '1px solid var(--line)', borderTop: 0,
        boxShadow: 'inset 0 8px 14px -12px rgba(7,56,42,0.4), 0 12px 24px -16px rgba(7,56,42,0.3)',
        padding: 'calc(var(--pad) + 6px) var(--pad) var(--pad)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--ink-55)', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconClock size={14} sw={1.9} color="var(--emerald-600)" /> Pick up where you left off
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <Avatar initials={AMARA.initials} hue={AMARA.hue} size={46} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--emerald-900)' }}>{AMARA.name}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-55)', display: 'flex', alignItems: 'center', gap: 5 }}><FlagPK size={13} /> Easypaisa · 2 days ago</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="tnum" style={{ fontSize: 22, fontWeight: 800, color: 'var(--emerald-900)', lineHeight: 1 }}>£150</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-40)', fontWeight: 600 }}>Rs 55,770</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button onClick={onContinue} className="btn-secondary pressable" style={{ flex: 2, height: 44 }}>Continue transfer</button>
          <button onClick={onCancel} className="btn-ghost pressable" style={{ flex: 1, height: 44 }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function SmartSuggestion({ onSchedule, onDismiss }) {
  return (
    <div className="card anim-rise" style={{ padding: 'var(--pad)', position: 'relative', overflow: 'hidden' }}>
      <button onClick={onDismiss} className="pressable" aria-label="Dismiss" style={{ position: 'absolute', top: 12, right: 12, width: 26, height: 26, borderRadius: '50%', border: 0, background: 'transparent', color: 'var(--ink-40)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconClose size={15} sw={2} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
        <IconSparkle size={15} color="var(--emerald-600)" sw={1.7} />
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--emerald-600)', textTransform: 'uppercase' }}>Smart suggestion</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar initials={AMARA.initials} hue={AMARA.hue} size={52} ring="var(--emerald-100)" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15.5, color: 'var(--ink-70)', lineHeight: 1.35 }}>
            Payday's near — your usual to <b style={{ color: 'var(--emerald-900)', fontWeight: 800 }}>{AMARA.name.split(' ')[0]}</b>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span className="tnum" style={{ fontSize: 26, fontWeight: 800, color: 'var(--emerald-900)', lineHeight: 1 }}>£200</span>
            <span style={{ fontSize: 13, color: 'var(--ink-55)', fontWeight: 600 }}>on 25 Jun</span>
          </div>
        </div>
      </div>
      <button onClick={onSchedule} className="btn-secondary pressable" style={{ width: '100%', height: 46, marginTop: 16 }}>
        <IconCalendar size={17} sw={1.8} /> Schedule this transfer
      </button>
    </div>
  );
}

function SendMoney({ amount, setAmount, onSend, onSchedule, t }) {
  const receive = amount === '' ? '' : fmt(Math.round(Number(amount) * RATE), 0);
  const setReceive = (v) => { const n = v.replace(/,/g, ''); setAmount(n === '' ? '' : String((Number(n) / RATE).toFixed(2))); };
  const [resume, setResume] = useStateS(true);
  const [suggest, setSuggest] = useStateS(true);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
      <div>
        {/* send card */}
        <div className="card" style={{ padding: 'var(--pad)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 2, boxShadow: 'var(--shadow-raise)' }}>
          {/* top line: context + badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-55)' }}>Send to Pakistan</span>
            <RateBadge show={t.showBadge} />
          </div>

          {/* amount fields */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'stretch', gap: 10 }}>
            <AmountBox label="You send" sym="£" value={amount} onChange={setAmount}
              tag={<CurrencyTag flag={<FlagGB size={17} />} code="GBP" selectable={false} />} />
            <SwapBtn />
            <AmountBox label="They receive" sym="Rs" value={receive} onChange={setReceive}
              tag={<CurrencyTag flag={<FlagPK size={17} />} code="PKR" selectable />} />
          </div>

          {/* live rate */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
            <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--emerald-500)' }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--emerald-500)', animation: 'ringPulse 2s ease-out infinite' }} />
            </span>
            <span className="tnum" style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink-70)' }}>£1.00 = PKR {fmt(RATE)}</span>
            <span style={{ fontSize: 12.5, color: 'var(--ink-40)', fontWeight: 500, marginLeft: 2 }}>· live</span>
          </div>

          <button className="btn-primary pressable" onClick={onSend}>
            <IconSend size={19} sw={2} /> Send money
          </button>
        </div>

        {/* resume drawer tucked behind */}
        {t.showResume && resume && (
          <ResumeDrawer onContinue={onSend} onCancel={() => setResume(false)} />
        )}
      </div>

      {/* smart suggestion */}
      {t.showSuggestion && suggest && (
        <SmartSuggestion onSchedule={onSchedule} onDismiss={() => setSuggest(false)} />
      )}
    </section>
  );
}

Object.assign(window, { Header, SendMoney });
