interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaUp?: boolean;
  icon: React.ReactNode;
  accent?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export default function StatCard({ label, value, delta, deltaUp, icon, accent = 'primary' }: StatCardProps) {
  const accentMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error:   'bg-error/10 text-error',
    info:    'bg-info/10 text-info',
  };

  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accentMap[accent]}`}>
          {icon}
        </div>
        {delta && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            deltaUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            {deltaUp ? '↑' : '↓'} {delta}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-ink">{value}</p>
        <p className="text-sm text-ink-muted mt-0.5">{label}</p>
      </div>
    </div>
  );
}
