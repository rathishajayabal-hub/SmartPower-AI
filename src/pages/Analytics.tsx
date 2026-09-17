import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import ChartCard from '@/components/ChartCard';
import { generateBarData, generateHourlyConsumption, generateConsumptionData, generatePeakHourData } from '@/data/mockData';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#e2e8f0',
};

const PIE_COLORS = ['#33a0ff', '#10b981', '#f59e0b', '#ef4444', '#8ed8ff'];

export default function Analytics() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [barData, setBarData] = useState(() => generateBarData('weekly'));
  const [hourlyData] = useState(() => generateHourlyConsumption());
  const [weekData] = useState(() => generateConsumptionData(7));
  const [peakData] = useState(() => generatePeakHourData());

  useEffect(() => {
    setBarData(generateBarData(period));
  }, [period]);

  const totalConsumption = barData.reduce((sum, d) => sum + d.value, 0);
  const avgConsumption = totalConsumption / barData.length;
  const maxConsumption = Math.max(...barData.map((d) => d.value));

  const distribution = [
    { name: 'Morning (6-12)', value: 28 },
    { name: 'Afternoon (12-18)', value: 22 },
    { name: 'Evening (18-22)', value: 35 },
    { name: 'Night (22-6)', value: 15 },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 border-primary-500/20">
          <p className="text-ink-400 text-sm">Total Consumption</p>
          <p className="text-2xl font-bold text-white mt-1">{totalConsumption.toFixed(1)} kWh</p>
        </div>
        <div className="glass-card p-4 border-accent-500/20">
          <p className="text-ink-400 text-sm">Average</p>
          <p className="text-2xl font-bold text-white mt-1">{avgConsumption.toFixed(1)} kWh</p>
        </div>
        <div className="glass-card p-4 border-warning-500/20">
          <p className="text-ink-400 text-sm">Peak Value</p>
          <p className="text-2xl font-bold text-white mt-1">{maxConsumption.toFixed(1)} kWh</p>
        </div>
        <div className="glass-card p-4 border-danger-500/20">
          <p className="text-ink-400 text-sm">Peak Hours</p>
          <p className="text-2xl font-bold text-white mt-1">7-9 PM</p>
        </div>
      </div>

      {/* Period selector + bar chart */}
      <ChartCard
        title="Consumption Analytics"
        subtitle="Detailed breakdown by period"
        action={
          <div className="flex gap-1 p-1 rounded-lg bg-ink-800/60">
            {(['daily', 'weekly', 'monthly'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                  period === p ? 'bg-primary-500 text-white' : 'text-ink-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="label" stroke="#475569" fontSize={10} tickLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kWh" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
            <Bar dataKey="value" fill="#33a0ff" radius={[6, 6, 0, 0]} name="Consumption (kWh)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Hourly trend + distribution */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Hourly Consumption Trend" subtitle="24-hour consumption pattern">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="hourlyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} interval={2} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kWh" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} fill="url(#hourlyGrad)" name="Consumption" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Time-of-Day Distribution" subtitle="Usage by time period">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {distribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Week comparison + peak */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Weekly Trend" subtitle="7-day actual vs predicted">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weekData}>
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

        <ChartCard title="Peak-Hour Analysis" subtitle="Load distribution across the day">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={peakData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#475569" fontSize={11} tickLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kW" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
              <Bar dataKey="consumption" radius={[6, 6, 0, 0]} name="Load (kW)">
                {peakData.map((entry, i) => (
                  <Cell key={i} fill={entry.consumption > 3 ? '#ef4444' : entry.consumption > 2 ? '#f59e0b' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
