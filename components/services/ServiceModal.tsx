import servicesData from "@/data/services.json";

const services = servicesData.services;

export default function ServiceModal({
  service,
  onClose,
}: {
  service: (typeof services)[0];
  onClose: () => void;
}) {
  const isBlue = service.color === "cyber-blue";
  const accent = isBlue ? "#00d4ff" : "#ff6b35";
  const accentClass = isBlue ? "text-cyber-blue" : "text-cyber-orange";
  const borderClass = isBlue
    ? "border-cyber-blue/40"
    : "border-cyber-orange/40";
  const bgAccentClass = isBlue ? "bg-cyber-blue/10" : "bg-cyber-orange/10";
  const dotClass = isBlue ? "bg-cyber-blue" : "bg-cyber-orange";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0,0,0,0.75)",
      }}
      onClick={onClose}
    >
      {/* Animated scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            animation: "scanline 3s linear infinite",
          }}
        />
      </div>

      <div
        className={`relative w-full max-w-2xl bg-[#0a0f1a] border ${borderClass} rounded-2xl overflow-hidden shadow-2xl`}
        style={{ boxShadow: `0 0 60px ${accent}22, 0 0 120px ${accent}11` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        {/* Header */}
        <div className={`p-8 border-b ${borderClass} flex items-start gap-5`}>
          <div
            className={`text-5xl p-4 rounded-xl ${bgAccentClass} border ${borderClass} flex-shrink-0`}
            style={{ boxShadow: `0 0 20px ${accent}33` }}
          >
            {service.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`w-2 h-2 rounded-full ${dotClass} animate-pulse`}
              />
              <span
                className={`text-xs font-mono ${accentClass} uppercase tracking-widest`}
              >
                Active Service
              </span>
            </div>
            <h2 className={`text-2xl font-bold text-white leading-tight`}>
              {service.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-2xl leading-none flex-shrink-0 mt-1"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-7 max-h-[60vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <p className="text-gray-300 leading-relaxed">
              {service.fullDetails.overview}
            </p>
          </div>

          {/* Key Focus */}
          <div>
            <h3
              className={`text-xs font-mono uppercase tracking-widest ${accentClass} mb-3`}
            >
              // Key Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.keyFocus.map((f, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm font-mono border ${borderClass} ${bgAccentClass} ${accentClass}`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* What you get */}
          <div>
            <h3
              className={`text-xs font-mono uppercase tracking-widest ${accentClass} mb-3`}
            >
              // What You Receive
            </h3>
            <ul className="space-y-2">
              {service.fullDetails.whatYouGet.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-300 text-sm"
                >
                  <span
                    className={`${accentClass} font-mono mt-0.5 flex-shrink-0`}
                  >
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal for */}
          <div
            className={`rounded-xl p-4 ${bgAccentClass} border ${borderClass}`}
          >
            <h3
              className={`text-xs font-mono uppercase tracking-widest ${accentClass} mb-2`}
            >
              // Ideal For
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {service.fullDetails.ideal}
            </p>
          </div>

          {/* Frameworks */}
          <div>
            <h3
              className={`text-xs font-mono uppercase tracking-widest ${accentClass} mb-3`}
            >
              // Frameworks & Standards
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.fullDetails.frameworks.map((fw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-gray-400"
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${borderClass} flex gap-3`}>
          <a
            href="/contact"
            className="flex-1 text-center py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${accent}cc, ${accent}88)`,
              color: "#fff",
              boxShadow: `0 0 20px ${accent}44`,
            }}
          >
            GET A QUOTE FOR THIS SERVICE
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-semibold text-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            CLOSE
          </button>
        </div>

        {/* Bottom accent bar */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}44, transparent)`,
          }}
        />
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
