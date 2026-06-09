// home_wallet.jsx — Wallet (metallic card, peek, balance row, Apple Wallet) and Pay your bills.

const { useState: useStateW, useRef: useRefW, useEffect: useEffectW, useLayoutEffect } = React;

function QuickAction({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="pressable inset" style={{
      flex: 1, border: '1px solid var(--line)', background: 'var(--card-bg)', borderRadius: 13, padding: '12px 4px 10px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer', boxShadow: 'var(--shadow-card)',
    }}>
      <span style={{ color: 'var(--emerald-700)' }}>{icon}</span>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--emerald-900)' }}>{label}</span>
    </button>
  );
}

// peeking sliver of an adjacent card
function CardPeek({ wallet, side }) {
  const s = cardSurface(wallet.styleKey || 'emerald');
  return (
    <div aria-hidden style={{
      position: 'absolute', top: '5%', bottom: '5%', width: '82%', borderRadius: 16, background: s.bg, overflow: 'hidden',
      [side]: '-66%', filter: 'brightness(0.88)', boxShadow: '0 10px 28px -8px rgba(6,40,30,0.45)', zIndex: 0,
      transition: 'opacity .3s',
    }}>
      <div style={{ position: 'absolute', top: 14, [side === 'left' ? 'right' : 'left']: 14, opacity: 0.9 }}>{wallet.flag}</div>
    </div>
  );
}

function WalletSection({ styleKey, onOpenWallet, onAction }) {
  const [idx, setIdx] = useStateW(0);
  const [flipped, setFlipped] = useStateW(false);
  const reveal = useReveal(150);
  const total = useCountUp(TOTAL_HOME, reveal, 1200);
  const w = WALLETS[idx];

  const drag = useRefW({ x0: 0, t0: 0, active: false, moved: false });
  const [dx, setDx] = useStateW(0);
  const onDown = (e) => { drag.current = { x0: e.clientX, t0: Date.now(), active: true, moved: false }; };
  const onMove = (e) => {
    if (!drag.current.active) return;
    const d = e.clientX - drag.current.x0;
    setDx(d);
    if (Math.abs(d) > 5) drag.current.moved = true;
  };
  const onUp = () => {
    if (!drag.current.active) return;
    const elapsed = Math.max(1, Date.now() - drag.current.t0);
    const vel = dx / elapsed; // px/ms
    const snap = Math.abs(dx) > 38 || Math.abs(vel) > 0.28;
    if (snap && (dx < 0 || vel < -0.28) && idx < WALLETS.length - 1) { setIdx(idx + 1); setFlipped(false); }
    else if (snap && (dx > 0 || vel > 0.28) && idx > 0) { setIdx(idx - 1); setFlipped(false); }
    drag.current.active = false; setDx(0);
  };

  return (
    <section>
      <SectionHead title="Wallet" sub="One balance across every currency — ready to spend or send." action="Manage" onAction={onOpenWallet} pressableAction />

      {/* balance row: card balance (prominent) + total available (quiet/grey) */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div className="label-sm">{w.code} balance</div>
          <div className="tnum" style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', color: 'var(--emerald-900)', lineHeight: 1.05 }}>{w.sym}{fmt(w.balance, w.code === 'GBP' ? 2 : 2)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="label-sm" style={{ color: 'var(--ink-40)' }}>Total available</div>
          <div className="tnum" style={{ fontWeight: 700, fontSize: 19, color: 'var(--ink-40)' }}>£{fmt(total)}</div>
        </div>
      </div>

      {/* card with peeks */}
      <div style={{ position: 'relative', padding: '0 2px' }}>
        {idx > 0 && <CardPeek wallet={WALLETS[idx - 1]} side="left" />}
        {idx < WALLETS.length - 1 && <CardPeek wallet={WALLETS[idx + 1]} side="right" />}
        <div onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
          style={{ position: 'relative', zIndex: 1, touchAction: 'pan-y', transform: `translateX(${dx * 0.32}px)`, transition: drag.current.active ? 'none' : 'transform .35s cubic-bezier(.2,.8,.2,1)' }}>
          <VirtualCard wallet={w} styleKey={w.styleKey || styleKey} flipped={flipped}
            onFlip={() => { if (!drag.current.moved) setFlipped((f) => !f); }} />
        </div>
      </div>

      {/* pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 12 }}>
        {WALLETS.map((_, i) => (
          <div key={i} onClick={() => { setIdx(i); setFlipped(false); }} style={{
            height: 6, borderRadius: 3, cursor: 'pointer',
            width: i === idx ? 20 : 6,
            background: i === idx ? 'var(--emerald-500)' : 'var(--ink-25)',
            transition: 'width .3s cubic-bezier(.2,.8,.2,1), background .3s',
          }} />
        ))}
      </div>

      {/* Add to Apple Wallet — official Apple badge guidelines */}
      <button onClick={() => onAction('Add to Apple Wallet')} className="pressable" style={{
        width: '100%', height: 52, marginTop: 14, border: '1.5px solid #3a3a3c', borderRadius: 12,
        background: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
        boxShadow: '0 2px 8px rgba(0,0,0,0.28)',
      }}>
        {/* Wallet icon — 3 fanned cards + white foreground card */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ display: 'block', flexShrink: 0 }}>
          {/* back card (orange/yellow) */}
          <rect x="3" y="5" width="18" height="12" rx="2" fill="#FF9F0A" transform="rotate(-9 12 11)"/>
          {/* middle card (green) */}
          <rect x="3" y="5" width="18" height="12" rx="2" fill="#30D158" transform="rotate(-3 12 11)"/>
          {/* front white card */}
          <rect x="2" y="8" width="20" height="14" rx="2.5" fill="white"/>
          {/* magnetic stripe */}
          <rect x="2" y="13" width="20" height="4.5" fill="#C7C7CC"/>
          {/* chip */}
          <rect x="5" y="9.5" width="4" height="3" rx="0.8" fill="#FFD60A"/>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 400, letterSpacing: '0.02em' }}>Add to</span>
          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 18.5, color: '#fff', fontWeight: 600, letterSpacing: '-0.2px' }}>Apple Wallet</span>
        </div>
      </button>

      {/* quick actions */}
      <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
        <QuickAction icon={<IconPlus size={20} sw={2} />} label="Add money" onClick={() => onAction('Add money')} />
        <QuickAction icon={<IconConvert size={20} sw={1.7} />} label="Convert" onClick={() => onAction('Convert')} />
        <QuickAction icon={<IconSend size={20} sw={1.8} />} label="Send" onClick={() => onAction('Send')} />
        <QuickAction icon={<IconRequest size={20} sw={1.8} />} label="Request" onClick={() => onAction('Request')} />
      </div>
    </section>
  );
}

