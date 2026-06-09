// data.jsx — mock data for the GBP→PKR (Pakistan) persona.

const RATE = 371.80; // £1 = PKR

const WALLETS = [
  { code: 'GBP', name: 'British Pound', last4: '4144', holder: 'Vaibhav Kaul', balance: 22.70, sym: '£', balanceHome: 22.70, flag: <FlagGB size={18} />, styleKey: 'emerald' },
  { code: 'INR', name: 'Indian Rupee', last4: '8821', holder: 'Vaibhav Kaul', balance: 13127.50, sym: '₹', balanceHome: 124.90, flag: <FlagIN size={18} />, styleKey: 'peach' },
  { code: 'PKR', name: 'Pakistani Rupee', last4: '0317', holder: 'Vaibhav Kaul', balance: 6730.00, sym: 'Rs', balanceHome: 18.10, flag: <FlagPK size={18} />, styleKey: 'cream' },
];
const TOTAL_HOME = WALLETS.reduce((a, w) => a + w.balanceHome, 0); // in GBP

// primary recipient (resume + suggestion)
const AMARA = { name: 'Amara Kaul', rel: 'Mother', initials: 'AK', hue: 158 };

const RECIPIENTS = [
  { name: 'Amara Kaul', rel: 'Mother', initials: 'AK', total: 1840, sends: 14, hue: 158 },
  { name: 'Bilal Kaul', rel: 'Brother', initials: 'BK', total: 1260, sends: 9, hue: 24 },
  { name: 'Nadia R.', rel: 'Aunt', initials: 'NR', total: 760, sends: 5, hue: 210 },
  { name: 'Hassan M.', rel: 'Friend', initials: 'HM', total: 340, sends: 3, hue: 280 },
];
const IMPACT_TOTAL = RECIPIENTS.reduce((a, r) => a + r.total, 0); // 4200
const IMPACT_MONTHS = [
  { m: 'Jan', v: 280 }, { m: 'Feb', v: 340 }, { m: 'Mar', v: 300 }, { m: 'Apr', v: 520 },
  { m: 'May', v: 410 }, { m: 'Jun', v: 600 }, { m: 'Jul', v: 380 }, { m: 'Aug', v: 470 },
  { m: 'Sep', v: 360 }, { m: 'Oct', v: 540 }, { m: 'Nov', v: 0 }, { m: 'Dec', v: 0 },
];

const BILLS_UPCOMING = [
  { id: 'sngpl', provider: 'SNGPL', acct: '5340 6210 0004', cat: 'Gas', icon: IconFlame, due: 'Due Jun 8, 2026', amount: 'PKR 4,120', pastDue: true, linked: true },
  { id: 'lesco', provider: 'LESCO', acct: '0427 1180 9921', cat: 'Electricity', icon: IconBolt, due: 'Due Jun 21, 2026', amount: 'PKR 9,860', pastDue: false, linked: true },
];

const BILL_CATEGORIES = [
  { id: 'elec',  label: 'Electricity', icon: IconBolt,    linked: true,  account: 'LESCO • 0427…9921',
    partners: [{ n: 'LESCO — Lahore', c: '#1f6f3e' }, { n: 'K-Electric — Karachi', c: '#e08a1e' }, { n: 'FESCO — Faisalabad', c: '#0d5aa0' }, { n: 'MEPCO — Multan', c: '#b23a48' }] },
  { id: 'gas',   label: 'Gas',         icon: IconFlame,   linked: true,  account: 'SNGPL • 5340…0004',
    partners: [{ n: 'SNGPL', c: '#c0392b' }, { n: 'SSGC', c: '#16607a' }] },
  { id: 'water', label: 'Water',       icon: IconDroplet, linked: false, account: null,
    partners: [{ n: 'WASA — Lahore', c: '#1565c0' }, { n: 'KW&SB — Karachi', c: '#0a7d8c' }, { n: 'WASA — Rawalpindi', c: '#0d47a1' }] },
  { id: 'phone', label: 'Phone',       icon: IconPhone,   linked: false, account: null,
    partners: [{ n: 'PTCL', c: '#0b6e4f' }, { n: 'Jazz', c: '#b3122f' }, { n: 'Zong', c: '#1a9b53' }, { n: 'Telenor', c: '#1f6fd6' }, { n: 'Ufone', c: '#e08a1e' }] },
  { id: 'air',   label: 'Airtime',     icon: IconAirtime, linked: true,  account: 'Jazz • 0301…4471',
    partners: [{ n: 'Jazz', c: '#b3122f' }, { n: 'Zong', c: '#1a9b53' }, { n: 'Telenor', c: '#1f6fd6' }, { n: 'Ufone', c: '#e08a1e' }] },
];

Object.assign(window, {
  RATE, WALLETS, TOTAL_HOME, AMARA, RECIPIENTS, IMPACT_TOTAL, IMPACT_MONTHS, BILLS_UPCOMING, BILL_CATEGORIES,
});
