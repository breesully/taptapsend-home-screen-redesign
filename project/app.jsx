// app.jsx — composition, navigation, glass tab bar, sheets, tweaks.

const { useState, useEffect, useRef } = React;

// ── Apple-glass tab bar ──
function TabBar({ tab, onTab }) {
  const items = [
    { id: 'home', label: 'Home', icon: IconHome },
    { id: 'wallet', label: 'Wallet', icon: IconWallet },
    { id: 'referrals', label: 'Perks', icon: IconGift },
    { id: 'activity', label: 'Activity', icon: IconChecklist },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30, paddingBottom: 26, paddingTop: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', overflow: 'hidden' }}>
      {/* liquid-glass layers */}
      <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(22px) saturate(180%)', WebkitBackdropFilter: 'blur(22px) saturate(180%)', background: 'rgba(255,255,255,0.62)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 0.5, background: 'var(--line)' }} />
      {items.map((it) => {
        const active = tab === it.id;
        const Icon = it.icon;
        return (
          <button key={it.id} onClick={() => onTab(it.id)} className="pressable" style={{ position: 'relative', border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '5px 16px', color: active ? 'var(--emerald-600)' : 'var(--ink-40)' }}>
            {active && <span style={{ position: 'absolute', top: 1, width: 46, height: 30, borderRadius: 999, background: 'var(--emerald-50)' }} />}
            <span style={{ position: 'relative' }}><Icon size={23} sw={active ? 2.1 : 1.8} /></span>
            <span style={{ fontSize: 11, fontWeight: active ? 700 : 600, position: 'relative' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Home ──
function HomeScreen({ amount, setAmount, t, nav, toast, onSchedule, onShare }) {
  return (
    <div className="screen">
      <div className="scroll" style={{ paddingBottom: 108, background: 'var(--app-bg)' }}>
        {/* emerald hero — fades to white before Your Wallet */}
        <div style={{
          paddingTop: STATUS_PAD, padding: `${STATUS_PAD}px var(--pad) var(--gap)`,
          display: 'flex', flexDirection: 'column', gap: 'var(--gap)',
          background: 'linear-gradient(180deg, var(--emerald-900) 0%, var(--emerald-900) 30%, var(--emerald-800) 52%, color-mix(in srgb, var(--emerald-700) 50%, var(--app-bg)) 72%, color-mix(in srgb, var(--emerald-600) 15%, var(--app-bg)) 88%, var(--app-bg) 100%)',
        }}>
          <Header />
          <SendMoney amount={amount} setAmount={setAmount} onSend={() => nav('send')} onSchedule={onSchedule} t={t} />
        </div>
        {/* white from Your Wallet onward */}
        <div style={{ background: 'var(--app-bg)', padding: '0 var(--pad)', display: 'flex', flexDirection: 'column', gap: 48, paddingBottom: 0 }}>
          <WalletSection styleKey={t.cardStyle} onOpenWallet={() => nav('walletDetail', 'wallet')} onAction={(a) => toast(`${a} — coming up next`)} />
          <BillPay onManage={() => toast('Opening Bill Pay…')} onPay={(b) => toast(`Paying ${b.provider}…`)} onSeeAllPartners={() => toast('Browse all partners…')} />
          <Impact />
          <Perks onShare={onShare} onCopy={() => toast('Code copied')} />
        </div>
      </div>
    </div>
  );
}

// ── Perks tab screen (fuller) ──
function ReferralsScreen({ onBack, toast, onShare }) {
  return (
    <div className="screen" style={{ background: 'var(--app-bg)' }}>
      <SubHeader title="Perks" onBack={onBack} />
      <div className="scroll" style={{ padding: '4px var(--pad) 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(160deg, #1a8159 0%, #0c5238 100%)', padding: '30px var(--pad) 26px', color: '#fff', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -40, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
            <IconGift size={34} sw={1.6} color="#fff" />
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: '14px 0 4px', lineHeight: 1.1 }}>Earn £5 for each<br />friend you refer</h2>
            <p style={{ fontSize: 13.5, opacity: 0.9, margin: 0 }}>You both get £5 on their first transfer.</p>
          </div>
          <div style={{ padding: 'var(--pad)' }}>
            <div className="label-sm" style={{ marginBottom: 8 }}>Share your code</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px dashed rgba(56,185,126,0.5)', borderRadius: 12, padding: '14px 16px', background: 'var(--emerald-50)' }}>
              <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '0.05em', color: 'var(--emerald-900)' }}>VAIBHAV149</span>
              <button onClick={() => toast('Code copied')} className="pressable" style={{ border: 0, background: 'transparent', color: 'var(--emerald-600)', cursor: 'pointer', display: 'flex', gap: 5, alignItems: 'center', fontWeight: 700, fontSize: 13.5 }}><IconCopy size={18} sw={1.8} /> Copy</button>
            </div>
            <button onClick={onShare} className="btn-secondary pressable" style={{ width: '100%', height: 46, marginTop: 12 }}><IconShare size={18} sw={1.9} /> Share invite</button>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-40)', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>Rewards appear in your Activity as a credit.<br />Minimum send requirements &amp; conditions apply.</p>
      </div>
    </div>
  );
}

// ── Schedule "coming soon" sheet ──
function ScheduleSheet({ open, onClose }) {
  const [done, setDone] = useState(false);
  useEffect(() => { if (!open) setDone(false); }, [open]);
  const notify = () => { setDone(true); setTimeout(onClose, 1400); };
  return (
    <BottomSheet open={open} onClose={onClose}>
      {done ? (
        <div style={{ textAlign: 'center', padding: '12px 0 6px' }}>
          <div style={{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: 'var(--emerald-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'checkPop .5s cubic-bezier(.2,1.3,.4,1) both' }}>
            <IconCheck size={32} sw={2.6} color="#fff" />
          </div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--emerald-900)' }}>We'll let you know!</div>
          <p style={{ fontSize: 14, color: 'var(--ink-55)', margin: '6px 0 0' }}>You're on the list for scheduled transfers.</p>
        </div>
      ) : (
        <div>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: 'var(--emerald-50)', color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><IconCalendar size={26} sw={1.7} /></div>
          <h3 className="serif" style={{ fontSize: 23, fontWeight: 500, color: 'var(--emerald-900)', margin: '0 0 8px' }}>Scheduled transfers are coming soon</h3>
          <p style={{ fontSize: 15, color: 'var(--ink-70)', margin: '0 0 20px', lineHeight: 1.45 }}>Set it once and we'll send to your loved ones automatically each payday. Want us to let you know the moment it's ready?</p>
          <button onClick={notify} className="btn-primary pressable" style={{ marginBottom: 10 }}>Notify me when it's available</button>
          <button onClick={onClose} className="btn-ghost pressable" style={{ width: '100%', height: 48, border: 0 }}>No, not right now</button>
        </div>
      )}
    </BottomSheet>
  );
}

// ── Share sheet (fallback when native share unavailable) ──
function ShareSheet({ open, onClose, toast }) {
  const targets = [
    { label: 'WhatsApp', color: '#25D366', icon: <IconShare size={22} sw={1.8} color="#fff" /> },
    { label: 'Messages', color: '#34C759', icon: <IconShare size={22} sw={1.8} color="#fff" /> },
    { label: 'Copy link', color: 'var(--emerald-700)', icon: <IconCopy size={22} sw={1.8} color="#fff" /> },
    { label: 'More', color: 'var(--ink-40)', icon: <IconPlus size={22} sw={2} color="#fff" /> },
  ];
  return (
    <BottomSheet open={open} onClose={onClose}>
      <h3 className="serif" style={{ fontSize: 21, fontWeight: 500, color: 'var(--emerald-900)', margin: '0 0 4px' }}>Share your invite</h3>
      <p style={{ fontSize: 14, color: 'var(--ink-55)', margin: '0 0 18px' }}>Code <b style={{ color: 'var(--emerald-900)' }}>VAIBHAV149</b> — you both get £5.</p>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {targets.map((tg) => (
          <button key={tg.label} onClick={() => { toast(`Shared via ${tg.label}`); onClose(); }} className="pressable" style={{ border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 56, height: 56, borderRadius: '50%', background: tg.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{tg.icon}</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--emerald-900)' }}>{tg.label}</span>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position: 'absolute', left: '50%', bottom: 112, transform: 'translateX(-50%)', zIndex: 70, animation: 'popIn .3s ease both', pointerEvents: 'none' }}>
      <div style={{ background: 'var(--emerald-900)', color: '#fff', padding: '11px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, boxShadow: 'var(--shadow-pop)', whiteSpace: 'nowrap' }}>{msg}</div>
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "serifFont": "Newsreader",
  "accent": "#169B61",
  "cardStyle": "emerald",
  "showBadge": true,
  "showSuggestion": true,
  "showResume": true,
  "density": "regular"
}/*EDITMODE-END*/;

const SERIF_STACK = {
  'Newsreader': "'Newsreader', Georgia, serif",
  'Playfair Display': "'Playfair Display', Georgia, serif",
  'Source Serif 4': "'Source Serif 4', Georgia, serif",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [amount, setAmount] = useState('150');
  const [view, setView] = useState('home');
  const [tab, setTab] = useState('home');
  const [toastMsg, setToastMsg] = useState('');
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const toastTimer = useRef(null);

  const toast = (m) => { setToastMsg(m); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToastMsg(''), 2200); };
  const nav = (v, newTab) => { setView(v); if (newTab) setTab(newTab); };
  const onTab = (id) => {
    setTab(id);
    setView(id === 'home' ? 'home' : id === 'wallet' ? 'walletDetail' : id === 'referrals' ? 'referrals' : 'activity');
  };
  const goHome = () => { setView('home'); setTab('home'); };

  const doShare = async () => {
    const data = { title: 'Taptap Send', text: 'Join me on Taptap Send — we both get £5. Code: VAIBHAV149', url: 'https://taptapsend.com' };
    try { if (navigator.share) { await navigator.share(data); return; } } catch (e) {}
    setShareOpen(true);
  };

  const overlay = ['send', 'scan'].includes(view);

  let base;
  if (view === 'walletDetail') base = <WalletDetail onBack={goHome} styleKey={t.cardStyle} onScan={() => setView('scan')} />;
  else if (view === 'activity') base = <ActivityScreen onBack={goHome} />;
  else if (view === 'referrals') base = <ReferralsScreen onBack={goHome} toast={toast} onShare={doShare} />;
  else base = <HomeScreen amount={amount} setAmount={setAmount} t={t} nav={nav} toast={toast} onSchedule={() => setScheduleOpen(true)} onShare={doShare} />;

  const rootStyle = { '--serif': SERIF_STACK[t.serifFont] || SERIF_STACK['Newsreader'], '--accent': t.accent };

  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.max(0.4, Math.min(1, (window.innerHeight - 40) / 874, (window.innerWidth - 32) / 402)));
    fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div style={rootStyle} data-density={t.density === 'dense' ? 'dense' : 'regular'}>
      <div className="stage">
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <IOSDevice statusDark={view === 'home'} indicatorLight={false}>
          <div className="app-root">
            {base}
            {!overlay && <TabBar tab={tab} onTab={onTab} />}

            {view === 'send' && (
              <div key="send" style={{ position: 'absolute', inset: 0, zIndex: 40, animation: 'slideInRight .32s cubic-bezier(.2,.7,.2,1) both' }}>
                <SendFlow amount={amount} onClose={goHome} styleKey={t.cardStyle} />
              </div>
            )}
            {view === 'scan' && (
              <div key="scan" style={{ position: 'absolute', inset: 0, zIndex: 40, animation: 'slideInRight .32s cubic-bezier(.2,.7,.2,1) both' }}>
                <ScanScreen onBack={() => setView(tab === 'wallet' ? 'walletDetail' : 'home')} />
              </div>
            )}

            <ScheduleSheet open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
            <ShareSheet open={shareOpen} onClose={() => setShareOpen(false)} toast={toast} />
            <Toast msg={toastMsg} />
          </div>
        </IOSDevice>
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Typography" />
        <TweakSelect label="Section serif" value={t.serifFont} options={['Newsreader', 'Playfair Display', 'Source Serif 4']} onChange={(v) => setTweak('serifFont', v)} />
        <TweakRadio label="Density" value={t.density} options={['regular', 'dense']} onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Brand" />
        <TweakColor label="Primary action" value={t.accent} options={['#169B61', '#0F7049', '#1E9E8A', '#C79A3B', '#2A6FDB']} onChange={(v) => setTweak('accent', v)} />
        <TweakSelect label="Card finish" value={t.cardStyle} options={['emerald', 'midnight', 'graphite', 'gold']} onChange={(v) => setTweak('cardStyle', v)} />

        <TweakSection label="Smart states" />
        <TweakToggle label="Best-rate badge" value={t.showBadge} onChange={(v) => setTweak('showBadge', v)} />
        <TweakToggle label="Resume transfer" value={t.showResume} onChange={(v) => setTweak('showResume', v)} />
        <TweakToggle label="Smart suggestion" value={t.showSuggestion} onChange={(v) => setTweak('showSuggestion', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