// ── Pay your bills ──────────────────────────────────────────
function BillRow({ b, onPay }) {
  const Icon = b.icon;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 0' }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: b.pastDue ? '#FBEAE8' : 'var(--emerald-50)', color: b.pastDue ? 'var(--red)' : 'var(--emerald-700)' }}>
        <Icon size={22} sw={1.8} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--emerald-900)' }}>{b.provider}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.acct} · {b.cat}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3, fontSize: 13, fontWeight: 600, color: b.pastDue ? 'var(--red)' : 'var(--ink-70)' }}>
          <IconCalendar size={13} sw={1.8} /> {b.due}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <span className="tnum" style={{ fontSize: 14, fontWeight: 700, color: 'var(--emerald-900)' }}>{b.amount}</span>
        <button onClick={() => onPay(b)} className="pressable" style={{ border: 0, borderRadius: 999, padding: '7px 17px', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', background: b.pastDue ? 'var(--accent)' : 'var(--emerald-50)', color: b.pastDue ? '#fff' : 'var(--emerald-700)' }}>Pay</button>
      </div>
    </div>
  );
}

function CategoryCard({ c, active, onClick, cardRef }) {
  const Icon = c.icon;
  return (
    <button ref={cardRef} onClick={onClick} className="pressable" style={{
      width: 110, flexShrink: 0, border: active ? '1.5px solid var(--emerald-400)' : '1px solid var(--line)',
      background: active ? 'var(--emerald-50)' : 'var(--card-bg)', borderRadius: 14, padding: '14px 12px',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, cursor: 'pointer',
      boxShadow: active ? '0 6px 16px -8px rgba(7,56,42,0.3)' : 'var(--shadow-card)', position: 'relative',
      transform: active ? 'translateY(-2px)' : 'none', transition: 'transform .18s, box-shadow .18s',
    }}>
      <div style={{ color: 'var(--emerald-700)' }}><Icon size={24} sw={1.7} /></div>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--emerald-900)' }}>{c.label}</span>
      {c.linked && (
        <span style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: '50%', background: 'var(--emerald-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconCheck size={12} sw={2.6} color="#fff" />
        </span>
      )}
    </button>
  );
}

