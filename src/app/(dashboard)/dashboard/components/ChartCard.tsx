import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  legend?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({ title, subtitle, headerRight, legend, children }: ChartCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-muted/80 backdrop-blur-sm p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      {/* header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
          {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
        {headerRight}
      </div>

      {/* contenido */}
      {children}

      {/* leyenda */}
      {legend && <div className="mt-1">{legend}</div>}
    </div>
  );
}
