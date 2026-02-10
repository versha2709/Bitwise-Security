'use client'

import { useEffect, useRef } from 'react'

interface FloatingElementProps {
  icon: string
  delay: number
  duration: number
  startX: number
  startY: number
}

const FloatingElement = ({ icon, delay, duration, startX, startY }: FloatingElementProps) => {
  return (
    <div
      className="absolute text-2xl opacity-30 animate-float"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {icon}
    </div>
  )
}

export default function FloatingIcons() {
  const icons = ['🔒', '🛡️', '⚔️', '🔐', '💻', '🔑', '⚡', '🎯']
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingElement
          key={i}
          icon={icons[i % icons.length]}
          delay={i * 0.5}
          duration={3 + (i % 3)}
          startX={Math.random() * 100}
          startY={Math.random() * 100}
        />
      ))}
    </div>
  )
}
