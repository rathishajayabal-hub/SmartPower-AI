import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Brain, Sparkles, TrendingUp, Activity, Zap } from 'lucide-react';
import ChartCard from '@/components/ChartCard';
import { generateHourlyConsumption, predictForHorizon, recommendations } from '@/data/mockData';

type Horizon = 'hour' | 'today' | 'tomorrow' | 'week';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#e2e8f0',
};

const horizons: { key: Horizon; label: string }[] = [
  { key: 'hour', label: 'Next Hour' },
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
  { key: 'week', label: 'Next 7 Days' },
];

export default function Prediction() {
  const [horizon, setHorizon] = useState<Horizon>('hour');
  const prediction = predictForHorizon(horizon);
  const hourlyData = generateHourlyConsumption();

  const peakHours = hourlyData.filter((d) => d.predicted > 3).map((d) => d.time);
  const peakRange = peakHours.length > 0 ? `${peakHours[0]} - ${peakHours[peakHours.length - 1]}` : '7 PM - 9 PM';

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Horizon selector */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="w-5 h-5 text-primary-400" />
          <h2 className="text-white font-semibold text-sm">Prediction Horizon</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {horizons.map((h) => (
            <button
              key={h.key}
              onClick={() => setHorizon(h.key)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                horizon === h.key
                  ? 'bg-primary-500 text-white glow-border'
                  : 'bg-ink-800/50 text-ink-400 hover:text-white hover:bg-ink-800'
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prediction result */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="glass-card p-6 border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-transparent animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary-400" />
            <p className="text-ink-400 text-sm font-medium">Predicted Consumption</p>
          </div>
          <p className="text-4xl font-bold text-white">{prediction.value}</p>
          <p className="text-primary-400 text-lg font-semibold mt-1">{prediction.unit}</p>
          <p className="text-ink-500 text-xs mt-2">{prediction.label}</p>
        </div>

        <div className="glass-card p-6 border-accent-500/20 bg-gradient-to-br from-accent-500/10 to-transparent animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-accent-400" />
            <p className="text-ink-400 text-sm font-medium">Confidence Score</p>
          </div>
          <p className="text-4xl font-bold text-white">{prediction.confidence}%</p>
          <div className="mt-3 h-2 rounded-full bg-ink-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400 transition-all duration-700"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
          <p className="text-ink-500 text-xs mt-2">Model evaluation confidence</p>
        </div>

        <div className="glass-card p-6 border-warning-500/20 bg-gradient-to-br from-warning-500/10 to-transparent animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-warning-400" />
            <p className="text-ink-400 text-sm font-medium">Peak Demand Prediction</p>
          </div>
          <p className="text-4xl font-bold text-white">4.2 kW</p>
          <p className="text-warning-400 text-sm font-semibold mt-1">{peakRange}</p>
          <p className="text-ink-500 text-xs mt-2">Expected peak load window</p>
        </div>
      </div>

      {/* Actual vs Predicted graph */}
      <ChartCard title="Actual vs Predicted — 24-Hour Forecast" subtitle="Hourly consumption comparison">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} interval={2} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kWh" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2.5} dot={false} name="Actual" />
            <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2.5} dot={false} strokeDasharray="5 5" name="Predicted" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Peak demand prediction */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Peak Demand Forecast" subtitle="Predicted load distribution by hour">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} interval={2} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kW" />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={2} fill="url(#peakGrad)" name="Predicted Load" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* AI Recommendation */}
        <div className="glass-card p-6 animate-slide-up border-accent-500/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-accent-500/15 border border-accent-500/20">
              <Sparkles className="w-5 h-5 text-accent-400" />
            </div>
            <h3 className="text-white font-semibold">AI-Generated Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex gap-3 p-3.5 rounded-xl bg-ink-800/40 border border-ink-700/50 hover:border-accent-500/30 transition-colors"
              >
                <span className="text-accent-400 text-sm font-bold shrink-0">{i + 1}.</span>
                <p className="text-ink-300 text-sm leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-ink-600 text-xs italic">
            Recommendations are AI-generated suggestions based on usage patterns. They do not guarantee specific monetary savings.
          </p>
        </div>
      </div>
    </div>
  );
}
