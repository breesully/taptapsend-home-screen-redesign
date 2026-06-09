// icons.jsx — monochrome line-icon set. One unique glyph per function (PRD requirement).
// All take {size, color, sw} and inherit currentColor by default.

const Ic = ({ size = 24, color = 'currentColor', sw = 1.8, children, fill = 'none', vb = 24 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill={fill}
       stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
       style={{ display: 'block', flexShrink: 0 }}>
    {children}
  </svg>
);

// ── header / nav ──
const IconBell = (p) => <Ic {...p}><path d="M18 8.5a6 6 0 1 0-12 0c0 6-2 7.5-2 7.5h16s-2-1.5-2-7.5Z"/><path d="M10.3 20a2 2 0 0 0 3.4 0"/></Ic>;
const IconScan = (p) => <Ic {...p}><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M4 12h16" strokeWidth={p.sw ? p.sw : 2}/></Ic>;
const IconChevDown = (p) => <Ic {...p}><path d="M6 9l6 6 6-6"/></Ic>;
const IconChevRight = (p) => <Ic {...p}><path d="M9 6l6 6-6 6"/></Ic>;
const IconChevLeft = (p) => <Ic {...p}><path d="M15 6l-6 6 6 6"/></Ic>;
const IconClose = (p) => <Ic {...p}><path d="M6 6l12 12M18 6L6 18"/></Ic>;
const IconInfo = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></Ic>;
const IconArrowRight = (p) => <Ic {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Ic>;

// ── send / exchange ──
const IconSwap = (p) => <Ic {...p}><path d="M7 4 4 7l3 3M4 7h13M17 20l3-3-3-3M20 17H7"/></Ic>;
const IconSend = (p) => <Ic {...p}><path d="M21 4 3 11l6 2 2 6 4-7"/><path d="M21 4 11 12"/></Ic>;
const IconRecurring = (p) => <Ic {...p}><path d="M4 9a8 8 0 0 1 13.7-3.3L20 8M20 4v4h-4"/><path d="M20 15a8 8 0 0 1-13.7 3.3L4 16M4 20v-4h4"/></Ic>;

// ── wallet quick actions ──
const IconPlus = (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>;
const IconRequest = (p) => <Ic {...p}><path d="M12 4v13M7 12l5 5 5-5"/><path d="M5 20h14" /></Ic>;
const IconConvert = (p) => <Ic {...p}><path d="M16 3l4 4-4 4M20 7H9a5 5 0 0 0-5 5M8 21l-4-4 4-4M4 17h11a5 5 0 0 0 5-5"/></Ic>;

// ── wallet / cards ──
const IconWallet = (p) => <Ic {...p}><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1.2" fill={p.color || 'currentColor'} stroke="none"/></Ic>;
const IconAddWallet = (p) => <Ic {...p}><rect x="3" y="5" width="13" height="9" rx="2"/><path d="M3 9h13"/><path d="M19 14v6M16 17h6"/></Ic>;

// ── bill categories (each unique) ──
const IconBolt = (p) => <Ic {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></Ic>;
const IconFlame = (p) => <Ic {...p}><path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c2 1.5 3 3.2 3 5.5A5.5 5.5 0 0 1 6.5 15c0-2 1-3.5 2.5-5 .8 2 2 .5 1-3 .5-2 1.3-3 2-4Z"/></Ic>;
const IconDroplet = (p) => <Ic {...p}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/></Ic>;
const IconPhone = (p) => <Ic {...p}><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/></Ic>;
const IconAirtime = (p) => <Ic {...p}><path d="M4 13a10 10 0 0 1 16 0M7 16a6 6 0 0 1 10 0"/><circle cx="12" cy="19.5" r="1.3" fill={p.color || 'currentColor'} stroke="none"/></Ic>;
const IconReceipt = (p) => <Ic {...p}><path d="M6 3h12v18l-3-1.6L12 21l-3-1.6L6 21V3Z"/><path d="M9 8h6M9 12h6"/></Ic>;

// ── status / misc ──
const IconCheck = (p) => <Ic {...p}><path d="M5 12.5l4.5 4.5L19 7"/></Ic>;
const IconCheckCircle = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M8.5 12.2l2.4 2.4 4.6-5"/></Ic>;
const IconClock = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></Ic>;
const IconCalendar = (p) => <Ic {...p}><rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></Ic>;
const IconGift = (p) => <Ic {...p}><path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z"/><path d="M3 7h18v4H3zM12 7v14"/><path d="M12 7S11 3 8.5 3.5 9 7 12 7ZM12 7s1-4 3.5-3.5S15 7 12 7Z"/></Ic>;
const IconShare = (p) => <Ic {...p}><path d="M12 15V4M8.5 7.5 12 4l3.5 3.5"/><path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"/></Ic>;
const IconCopy = (p) => <Ic {...p}><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></Ic>;
const IconLock = (p) => <Ic {...p}><rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></Ic>;
const IconSliders = (p) => <Ic {...p}><path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/></Ic>;
const IconEye = (p) => <Ic {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></Ic>;
const IconChart = (p) => <Ic {...p}><path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="2.6" height="5" rx="1" fill={p.color||'currentColor'} stroke="none"/><rect x="12" y="8" width="2.6" height="9" rx="1" fill={p.color||'currentColor'} stroke="none"/><rect x="17" y="14" width="2.6" height="3" rx="1" fill={p.color||'currentColor'} stroke="none"/></Ic>;
const IconHeart = (p) => <Ic {...p}><path d="M12 20s-7-4.5-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7-2.5C19 10.5 12 20 12 20Z"/></Ic>;
const IconSparkle = (p) => <Ic {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/></Ic>;
const IconAward = (p) => <Ic {...p}><circle cx="12" cy="9" r="5.5"/><path d="M12 6.4l.9 1.8 2 .3-1.45 1.4.35 2L12 11.9l-1.8.95.35-2L9.1 8.5l2-.3.9-1.8Z" fill={p.color||'currentColor'} stroke="none"/><path d="M9 13.8L7.5 21l4.5-2.4L16.5 21 15 13.8"/></Ic>;
const IconTagDown = (p) => <Ic {...p}><path d="M4 13.5l6.5 6.5a2 2 0 0 0 2.8 0L20 13.3a2 2 0 0 0 0-2.8L13.3 4H6a2 2 0 0 0-2 2v7.5Z"/><circle cx="9" cy="9" r="1.3" fill={p.color||'currentColor'} stroke="none"/></Ic>;

// ── tab bar ──
const IconHome = (p) => <Ic {...p}><path d="M4 11l8-7 8 7M6 9.5V20h12V9.5"/></Ic>;
const IconActivity = (p) => <Ic {...p}><path d="M7 7 4 10l3 3M4 10h13M17 21l3-3-3-3M20 18H7"/></Ic>;
const IconChecklist = (p) => <Ic {...p}><rect x="4" y="3.5" width="16" height="17" rx="3"/><path d="M7.5 8.2l1.3 1.3 2.2-2.4M7.5 14.2l1.3 1.3 2.2-2.4M14 8h3M14 14h3"/></Ic>;
const IconApplePass = (p) => <Ic {...p}><rect x="3.5" y="6" width="17" height="12" rx="2.5"/><path d="M3.5 10h17"/><path d="M7 14h4"/></Ic>;

// brand flags (simple, recognizable)
const FlagGB = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ borderRadius: '50%', display: 'block' }}>
    <clipPath id="gbc"><circle cx="12" cy="12" r="12"/></clipPath>
    <g clipPath="url(#gbc)">
      <rect width="24" height="24" fill="#012169"/>
      <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4.5"/>
      <path d="M0 0l24 24M24 0L0 24" stroke="#C8102E" strokeWidth="2.5"/>
      <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7"/>
      <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="4"/>
    </g>
  </svg>
);
const FlagPK = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ borderRadius: '50%', display: 'block' }}>
    <clipPath id="pkc"><circle cx="12" cy="12" r="12"/></clipPath>
    <g clipPath="url(#pkc)">
      <rect width="24" height="24" fill="#01411C"/>
      <rect width="6.5" height="24" fill="#fff"/>
      <path d="M17.5 8.5a4 4 0 1 0 1.6 6.4 5 5 0 1 1-1.6-6.4Z" fill="#fff"/>
      <path d="M18.4 12.3l1.1.9-.5-1.3 1.1-.9h-1.4l-.4-1.3-.4 1.3h-1.3l1 .9-.4 1.3 1.2-.9Z" fill="#fff"/>
    </g>
  </svg>
);
const FlagIN = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ borderRadius: '50%', display: 'block' }}>
    <clipPath id="inc"><circle cx="12" cy="12" r="12"/></clipPath>
    <g clipPath="url(#inc)">
      <rect width="24" height="8" fill="#FF9933"/>
      <rect y="8" width="24" height="8" fill="#fff"/>
      <rect y="16" width="24" height="8" fill="#138808"/>
      <circle cx="12" cy="12" r="2.4" fill="none" stroke="#054aa6" strokeWidth="0.8"/>
    </g>
  </svg>
);

Object.assign(window, {
  IconBell, IconScan, IconChevDown, IconChevRight, IconChevLeft, IconClose, IconInfo, IconArrowRight,
  IconSwap, IconSend, IconRecurring,
  IconPlus, IconRequest, IconConvert,
  IconWallet, IconAddWallet,
  IconBolt, IconFlame, IconDroplet, IconPhone, IconAirtime, IconReceipt,
  IconCheck, IconCheckCircle, IconClock, IconCalendar, IconGift, IconShare, IconCopy,
  IconLock, IconSliders, IconEye, IconChart, IconHeart, IconSparkle, IconAward, IconTagDown,
  IconHome, IconActivity, IconChecklist, IconApplePass,
  FlagGB, FlagPK, FlagIN,
});
