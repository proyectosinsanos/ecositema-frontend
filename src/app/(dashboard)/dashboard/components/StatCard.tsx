'use client';

import { useRef, MouseEvent } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaUp?: boolean;
  icon: React.ReactNode;
  accent?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

const accentTokens = {
  primary: { icon: 'bg-primary/15 text-primary-dark', glow: 'rgba(189,210,84,0.25)', bar: '#bdd254' },
  success: { icon: 'bg-success/15 text-success',      glow: 'rgba(29,158,117,0.25)',  bar: '#1d9e75' },
  warning: { icon: 'bg-warning/15 text-warning',      glow: 'rgba(245,158,11,0.25)',  bar: '#f59e0b' },
  error:   { icon: 'bg-error/15 text-error',          glow: 'rgba(239,68,68,0.25)',   bar: '#ef4444' },
  info:    { icon: 'bg-info/15 text-info',            glow: 'rgba(66,97,121,0.25)',   bar: '#426179' },
};

export default function StatCard({ label, value, delta, deltaUp, icon, accent = 'primary' }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tokens  = accentTokens[accent];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-3px) scale(1.02)`;
    card.style.boxShadow = `0 16px 32px -8px ${tokens.glow}, 0 6px 12px -4px ${tokens.glow}`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition:       'transform 0.15s ease, box-shadow 0.15s ease',
        borderTopColor:   tokens.bar,
        borderTopWidth:   '2px',
      }}
      className="relative overflow-hidden rounded-2xl border border-line bg-surface-muted/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3 cursor-default shadow-md"
    >
      {/* brillo interior */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 15% 50%, ${tokens.glow.replace('0.25', '0.07')}, transparent 60%)` }}
      />

      {/* icono */}
      <div className={`relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${tokens.icon}`}>
        {icon}
      </div>

      {/* valor + label */}
      <div className="relative flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xl font-bold text-ink tracking-tight leading-none">{value}</span>
          {delta && (
            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full leading-none ${
              deltaUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
            }`}>
              {deltaUp ? '↑' : '↓'} {delta}
            </span>
          )}
        </div>
        <p className="text-[11px] text-ink-muted mt-1 font-medium uppercase tracking-wide truncate">{label}</p>
      </div>
    </div>
  );
}
