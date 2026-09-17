import { Zap, Gauge, TrendingUp, Wallet, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: 'power' | 'consumption' | 'predicted' | 'bill' | 'peak';
  trend?: string;
  trendUp?: boolean;
  accent?: 'primary' | 'accent' | 'warning' | 'danger';
}

const iconMap = {
  power: Zap,
  consumption: Gauge,
  predicted: TrendingUp,
  bill: Wallet,
  peak: AlertTriangle,
};

const accentMap = {
  primary: 'from-primary-500/20 to-primary-600/5 text-primary-400 border-primary-500/20',
  accent: 'from-accent-500/20 to-accent-600/5 text-accent-400 border-accent-500/20',
  warning: 'from-warning-500/20 to-warning-600/5 text-warning-400 border-warning-500/20',
  danger: 'from-danger-500/20 to-danger-600/5 text-danger-400 border-danger-500/20',
};

export default function StatCard({ title, value, icon, trend, trendUp, accent = 'primary' }: StatCardProps) {
  const Icon = iconMap[icon];
  const accentClass = accentMap[accent];

  return (
    <div className={`glass-card p-5 border bg-gradient-to-br ${accentClass} hover:scale-[1.02] transition-transform duration-300 animate-slide-up`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-ink-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2 text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${accentClass} border`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-sm">
          <span className={trendUp ? 'text-danger-400' : 'text-accent-400'}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-ink-500">vs last period</span>
        </div>
      )}
    </div>
  );
}
