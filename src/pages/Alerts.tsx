import { useState } from 'react';
import { AlertTriangle, TrendingUp, Activity, Wallet, CheckCircle, Bell } from 'lucide-react';
import { alerts as initialAlerts } from '@/data/mockData';
import type { Alert } from '@/types';

const severityConfig = {
  high: { color: 'danger', bg: 'bg-danger-500/15', border: 'border-danger-500/30', text: 'text-danger-400', dot: 'bg-danger-500' },
  medium: { color: 'warning', bg: 'bg-warning-500/15', border: 'border-warning-500/30', text: 'text-warning-400', dot: 'bg-warning-500' },
  low: { color: 'accent', bg: 'bg-accent-500/15', border: 'border-accent-500/30', text: 'text-accent-400', dot: 'bg-accent-500' },
};

const typeIcons: Record<Alert['type'], typeof AlertTriangle> = {
  'high-consumption': Activity,
  'peak-demand': TrendingUp,
  'unusual': AlertTriangle,
  'bill-increase': Wallet,
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.severity === filter);

  const dismiss = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const dismissAll = () => setAlerts([]);

  const counts = {
    high: alerts.filter((a) => a.severity === 'high').length,
    medium: alerts.filter((a) => a.severity === 'medium').length,
    low: alerts.filter((a) => a.severity === 'low').length,
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {(['high', 'medium', 'low'] as const).map((sev) => {
          const cfg = severityConfig[sev];
          return (
            <div key={sev} className={`glass-card p-5 ${cfg.border} ${cfg.bg} animate-slide-up`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-3xl font-bold ${cfg.text}`}>{counts[sev]}</p>
                  <p className="text-ink-400 text-sm capitalize mt-1">{sev} Severity</p>
                </div>
                <div className={`p-3 rounded-xl ${cfg.bg} ${cfg.border} border`}>
                  <AlertTriangle className={`w-6 h-6 ${cfg.text}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter + dismiss */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary-400" />
          <h2 className="text-white font-semibold">Alert Panel</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 rounded-lg bg-ink-800/60">
            {(['all', 'high', 'medium', 'low'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                  filter === f ? 'bg-primary-500 text-white' : 'text-ink-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={dismissAll}
            className="px-3 py-1.5 rounded-lg bg-ink-800/60 text-ink-400 hover:text-white text-xs font-medium transition-colors"
          >
            Dismiss All
          </button>
        </div>
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <CheckCircle className="w-12 h-12 text-accent-400 mx-auto mb-3" />
            <p className="text-white font-semibold">All Clear</p>
            <p className="text-ink-400 text-sm mt-1">No alerts matching this filter.</p>
          </div>
        ) : (
          filtered.map((alert) => {
            const cfg = severityConfig[alert.severity];
            const Icon = typeIcons[alert.type];
            return (
              <div
                key={alert.id}
                className={`glass-card p-4 ${cfg.border} ${cfg.bg} animate-slide-up hover:scale-[1.01] transition-transform`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${cfg.bg} ${cfg.border} border shrink-0`}>
                    <Icon className={`w-5 h-5 ${cfg.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-semibold text-sm">{alert.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-ink-400 text-sm mt-1">{alert.message}</p>
                    <p className="text-ink-600 text-xs mt-2">{alert.timestamp}</p>
                  </div>
                  <button
                    onClick={() => dismiss(alert.id)}
                    className="text-ink-500 hover:text-white transition-colors shrink-0 p-1"
                    aria-label="Dismiss alert"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
