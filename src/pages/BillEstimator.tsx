import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Calculator, Wallet, TrendingUp } from 'lucide-react';
import ChartCard from '@/components/ChartCard';
import { tariffs, calculateBill, generateBarData } from '@/data/mockData';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#e2e8f0',
};

export default function BillEstimator() {
  const [units, setUnits] = useState(250);
  const [tariffIndex, setTariffIndex] = useState(2);
  const tariff = tariffs[tariffIndex];
  const bill = calculateBill(units, tariff);
  const trendData = generateBarData('monthly');

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input form */}
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
              <Calculator className="w-5 h-5 text-primary-400" />
            </div>
            <h2 className="text-white font-semibold">Bill Estimator</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-ink-400 text-sm font-medium block mb-2">Consumed Units (kWh)</label>
              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 rounded-xl bg-ink-800/60 border border-ink-700 text-white text-lg font-semibold focus:border-primary-500 focus:outline-none transition-colors"
                min={0}
              />
              <input
                type="range"
                value={units}
                onChange={(e) => setUnits(parseInt(e.target.value))}
                min={0}
                max={1000}
                step={10}
                className="w-full mt-3 accent-primary-500"
              />
              <div className="flex justify-between text-xs text-ink-600 mt-1">
                <span>0 kWh</span>
                <span>1000 kWh</span>
              </div>
            </div>

            <div>
              <label className="text-ink-400 text-sm font-medium block mb-2">Select Tariff</label>
              <div className="space-y-2">
                {tariffs.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTariffIndex(i)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      tariffIndex === i
                        ? 'bg-primary-500/15 border-primary-500/40 text-white'
                        : 'bg-ink-800/40 border-ink-700/50 text-ink-400 hover:border-ink-600'
                    }`}
                  >
                    <div className="text-left">
                      <span className="font-medium text-sm">{t.name} — {t.slab}</span>
                      <span className="block text-xs text-ink-500">₹{t.rate}/kWh + ₹{t.fixedCharge} fixed</span>
                    </div>
                    <span className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      tariffIndex === i ? 'border-primary-400 bg-primary-400' : 'border-ink-600'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-4">
          <div className="glass-card p-6 border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-transparent animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5 text-primary-400" />
              <p className="text-ink-400 text-sm font-medium">Estimated Bill</p>
            </div>
            <p className="text-5xl font-bold text-white">₹{bill.toLocaleString('en-IN')}</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-500">Energy Charge ({units} × ₹{tariff.rate})</span>
                <span className="text-white font-medium">₹{(units * tariff.rate).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Fixed Charge</span>
                <span className="text-white font-medium">₹{tariff.fixedCharge}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-ink-800/60">
                <span className="text-ink-400 font-medium">Total</span>
                <span className="text-primary-400 font-bold text-lg">₹{bill.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p className="mt-4 text-ink-600 text-xs italic">
              This is an estimated bill based on the selected tariff. Actual charges may vary.
            </p>
          </div>

          <div className="glass-card p-5 border-accent-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent-400" />
              <p className="text-ink-400 text-sm font-medium">Cost Breakdown</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-ink-500 text-xs">Per kWh</p>
                <p className="text-white font-bold mt-1">₹{tariff.rate}</p>
              </div>
              <div>
                <p className="text-ink-500 text-xs">Daily Avg</p>
                <p className="text-white font-bold mt-1">₹{Math.round(bill / 30)}</p>
              </div>
              <div>
                <p className="text-ink-500 text-xs">Units</p>
                <p className="text-white font-bold mt-1">{units}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consumption trend */}
      <ChartCard title="Consumption Trend" subtitle="Last 30 days consumption pattern">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="billGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#33a0ff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#33a0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="label" stroke="#475569" fontSize={10} tickLine={false} interval={4} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} unit=" kWh" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" stroke="#33a0ff" strokeWidth={2} fill="url(#billGrad)" name="Consumption (kWh)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
