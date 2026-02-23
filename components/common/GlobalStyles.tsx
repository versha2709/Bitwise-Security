export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}

      @keyframes shieldGlowPulse{ 0%,100%{opacity:.75;transform:translate(-50%,-50%) scale(1);} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.07);} }
      @keyframes shieldHalo{ 0%,100%{opacity:.22;} 50%{opacity:.62;} }
      @keyframes shieldStroke{ 0%,100%{filter:drop-shadow(0 0 8px #00aaff) drop-shadow(0 0 20px #0066cc);} 50%{filter:drop-shadow(0 0 20px #00eeff) drop-shadow(0 0 44px #0099ff);} }
      @keyframes dotPulse{ 0%,100%{opacity:.72;} 50%{opacity:1;} }
      @keyframes cometAnim{ 0%,100%{opacity:.82;transform:scaleX(1);} 50%{opacity:1;transform:scaleX(1.04);} }
      @keyframes hexReveal{ from{opacity:0;transform:translateX(28px);} to{opacity:1;transform:translateX(0);} }
      @keyframes hexPop{ from{opacity:0;transform:scale(.45);} to{opacity:1;transform:scale(1);} }
      @keyframes hexHoverPulse{ from{opacity:.4;} to{opacity:.75;} }
      @keyframes slideRight{ from{opacity:0;transform:translateX(8px);} to{opacity:1;transform:translateX(0);} }
      @keyframes chipReveal{ from{opacity:0;transform:scale(.6);} to{opacity:1;transform:scale(1);} }
      @keyframes oceanLine{ 0%,100%{opacity:.7;} 50%{opacity:1;} }
      @keyframes oceanW1{ 0%,100%{d:path("M0,40 Q360,18 720,40 Q1080,62 1440,40 L1440,130 L0,130 Z");} 50%{d:path("M0,50 Q360,28 720,50 Q1080,72 1440,50 L1440,130 L0,130 Z");} }
      @keyframes oceanW2{ 0%,100%{d:path("M0,55 Q360,36 720,55 Q1080,74 1440,55 L1440,130 L0,130 Z");} 50%{d:path("M0,44 Q360,24 720,44 Q1080,64 1440,44 L1440,130 L0,130 Z");} }
      @keyframes dotBlink{ 0%,100%{opacity:.35;} 50%{opacity:1;} }
      @keyframes threatIn{ from{transform:translateY(14px);opacity:0;} to{transform:translateY(0);opacity:1;} }
      @keyframes radarRing{ 0%,100%{opacity:.35;transform:translate(-50%,-50%) scale(1);} 50%{opacity:.65;transform:translate(-50%,-50%) scale(1.04);} }
      @keyframes scanLine{ 0%{transform:translateY(-100%);} 100%{transform:translateY(300%);} }

      .threat-item{ animation:threatIn .45s ease-out; }
      ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:#050d1f;} ::-webkit-scrollbar-thumb{background:#1155aa;border-radius:2px;}
    `}</style>
  );
}
