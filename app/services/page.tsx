"use client";

import { useState } from "react";
import CyberBackground from "@/components/CyberBackground";

const services = [
  {
    icon: "🌐",
    title: "Web Application Penetration Testing",
    description:
      "I hunt for logic flaws and vulnerabilities that automated tools miss. From the OWASP Top 10 to complex API business logic, I ensure your web apps are resilient against modern attacks.",
    color: "cyber-blue",
    keyFocus: ["Broken Access Control", "SQLi", "XSS", "SSRF"],
    fullDetails: {
      overview:
        "I hunt for logic flaws and vulnerabilities that automated tools miss. From the OWASP Top 10 to complex API business logic, I ensure your web apps are resilient against modern attacks.",
      whatYouGet: [
        "Manual testing beyond automated scanners",
        "API endpoint enumeration & business logic testing",
        "Authentication & session management review",
        "Detailed PoC for every finding",
        "Executive summary + developer remediation guide",
      ],
      ideal:
        "Startups securing their MVP, SaaS platforms, e-commerce apps, and enterprises needing compliance checks.",
      frameworks: ["OWASP Top 10", "PTES", "WSTG"],
    },
  },
  {
    icon: "🏢",
    title: "On-Prem Active Directory Pentesting",
    description:
      'The "keys to the kingdom" often reside in AD. I simulate an internal breach to see how far an attacker can pivot, escalate privileges, and achieve domain dominance.',
    color: "cyber-orange",
    keyFocus: ["Kerberoasting", "BloodHound analysis", "GPO misconfigurations"],
    fullDetails: {
      overview:
        'The "keys to the kingdom" often reside in AD. I simulate an internal breach to see how far an attacker can pivot, escalate privileges, and achieve full domain dominance — just like a real threat actor would.',
      whatYouGet: [
        "Full attack path mapping with BloodHound",
        "Privilege escalation chain documentation",
        "GPO and ACL misconfiguration review",
        "Domain persistence technique identification",
        "Remediation roadmap prioritized by impact",
      ],
      ideal:
        "Enterprises with on-premises infrastructure, hybrid environments, and organizations preparing for internal threat simulations.",
      frameworks: ["MITRE ATT&CK", "PTES", "BloodHound CE"],
    },
  },
  {
    icon: "☁️",
    title: "Azure Pentesting & Audit Checks",
    description:
      "Cloud environments are often breached through identity and configuration errors. I perform deep audits of your Azure tenant and subscription security posture.",
    color: "cyber-blue",
    keyFocus: [
      "Entra ID (Azure AD) security",
      "Key Vault exposures",
      "Storage Account leaks",
    ],
    fullDetails: {
      overview:
        "Cloud environments are often breached through identity and configuration errors. I perform deep audits of your Azure tenant, subscriptions, and resource configurations to surface every exploitable gap.",
      whatYouGet: [
        "Entra ID (Azure AD) permission & role review",
        "Storage Account and Key Vault exposure check",
        "Service Principal and Managed Identity abuse paths",
        "Network security group and firewall rule analysis",
        "CIS Azure Benchmark compliance mapping",
      ],
      ideal:
        "Businesses running workloads on Azure, SaaS companies with Azure backends, and organizations after cloud migrations.",
      frameworks: [
        "CIS Azure Benchmark",
        "MITRE ATT&CK for Cloud",
        "Microsoft Secure Score",
      ],
    },
  },
  {
    icon: "📱",
    title: "Mobile Application Pentesting (iOS & Android)",
    description:
      "Mobile apps face unique threats like insecure data storage and weak binary protections. I perform both static and dynamic analysis to keep your mobile users safe.",
    color: "cyber-orange",
    keyFocus: [
      "Reverse engineering",
      "SSL pinning bypass",
      "Local data leakage",
    ],
    fullDetails: {
      overview:
        "Mobile apps face unique threats like insecure data storage, hardcoded secrets, and weak binary protections. I perform both static and dynamic analysis on iOS and Android apps to keep your users safe.",
      whatYouGet: [
        "APK/IPA static analysis & reverse engineering",
        "Dynamic runtime analysis with instrumentation",
        "SSL pinning bypass & traffic interception",
        "Local storage and keychain security review",
        "Backend API testing from mobile context",
      ],
      ideal:
        "Fintech apps, health apps, and any mobile product handling sensitive user data or financial transactions.",
      frameworks: ["OWASP MASVS", "OWASP MSTG", "Frida & Objection"],
    },
  },
  {
    icon: "🛡️",
    title: "Source Code Analysis (SAST)",
    description:
      'I review your codebase line-by-line to find security flaws at the root. This "White Box" approach is the most effective way to eliminate vulnerabilities during the SDLC.',
    color: "cyber-blue",
    keyFocus: ["Hardcoded secrets", "Insecure functions", "Logic errors"],
    fullDetails: {
      overview:
        'I review your codebase line-by-line to find security flaws at the root. This "White Box" approach is the most effective and cost-efficient way to eliminate vulnerabilities early in the SDLC.',
      whatYouGet: [
        "Manual code review beyond automated SAST tools",
        "Hardcoded credentials and secret detection",
        "Insecure cryptographic implementation review",
        "Business logic flaw identification",
        "CI/CD pipeline security recommendations",
      ],
      ideal:
        "Development teams pre-launch, companies after a security incident, and engineering teams adopting a DevSecOps culture.",
      frameworks: ["OWASP Code Review Guide", "CWE/SANS Top 25", "NIST SSDF"],
    },
  },
  {
    icon: "📟",
    title: "Hardware Pentesting",
    description:
      "Security doesn't end at the software layer. I assess physical devices, IoT hardware, and embedded systems to ensure they can't be compromised via physical access or side-channel attacks.",
    color: "cyber-orange",
    keyFocus: [
      "UART/JTAG debugging",
      "Firmware extraction",
      "Intercepting bus communication",
    ],
    fullDetails: {
      overview:
        "Security doesn't end at the software layer. I assess physical devices, IoT hardware, and embedded systems to ensure they can't be compromised via physical access, debug interfaces, or side-channel attacks.",
      whatYouGet: [
        "UART, JTAG, and SPI/I2C interface analysis",
        "Firmware extraction and reverse engineering",
        "Hardcoded credential and key extraction",
        "Physical tamper resistance assessment",
        "Secure boot and update mechanism review",
      ],
      ideal:
        "IoT product companies, smart device manufacturers, industrial control system operators, and hardware startups pre-launch.",
      frameworks: ["OWASP IoT Top 10", "IEC 62443", "ETSI EN 303 645"],
    },
  },
];

