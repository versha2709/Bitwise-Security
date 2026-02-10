"use client";

import { useEffect, useState } from "react";
import CyberBackground from "@/components/CyberBackground";

export default function Home() {
  const [threatData, setThreatData] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { value: 0, label: "ATTACKS BLOCKED", target: 847362 },
    { value: 0, label: "ACTIVE GRANTS", target: 18476 },
  ]);

  const [barHeights, setBarHeights] = useState([60, 80, 60]);

  // Real-time threat stream - BOTTOM TO TOP
  useEffect(() => {
    const threats = [
      "DIRECTORY TRAVERSAL",
      "BUFFER OVERFLOW DETECTED",
      "SQL INJECTION ATTEMPT",
      "BRUTE FORCE DETECTED",
      "XSS ATTACK BLOCKED",
      "MALICIOUS PAYLOAD",
      "CSRF TOKEN INVALID",
      "UNAUTHORIZED ACCESS",
    ];

    const severityLevels = ["HIGH", "MEDIUM", "CRITICAL"];

    const interval = setInterval(() => {
      setThreatData((prev) => {
        const newThreat = {
          type: threats[Math.floor(Math.random() * threats.length)],
          ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          port: Math.floor(Math.random() * 65535),
          severity:
            severityLevels[Math.floor(Math.random() * severityLevels.length)],
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: true }),
          id: Date.now(),
        };
        // Add to END (bottom), keep only last 5
        return [...prev, newThreat].slice(-5);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate stats counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: Math.min(
            stat.value + Math.floor(stat.target / 100),
            stat.target,
          ),
        })),
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animate bar charts
  useEffect(() => {
    const interval = setInterval(() => {
      setBarHeights([
        Math.random() * 40 + 60,
        Math.random() * 40 + 80,
        Math.random() * 40 + 60,
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-cyber-dark">
      <CyberBackground />

      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* GLOBAL Background Animations - COVERS ENTIRE SCREEN */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Background Network Lines - HEAVY ANIMATION - FULL SCREEN */}
          <div className="absolute inset-0 overflow-hidden opacity-40">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#00f3ff"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Multiple animated connection lines - FULL SCREEN */}
              {[
                { x1: "10%", y1: "20%", x2: "90%", y2: "30%", dur: "2s" },
                { x1: "20%", y1: "60%", x2: "80%", y2: "70%", dur: "3s" },
                { x1: "30%", y1: "40%", x2: "70%", y2: "50%", dur: "2.5s" },
                { x1: "15%", y1: "80%", x2: "85%", y2: "20%", dur: "4s" },
                { x1: "5%", y1: "50%", x2: "95%", y2: "60%", dur: "3.5s" },
                { x1: "25%", y1: "10%", x2: "75%", y2: "90%", dur: "5s" },
              ].map((line, i) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#00f3ff"
                  strokeWidth="1.5"
                  opacity="0.5"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur={line.dur}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </svg>
          </div>

          {/* HEAVY Floating Particles - FULL SCREEN - MAXIMUM INTENSITY */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-float-heavy"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  background:
                    i % 3 === 0
                      ? "#00f3ff"
                      : i % 3 === 1
                        ? "#ff6b35"
                        : "#ffffff",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${1.5 + Math.random() * 2.5}s`,
                  opacity: Math.random() * 0.9 + 0.4,
                  boxShadow:
                    i % 2 === 0
                      ? "0 0 15px rgba(0, 243, 255, 0.9), 0 0 30px rgba(0, 243, 255, 0.5)"
                      : "0 0 15px rgba(255, 107, 53, 0.9), 0 0 30px rgba(255, 107, 53, 0.5)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Left Sidebar - Vertical Icons */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 space-y-6">
          <div className="w-12 h-12 bg-cyber-dark/80 border border-cyber-blue/50 rounded-lg flex items-center justify-center box-glow cursor-pointer hover:scale-110 transition-transform">
            <span className="text-2xl text-cyber-blue">$</span>
          </div>
          <div className="w-12 h-12 bg-cyber-dark/80 border border-cyber-blue/50 rounded-lg flex items-center justify-center box-glow cursor-pointer hover:scale-110 transition-transform">
            <svg
              className="w-6 h-6 text-cyber-blue"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-cyber-dark/80 border border-cyber-blue/50 rounded-lg flex items-center justify-center box-glow cursor-pointer hover:scale-110 transition-transform">
            <svg
              className="w-6 h-6 text-cyber-blue"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-cyber-dark/80 border border-cyber-blue/50 rounded-lg flex items-center justify-center box-glow cursor-pointer hover:scale-110 transition-transform">
            <svg
              className="w-6 h-6 text-cyber-blue"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-cyber-dark/80 border border-cyber-blue/50 rounded-lg flex items-center justify-center box-glow cursor-pointer hover:scale-110 transition-transform">
            <svg
              className="w-6 h-6 text-cyber-blue"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-center relative z-20">
          {/* LEFT SIDE - THREAT STREAM */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-sm font-mono text-cyber-orange tracking-widest mb-2">
                // REAL-TIME THREAT STREAM
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-cyber-orange to-transparent"></div>
            </div>

            {/* Threat Stream Panel - REVERSED ORDER (newest at bottom) */}
            <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-xl p-6 box-glow scanline">
              <div className="space-y-3 flex flex-col-reverse">
                {threatData.map((threat, index) => (
                  <div
                    key={threat.id}
                    className="flex items-center justify-between p-3 bg-cyber-dark/50 rounded-lg border-l-4 border-cyber-orange threat-slide-up"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            threat.severity === "CRITICAL"
                              ? "bg-red-500"
                              : threat.severity === "HIGH"
                                ? "bg-orange-500"
                                : "bg-yellow-500"
                          } animate-pulse`}
                        ></span>
                        <span className="text-xs font-mono text-cyber-orange">
                          {threat.type}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {threat.ip}:{threat.port} • {threat.timestamp}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyber-blue">
                      {threat.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-xl p-4 box-glow"
                >
                  <div className="text-2xl font-bold text-cyber-blue mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER - SHIELD */}
          <div className="lg:col-span-6 relative">
            {/* CENTER - Main Logo Shield */}
            <div className="relative flex items-center justify-center py-12">
              {/* EXTREME MASSIVE Glows - MATCHING VIDEO */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[900px] h-[900px] bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-500 blur-[200px] opacity-50 animate-pulse-slow"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-[700px] h-[700px] bg-gradient-to-t from-red-500 via-orange-400 to-transparent blur-[150px] opacity-60 animate-pulse"
                  style={{ animationDuration: "3s", animationDelay: "0.5s" }}
                ></div>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div
                  className="w-[600px] h-[600px] bg-cyan-300 blur-[180px] opacity-50 animate-pulse"
                  style={{ animationDuration: "2s" }}
                ></div>
              </div>

              {/* Additional intense bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <div
                  className="w-[500px] h-[300px] bg-gradient-to-t from-orange-500 to-transparent blur-[120px] opacity-60 animate-pulse"
                  style={{ animationDuration: "2.5s" }}
                ></div>
              </div>

              {/* Shield SVG */}
              <div className="relative z-10">
                <svg
                  width="450"
                  height="500"
                  viewBox="0 0 450 500"
                  className="drop-shadow-2xl"
                >
                  <defs>
                    <filter
                      id="glow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Shield Shape - TRANSPARENT with INTENSE glow */}
                  <path
                    d="M 225 50 L 360 110 L 360 250 C 360 340 310 410 225 480 C 140 410 90 340 90 250 L 90 110 Z"
                    fill="none"
                    stroke="#00d9ff"
                    strokeWidth="6"
                    filter="url(#glow)"
                    className="animate-pulse"
                    style={{
                      animationDuration: "4s",
                      filter:
                        "drop-shadow(0 0 30px #00d9ff) drop-shadow(0 0 60px #00d9ff)",
                    }}
                  />
                  {/* Bs Text with INTENSE glow */}
                  <text
                    x="225"
                    y="310"
                    fontSize="190"
                    fontWeight="900"
                    fill="white"
                    textAnchor="middle"
                    fontFamily="monospace"
                    filter="url(#glow)"
                    style={{
                      filter:
                        "drop-shadow(0 0 40px white) drop-shadow(0 0 80px white)",
                    }}
                  >
                    Bs
                  </text>
                  {/* Orange Arrow - Top Right */}
                  <g
                    className="animate-pulse"
                    style={{ animationDelay: "0.3s", animationDuration: "2s" }}
                  >
                    <path
                      d="M 320 120 L 390 70 L 405 145 Z"
                      fill="#ff6b35"
                      filter="url(#glow)"
                    />
                    <line
                      x1="320"
                      y1="120"
                      x2="390"
                      y2="70"
                      stroke="#ff6b35"
                      strokeWidth="4"
                      opacity="0.7"
                    />
                  </g>
                  {/* Red Arrow - Bottom Left */}
                  {/* <g
                    className="animate-pulse"
                    style={{ animationDelay: "0.8s", animationDuration: "2s" }}
                  >
                    <path
                      d="M 110 340 L 40 395 L 80 315 Z"
                      fill="#ff3366"
                      filter="url(#glow)"
                    />
                    <line
                      x1="110"
                      y1="340"
                      x2="40"
                      y2="395"
                      stroke="#ff3366"
                      strokeWidth="4"
                      opacity="0.7"
                    />
                  </g>
                  {/* Microchip Icon */}
                  <g
                    transform="translate(340, 250)"
                    className="animate-pulse"
                    style={{ animationDuration: "1.8s" }}
                  >
                    <rect
                      width="38"
                      height="38"
                      fill="#1a2332"
                      stroke="#00f3ff"
                      strokeWidth="2"
                      rx="4"
                    />
                    <rect
                      x="8"
                      y="8"
                      width="22"
                      height="22"
                      fill="#0a0e27"
                      stroke="#00f3ff"
                      strokeWidth="1.5"
                    />
                    {[9, 15, 21, 27].map((y) => (
                      <g key={y}>
                        <line
                          x1="0"
                          y1={y}
                          x2="8"
                          y2={y}
                          stroke="#00f3ff"
                          strokeWidth="2"
                        />
                        <line
                          x1="30"
                          y1={y}
                          x2="38"
                          y2={y}
                          stroke="#00f3ff"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                  </g>
                </svg>

                {/* Rotating Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-[450px] h-[450px] border-2 border-cyan-400/30 rounded-full animate-spin"
                    style={{ animationDuration: "30s" }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-[400px] h-[400px] border border-orange-400/20 rounded-full animate-spin"
                    style={{
                      animationDuration: "20s",
                      animationDirection: "reverse",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* BOTTOM - Bar Charts */}
            <div className="flex items-end justify-center gap-12 mt-8">
              <div className="text-center">
                <div
                  className="w-24 rounded-t-xl bg-gradient-to-t from-cyan-500 via-blue-400 to-cyan-300 transition-all duration-1000 shadow-[0_0_40px_rgba(0,243,255,0.9)]"
                  style={{ height: `${barHeights[0]}px` }}
                ></div>
              </div>
              <div className="text-center">
                <div
                  className="w-24 rounded-t-xl bg-gradient-to-t from-orange-600 via-orange-500 to-orange-400 transition-all duration-1000 shadow-[0_0_40px_rgba(255,107,53,0.9)]"
                  style={{ height: `${barHeights[1]}px` }}
                ></div>
              </div>
              <div className="text-center">
                <div
                  className="w-24 rounded-t-xl bg-gradient-to-t from-cyan-500 via-blue-400 to-cyan-300 transition-all duration-1000 shadow-[0_0_40px_rgba(0,243,255,0.9)]"
                  style={{ height: `${barHeights[2]}px` }}
                ></div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 font-mono tracking-wider">
                // CTRL+CRACKED. ACTIVE GRANTS:0+/6
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - FLOATING HEXAGONS - EXACT VIDEO POSITIONING */}
          <div className="lg:col-span-3 relative min-h-[600px]">
            <svg width="100%" height="600" viewBox="0 0 350 600">
              <defs>
                <filter id="hexGlow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Hexagons positioned to match video */}
              {[
                { x: 180, y: 100, num: "135" }, // Top
                { x: 280, y: 150, num: "132" }, // Top right
                { x: 100, y: 200, num: "176" }, // Middle left
                { x: 280, y: 280, num: "128" }, // Middle right
                { x: 160, y: 400, num: "118" }, // Bottom left
                { x: 280, y: 500, num: "167" }, // Bottom right
              ].map((hex, i) => (
                <g
                  key={i}
                  className="hex-float"
                  style={{ animationDelay: `${i * 0.3}s` }}
                  filter="url(#hexGlow)"
                >
                  <polygon
                    points={`${hex.x},${hex.y - 45} ${hex.x + 40},${hex.y - 23} ${hex.x + 40},${hex.y + 23} ${hex.x},${hex.y + 45} ${hex.x - 40},${hex.y + 23} ${hex.x - 40},${hex.y - 23}`}
                    fill="rgba(255, 107, 53, 0.25)"
                    stroke="#ff6b35"
                    strokeWidth="4"
                    style={{
                      filter: "drop-shadow(0 0 15px #ff6b35)",
                    }}
                  />
                  <text
                    x={hex.x}
                    y={hex.y + 8}
                    fill="#ff6b35"
                    fontSize="24"
                    fontWeight="800"
                    textAnchor="middle"
                    fontFamily="monospace"
                    style={{
                      filter: "drop-shadow(0 0 10px #ff6b35)",
                    }}
                  >
                    {hex.num}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float-heavy {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(15px, -40px);
          }
          50% {
            transform: translate(-15px, -80px);
          }
          75% {
            transform: translate(15px, -40px);
          }
        }

        @keyframes hex-float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-25px) scale(1.05);
            opacity: 0.85;
          }
        }

        @keyframes threat-slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .threat-slide-up {
          animation: threat-slide-up 0.5s ease-out;
        }

        .animate-float-heavy {
          animation: float-heavy 3s ease-in-out infinite;
        }

        .hex-float {
          animation: hex-float 2.5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .box-glow {
          box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
        }

        .scanline {
          position: relative;
          overflow: hidden;
        }

        .scanline::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(0, 243, 255, 0.5);
          animation: scan 3s linear infinite;
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(300px);
          }
        }
      `}</style>
    </main>
  );
}
