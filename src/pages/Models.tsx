import { Cpu, Brain, TrendingUp, Activity, CheckCircle } from 'lucide-react';
import { models } from '@/data/mockData';

export default function Models() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="glass-card p-6 border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-transparent animate-slide-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-primary-500/15 border border-primary-500/20">
            <Brain className="w-7 h-7 text-primary-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">AI Model Information</h2>
            <p className="text-ink-400 text-sm">Machine learning models powering consumption predictions</p>
          </div>
        </div>
        <p className="text-ink-500 text-xs mt-3 italic">
          The following are model evaluation metrics (MAE, RMSE, MAPE) computed on historical data. They describe how well each model fit the test set — not a guarantee of future prediction accuracy.
        </p>
      </div>

      {/* Model cards */}
      <div className="grid lg:grid-cols-3 gap-4">
        {models.map((model, i) => (
          <div
            key={i}
            className={`glass-card p-6 animate-slide-up transition-all hover:scale-[1.02] ${
              model.selected ? 'border-accent-500/30 glow-border' : 'border-ink-800/60'
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${model.selected ? 'bg-accent-500/10 border border-accent-500/20' : 'bg-ink-800/40'}`}>
                <Cpu className={`w-6 h-6 ${model.selected ? 'text-accent-400' : 'text-ink-400'}`} />
              </div>
              {model.selected && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-500/15 text-accent-400 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Selected
                </span>
              )}
            </div>
            <h3 className="text-white font-semibold text-lg">{model.name}</h3>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-ink-800/60 text-ink-400 text-xs font-medium">
              {model.type}
            </span>
            <p className="text-ink-400 text-sm mt-3 leading-relaxed">{model.description}</p>

            {/* Metrics */}
            <div className="mt-5 pt-4 border-t border-ink-800/60 space-y-3">
              <p className="text-ink-500 text-xs font-medium uppercase tracking-wide">Evaluation Metrics</p>
              <MetricBar label="MAE" value={model.mae} max={0.5} unit="" color="primary" />
              <MetricBar label="RMSE" value={model.rmse} max={0.7} unit="" color="warning" />
              <MetricBar label="MAPE" value={model.mape} max={10} unit="%" color="accent" />
            </div>
          </div>
        ))}
      </div>

      {/* Metrics explanation */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary-400" />
          <h3 className="text-white font-semibold">Understanding the Metrics</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-ink-800/40 border border-ink-700/50">
            <h4 className="text-primary-400 font-semibold text-sm">MAE — Mean Absolute Error</h4>
            <p className="text-ink-400 text-xs mt-2 leading-relaxed">
              Average magnitude of prediction errors, without considering direction. Lower is better.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-ink-800/40 border border-ink-700/50">
            <h4 className="text-warning-400 font-semibold text-sm">RMSE — Root Mean Square Error</h4>
            <p className="text-ink-400 text-xs mt-2 leading-relaxed">
              Square root of average squared errors. Penalizes larger errors more heavily. Lower is better.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-ink-800/40 border border-ink-700/50">
            <h4 className="text-accent-400 font-semibold text-sm">MAPE — Mean Absolute Percentage Error</h4>
            <p className="text-ink-400 text-xs mt-2 leading-relaxed">
              Average percentage difference between predicted and actual values. Lower is better.
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-warning-500/10 border border-warning-500/20">
          <div className="flex gap-2">
            <TrendingUp className="w-4 h-4 text-warning-400 shrink-0 mt-0.5" />
            <p className="text-ink-400 text-xs leading-relaxed">
              These metrics are computed on historical test data and describe model fit quality. They are not a guarantee of future prediction accuracy. Actual prediction performance may vary based on changing consumption patterns and external factors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  max,
  unit,
  color,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: 'primary' | 'warning' | 'accent';
}) {
  const pct = Math.min(100, (value / max) * 100);
  const colorMap = {
    primary: 'from-primary-500 to-primary-400',
    warning: 'from-warning-500 to-warning-400',
    accent: 'from-accent-500 to-accent-400',
  };
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-ink-400">{label}</span>
        <span className="text-white font-semibold">{value}{unit}</span>
      </div>
      <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