function CategoryDrawer({ c, notchLeft, onManage, onSeeAll }) {
  return (
    <div className="anim-rise" style={{ position: 'relative', marginTop: 9 }}>
      {/* notch connecting to active card */}
      <div style={{ position: 'absolute', top: -7, left: notchLeft, width: 14, height: 14, background: 'var(--emerald-50)', borderLeft: '1px solid var(--emerald-200, rgba(56,185,126,0.45))', borderTop: '1px solid rgba(56,185,126,0.45)', transform: 'translateX(-50%) rotate(45deg)', borderRadius: 3, zIndex: 1 }} />
      <div style={{ background: 'var(--emerald-50)', borderRadius: 14, border: '1px solid rgba(56,185,126,0.4)', padding: 16, position: 'relative', zIndex: 0, boxShadow: '0 10px 22px -14px rgba(7,56,42,0.3)' }}>
        {c.linked ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ProviderLogo label={c.account.split(' ')[0]} color="var(--emerald-700)" size={34} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, color: 'var(--ink-55)', fontWeight: 600 }}>Connected account</div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--emerald-900)' }}>{c.account}</div>
            </div>
            <button onClick={onManage} className="link-cta">Manage</button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 13.5, color: 'var(--ink-55)', fontWeight: 600, marginBottom: 11 }}>Connect a {c.label.toLowerCase()} provider to track &amp; pay bills here.</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 13 }}>
              {c.partners.slice(0, 3).map((p) => (
                <span key={p.n} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--emerald-900)', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: 999, padding: '5px 12px 5px 5px' }}>
                  <ProviderLogo label={p.n} color={p.c} size={22} /> {p.n.split(' — ')[0]}
                </span>
              ))}
            </div>
            <button onClick={onSeeAll} className="link-cta">See all providers →</button>
          </div>
        )}
      </div>
    </div>
  );
}

function BillPay({ onManage, onPay, onSeeAllPartners }) {
  const [open, setOpen] = useStateW(null);
  const [notchLeft, setNotchLeft] = useStateW(70);
  const rowRef = useRefW(null);
  const cardRefs = useRefW({});

  useLayoutEffect(() => {
    if (open && cardRefs.current[open] && rowRef.current) {
      const cr = cardRefs.current[open].getBoundingClientRect();
      const rr = rowRef.current.getBoundingClientRect();
      setNotchLeft(Math.min(rr.width - 20, Math.max(20, cr.left - rr.left + cr.width / 2)));
    }
  }, [open]);

  return (
    <section ref={rowRef}>
      <SectionHead title="Bill Pay" sub="Settle bills back home in seconds — across every currency." action="Manage bills" onAction={onManage} />

      <div className="card" style={{ padding: '4px var(--pad) 8px', marginBottom: 16 }}>
        {BILLS_UPCOMING.map((b, i) => (
          <React.Fragment key={b.id}>
            <BillRow b={b} onPay={onPay} />
            {i < BILLS_UPCOMING.length - 1 && <hr className="hr" />}
          </React.Fragment>
        ))}
      </div>

      <div className="label-sm" style={{ marginBottom: 11, marginLeft: 2 }}>Pay a new bill</div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '2px 2px 4px', scrollbarWidth: 'none' }} className="scroll">
        {BILL_CATEGORIES.map((c) => (
          <CategoryCard key={c.id} c={c} active={open === c.id}
            cardRef={(el) => { cardRefs.current[c.id] = el; }}
            onClick={() => setOpen(open === c.id ? null : c.id)} />
        ))}
      </div>
      {open && (
        <CategoryDrawer c={BILL_CATEGORIES.find((x) => x.id === open)} notchLeft={notchLeft} onManage={onManage} onSeeAll={onSeeAllPartners} />
      )}
    </section>
  );
}

Object.assign(window, { WalletSection, BillPay });