function ServiceModal({
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

export default function Services() {
  const [activeModal, setActiveModal] = useState<(typeof services)[0] | null>(
    null,
  );

  return (
    <main className="relative min-h-screen pt-24 pb-16">
      <CyberBackground />

      {activeModal && (
        <ServiceModal
          service={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">OUR</span>{" "}
            <span className="text-cyber-blue text-glow">SERVICES</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyber-blue to-cyber-orange mx-auto mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Comprehensive security testing services to protect your digital
            infrastructure
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-cyber-darkBlue/80 backdrop-blur-md border ${
                service.color === "cyber-blue"
                  ? "border-cyber-blue/30 box-glow"
                  : "border-cyber-orange/30 box-glow-orange"
              } rounded-2xl p-8 hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3
                className={`text-2xl font-bold mb-4 ${
                  service.color === "cyber-blue"
                    ? "text-cyber-blue"
                    : "text-cyber-orange"
                }`}
              >
                {service.title}
              </h3>

              <p className="text-gray-300 leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Key focus tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.keyFocus.map((focus, fi) => (
                  <span
                    key={fi}
                    className={`text-xs px-2 py-1 rounded font-mono ${
                      service.color === "cyber-blue"
                        ? "bg-cyber-blue/10 text-cyber-blue/70 border border-cyber-blue/20"
                        : "bg-cyber-orange/10 text-cyber-orange/70 border border-cyber-orange/20"
                    }`}
                  >
                    {focus}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActiveModal(service)}
                className={`flex items-center gap-2 text-sm font-mono transition-all duration-300 group/btn ${
                  service.color === "cyber-blue"
                    ? "text-cyber-blue"
                    : "text-cyber-orange"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    service.color === "cyber-blue"
                      ? "bg-cyber-blue"
                      : "bg-cyber-orange"
                  } animate-pulse`}
                />
                <span className="group-hover/btn:tracking-widest transition-all duration-300">
                  LEARN MORE
                </span>
                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Methodology Section */}
        <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-2xl p-12 box-glow mb-8">
          <h2 className="text-4xl font-bold text-cyber-blue mb-8 text-center">
            My Methodology
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg max-w-3xl mx-auto">
            Every engagement follows a rigorous, industry-standard process
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Scoping",
                description:
                  "Defining boundaries to ensure zero business disruption.",
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Reconnaissance",
                description: "Gathering intelligence on the target.",
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Exploitation",
                description:
                  "Safely demonstrating the impact of a vulnerability.",
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Reporting",
                description:
                  "Providing a detailed, prioritized roadmap for remediation.",
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-cyber-dark border-2 border-cyber-blue rounded-full flex items-center justify-center text-cyber-blue group-hover:scale-110 group-hover:border-cyber-orange group-hover:text-cyber-orange transition-all duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="text-5xl font-bold text-cyber-blue/20 mb-2">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Me */}
        <div className="bg-gradient-to-br from-cyber-darkBlue to-cyber-dark border border-cyber-orange rounded-2xl p-12 box-glow-orange text-center">
          <h2 className="text-3xl font-bold text-cyber-orange mb-6">
            Why Work With Me?
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto mb-8">
            You receive a comprehensive report that speaks both to developers
            (with technical PoCs) and stakeholders (with executive risk
            summaries).
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Technical PoCs", value: "100%" },
              { label: "Executive Summaries", value: "Clear" },
              { label: "Follow-up Support", value: "Included" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-cyber-dark/50 rounded-xl p-6 border border-cyber-orange/30"
              >
                <div className="text-3xl font-bold text-cyber-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyber-orange to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyber-orange/50 transition-all duration-300 hover:scale-105"
            >
              START YOUR SECURITY ASSESSMENT
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
