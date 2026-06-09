// shared.jsx — helpers, brand mark, animated number, metallic virtual card, avatar, provider logo, bottom sheet.

const { useState, useEffect, useRef } = React;

function fmt(n, dp = 2) { return Number(n).toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp }); }
function fmtMoney(n, cur = '£', dp = 2) { return cur + fmt(n, dp); }

function useCountUp(target, run, dur = 1100) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!run) return;
    started.current = true;
    const from = 0, t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick); else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return val;
}

function useReveal(delay = 0) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t); }, []);
  return on;
}

// ── Original abstract brand mark (logo placeholder) ──
function BrandMark({ size = 26, bg = 'transparent', fg = '#fff', accent = '#C9463B', round = 7 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: round, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size * 0.74} height={size * 0.74} viewBox="0 0 24 24" fill="none">
        <path d="M4 16.5C4 9.6 9.6 4 16.5 4c1.4 0 2.8.24 4 .67" stroke={fg} strokeWidth="2.6" strokeLinecap="round"/>
        <path d="M20 9.5c.32 1.2.5 2.46.5 3.76C20.5 18.9 16.4 23 11.3 23" stroke={fg} strokeWidth="2.6" strokeLinecap="round" opacity="0.45"/>
        <circle cx="16.7" cy="12.4" r="3" fill={accent}/>
      </svg>
    </div>
  );
}

// ── Avatar bubble (recipients / resume / suggestion) ──
function Avatar({ initials, hue = 158, size = 44, ring }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, fontFamily: 'var(--sans)',
      color: `oklch(0.40 0.12 ${hue})`, background: `oklch(0.93 0.05 ${hue})`,
      boxShadow: ring ? `0 0 0 3px ${ring}` : 'none',
    }}>{initials}</div>
  );
}

// ── Provider monogram logo (placeholder for real partner logos) ──
function ProviderLogo({ label, color = '#0F5A42', size = 26 }) {
  const init = label.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || '··';
  return (
    <div style={{
      width: size, height: size, borderRadius: 7, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: color, color: '#fff', fontSize: size * 0.40, fontWeight: 800, letterSpacing: '-0.02em',
      fontFamily: 'var(--sans)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
    }}>{init}</div>
  );
}

// ── Bottom sheet (coming-soon, share, etc) ──
function BottomSheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(6,40,30,0.42)', animation: 'fadeIn .25s ease both' }} />
      <div style={{
        position: 'relative', background: 'var(--card-bg)', borderRadius: '22px 22px 0 0',
        padding: '12px var(--pad) calc(var(--pad) + 20px)', boxShadow: '0 -16px 40px -10px rgba(6,40,30,0.4)',
        animation: 'sheetUp .34s cubic-bezier(.2,.8,.2,1) both',
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--ink-25)', margin: '0 auto 14px' }} />
        {children}
      </div>
    </div>
  );
}

// ── Metallic emerald virtual card ───────────────────────────────
function cardSurface(styleKey) {
  const d = (bg, metal, extra = {}) => ({ bg, metal, dark: true, text: '#fff', sub: 'rgba(255,255,255,0.78)', faint: 'rgba(255,255,255,0.55)', chip: 'rgba(255,255,255,0.14)', shine: 'rgba(255,255,255,0.34)', ...extra });
  const l = (bg, metal, text, extra = {}) => ({ bg, metal, dark: false, text, sub: text.replace(/[\d.]+\)$/, '0.65)'), faint: text.replace(/[\d.]+\)$/, '0.45)'), chip: text.replace(/[\d.]+\)$/, '0.10)'), shine: 'rgba(255,255,255,0.65)', ...extra });
  switch (styleKey) {
    case 'graphite': return d('linear-gradient(150deg, #2b2f30 0%, #16191a 60%, #232728 100%)', 'rgba(255,255,255,0.14)');
    case 'midnight': return d('linear-gradient(150deg, #123c52 0%, #0a2233 55%, #14465e 100%)', 'rgba(255,255,255,0.13)');
    case 'gold':     return d('linear-gradient(150deg, #8a6d2f 0%, #5e4a1d 55%, #9a7a36 100%)', 'rgba(255,255,255,0.20)');
    case 'peach':    return l('linear-gradient(150deg, #ffd5be 0%, #f5a882 38%, #e8916a 65%, #f7b89a 100%)', 'rgba(255,255,255,0.55)', 'rgba(90,35,15,0.88)');
    case 'cream':    return l('linear-gradient(150deg, #fdf0e8 0%, #f2d8c4 38%, #e6c4a5 65%, #f5e2d4 100%)', 'rgba(255,255,255,0.60)', 'rgba(100,60,30,0.85)');
    case 'emerald':
    default:         return d('linear-gradient(150deg, #1a8159 0%, #0c5238 42%, #0a3f2c 72%, #157049 100%)', 'rgba(255,255,255,0.18)');
  }
}

