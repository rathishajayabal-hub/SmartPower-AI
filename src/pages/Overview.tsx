import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import {
  currentPower,
  todayConsumption,
  predictedNextHour,
  estimatedMonthlyBill,
  peakRisk,
  generateRealtimeReadings,
  generateConsumptionData,
  generatePeakHourData,
  generateBarData,
  alerts,
} from '@/data/mockData';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#e2e8f0',
};

export default function Overview() {
  const [readings, setReadings] = useState(() => generateRealtimeReadings(24));
  const [consumptionData] = useState(() => generateConsumptionData(7));
  const [peakData] = useState(() => generatePeakHourData());
  const [barPeriod, setBarPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [barData, setBarData] = useState(() => generateBarData('weekly'));

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings((prev) => {
        const now = new Date();
        const hour = now.getHours();
        const base = hour >= 6 && hour <= 22 ? 2.5 + Math.sin((hour / 24) * Math.PI * 2) * 1.5 : 1.0;
        const noise = (Math.random() - 0.5) * 0.4;
        const power = Math.max(0.3, base + noise);
        const voltage = 230 + (Math.random() - 0.5) * 6;
        const current = power / voltage;
        const pf = 0.85 + Math.random() * 0.12;
        const newReading = {
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          voltage: Math.round(voltage * 10) / 10,
          current: Math.round(current * 1000) / 1000,
          power: Math.round(power * 100) / 100,
          energy: Math.round(power * 100) / 100,
          powerFactor: Math.round(pf * 100) / 100,
        };
        return [...prev.slice(1), newReading];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setBarData(generateBarData(barPeriod));
  }, [barPeriod]);

  const peakColor = peakRisk === 'HIGH' ? 'danger' : peakRisk === 'MEDIUM' ? 'warning' : 'accent';

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Current Power" value={`${currentPower} kW`} icon="power" trend="12%" trendUp accent="primary" />
        <StatCard title="Today's Consumption" value={`${todayConsumption} kWh`} icon="consumption" trend="8%" trendUp accent="accent" />
        <StatCard title="Predicted Next Hour" value={`${predictedNextHour} kWh`} icon="predicted" trend="5%" trendUp accent="warning" />
        <StatCard title="Est. Monthly Bill" value={`₹${estimatedMonthlyBill}`} icon="bill" trend="12%" trendUp accent="primary" />
        <StatCard title="Peak Risk" value={peakRisk} icon="peak" accent={peakColor as 'primary' | 'accent' | 'warning' | 'danger'} />
      </div>

      {/* Real-time consumption */}
      <ChartCard title="Real-Time Electricity Consumption" subtitle="Live power draw updated every 5 seconds">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={readings}>
            <defs>
              <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#33a0ff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#33a0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} unit="kW" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="power"
              stroke="#33a0ff"
              strokeWidth={2}
              fill="url(#powerGrad)"
              name="Power (kW)"
              isAnimationActive={true}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Actual vs Predicted */}
      <ChartCard title="Actual vs Predicted Consumption" subtitle="Last 7 days comparison">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={consumptionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kWh" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Actual" />
            <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} strokeDasharray="5 5" name="Predicted" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Bar chart + Peak hour */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard
          title="Consumption Breakdown"
          subtitle="Daily / weekly / monthly view"
          action={
            <div className="flex gap-1 p-1 rounded-lg bg-ink-800/60">
              {(['daily', 'weekly', 'monthly'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setBarPeriod(p)}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                    barPeriod === p ? 'bg-primary-500 text-white' : 'text-ink-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" stroke="#475569" fontSize={10} tickLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kWh" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
              <Bar dataKey="value" fill="#33a0ff" radius={[6, 6, 0, 0]} name="Consumption (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak-Hour Analysis" subtitle="Consumption by time of day">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={peakData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#475569" fontSize={11} tickLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kW" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
              <Bar dataKey="consumption" radius={[6, 6, 0, 0]} name="Peak Load (kW)">
                {peakData.map((entry, i) => (
                  <Cell key={i} fill={entry.consumption > 3 ? '#ef4444' : entry.consumption > 2 ? '#f59e0b' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent alerts preview */}
      <ChartCard title="Recent Alerts" subtitle="Latest smart alerts">
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-ink-800/40 border border-ink-700/50 hover:border-ink-600 transition-colors"
            >
              <span
                className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                  alert.severity === 'high' ? 'bg-danger-500' : alert.severity === 'medium' ? 'bg-warning-500' : 'bg-accent-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{alert.title}</p>
                <p className="text-ink-400 text-xs mt-0.5">{alert.message}</p>
              </div>
              <span className="text-ink-600 text-xs shrink-0">{alert.timestamp}</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}


