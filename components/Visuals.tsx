const B = "#245BFF", L = "#70B7FF", M = "#858D9B", T = "#E8EDF5";
const common = { viewBox: "0 0 800 600", width: "100%", height: "100%", fill: "none", preserveAspectRatio: "xMidYMid slice" } as const;

export default function Visual({ id }: { id: string }) {
  if (id === "design") {
    return (
      <svg {...common}>
        <g stroke={M} opacity=".35"><path d="M0 420H800M0 180H800M260 0V600M540 0V600" strokeDasharray="3 6" /></g>
        <rect x="70" y="70" width="660" height="460" stroke={L} opacity=".65" />
        <text x="100" y="395" fill={T} fontFamily="sans-serif" fontWeight="700" fontSize="300" letterSpacing="-18">Aa</text>
        <rect x="565" y="170" width="115" height="215" fill={B} />
        <circle cx="622" cy="276" r="34" stroke={T} strokeWidth="1.5" />
        <path d="M100 450H700" stroke={L} /><text x="100" y="484" fill={M} fontFamily="monospace" fontSize="14">HIERARCHY / TYPE / COMPOSITION</text>
      </svg>
    );
  }

  if (id === "nfc") {
    return (
      <svg {...common}>
        <g stroke={L} opacity=".55"><path d="M0 300H800M400 0V600" strokeDasharray="4 9" /></g>
        <rect x="180" y="105" width="440" height="390" rx="22" fill="#111722" stroke={L} strokeWidth="2" />
        <rect x="205" y="130" width="390" height="340" rx="14" stroke={M} opacity=".55" />
        <circle cx="400" cy="250" r="73" stroke={B} strokeWidth="5" />
        <circle cx="400" cy="250" r="48" stroke={L} strokeWidth="2" />
        <path d="M369 250h62M400 219v62" stroke={T} strokeWidth="3" strokeLinecap="round" />
        <text x="400" y="380" textAnchor="middle" fill={T} fontFamily="sans-serif" fontSize="26" fontWeight="700">TAP TO CONNECT</text>
        <text x="400" y="415" textAnchor="middle" fill={M} fontFamily="monospace" fontSize="13">REVIEW / WHATSAPP / MENU</text>
        <path d="M118 250h48m468 0h48M400 40v42m0 396v42" stroke={B} strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="110" y="90" width="580" height="420" stroke={L} strokeWidth="1.5" />
      <path d="M110 140H690" stroke={L} /><circle cx="135" cy="115" r="4" fill={B} /><circle cx="153" cy="115" r="4" stroke={M} /><circle cx="171" cy="115" r="4" stroke={M} />
      <rect x="145" y="175" width="320" height="150" fill={B} opacity=".85" />
      <rect x="485" y="175" width="170" height="70" stroke={L} /><rect x="485" y="255" width="170" height="70" stroke={L} />
      <path d="M145 360h510M145 385h400M145 410h450" stroke={M} /><rect x="145" y="445" width="110" height="28" stroke={B} />
      <text x="160" y="270" fill={T} fontFamily="monospace" fontSize="20">BUILD / REFINE</text>
    </svg>
  );
}