function VirtualCard({ wallet, styleKey = 'emerald', flipped = false, onFlip, shimmer = true }) {
  const s = cardSurface(styleKey);
  const sub = s.sub;
  const faint = s.faint;
  return (
    <div style={{ perspective: 1500, width: '100%' }}>
      <div className="pressable" onClick={onFlip} style={{
        position: 'relative', width: '100%', aspectRatio: '1.586 / 1',
        transformStyle: 'preserve-3d', transition: 'transform .6s cubic-bezier(.2,.7,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'none', boxShadow: 'var(--shadow-vcard)', borderRadius: 16,
      }}>
        {/* front */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16, padding: 'clamp(16px, 5.2%, 22px)',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden',
          background: s.bg, color: s.text,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* metallic sheens */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(115deg, ${s.metal} 0%, transparent 26%, transparent 60%, ${s.metal} 100%)`, mixBlendMode: 'screen', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-40%', left: '-10%', width: '60%', height: '180%', background: 'radial-gradient(closest-side, rgba(255,255,255,0.22), transparent)', pointerEvents: 'none' }} />
          {/* moving shine */}
          {shimmer && <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '32%', background: `linear-gradient(90deg, transparent, ${s.shine}, transparent)`, filter: 'blur(2px)', animation: 'cardShine 4.6s ease-in-out 1.2s infinite', pointerEvents: 'none' }} />}

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <BrandMark size={34} fg={s.dark ? '#fff' : s.text} round={10} bg={s.chip} accent="#F2B84B" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: s.chip, padding: '5px 10px 5px 6px', borderRadius: 999 }}>
              {wallet.flag}
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: s.text }}>{wallet.code}</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="tnum" style={{ fontSize: 'clamp(18px, 6.2%, 23px)', fontWeight: 600, letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 10, color: s.text }}>
              <span>••••</span><span>••••</span><span>••••</span><span>{wallet.last4}</span>
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 9.5, color: faint, fontWeight: 600, letterSpacing: '0.08em' }}>CARDHOLDER</div>
              <div style={{ fontSize: 13.5, color: s.text, fontWeight: 600, letterSpacing: '0.02em' }}>{wallet.holder}</div>
            </div>
            <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: 21, letterSpacing: '-0.02em', color: s.text }}>VISA</span>
          </div>
        </div>

        {/* back */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)', background: s.bg, color: s.text, overflow: 'hidden',
          display: 'flex', flexDirection: 'column', paddingBottom: 16,
        }}>
          <div style={{ height: '20%', background: s.dark ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.14)', marginTop: '11%' }} />
          <div style={{ padding: '0 clamp(16px,5.2%,22px)', display: 'flex', flexDirection: 'column', gap: 11, flex: 1, justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: 10, color: faint, fontWeight: 600, letterSpacing: '0.05em' }}>CARD NUMBER</div>
              <div className="tnum" style={{ fontSize: 17, fontWeight: 600, letterSpacing: '0.08em', color: s.text }}>4929 11•• •••• {wallet.last4}</div>
            </div>
            <div style={{ display: 'flex', gap: 30 }}>
              <div><div style={{ fontSize: 10, color: faint, fontWeight: 600 }}>EXPIRES</div><div className="tnum" style={{ fontSize: 15, fontWeight: 600, color: s.text }}>09/29</div></div>
              <div><div style={{ fontSize: 10, color: faint, fontWeight: 600 }}>CVV</div><div className="tnum" style={{ fontSize: 15, fontWeight: 600, color: s.text }}>•••</div></div>
            </div>
            <div style={{ fontSize: 11, color: faint }}>Tap to flip back</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { fmt, fmtMoney, useCountUp, useReveal, BrandMark, Avatar, ProviderLogo, BottomSheet, VirtualCard, cardSurface, SectionHead });

// ── consistent section header: serif title + value-prop subcopy + optional action ──
function SectionHead({ title, sub, action, onAction, pressableAction = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
      <div style={{ minWidth: 0 }}>
        <h2 className="h-section">{title}</h2>
        {sub && <p className="sub-section">{sub}</p>}
      </div>
      {action && (
        <button onClick={onAction} className={'link-cta' + (pressableAction ? ' pressable' : '')} style={{ marginTop: 6 }}>{action}</button>
      )}
    </div>
  );
}
