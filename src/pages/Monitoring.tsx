import { useState, useEffect } from 'react';
import { Radio, Zap, Activity, Gauge, Database, Wifi, Cpu, LineChart, ArrowRight } from 'lucide-react';
import { generateRealtimeReadings } from '@/data/mockData';
import type { Reading } from '@/types';

const pipelineSteps = [
  { icon: Radio, label: 'Energy Sensor', desc: 'Measures V, A, W, kWh, PF' },
  { icon: Wifi, label: 'ESP32', desc: 'WiFi-enabled IoT gateway' },
  { icon: Database, label: 'API + Database', desc: 'Stores sensor readings' },
  { icon: Cpu, label: 'AI Model', desc: 'LSTM prediction engine' },
  { icon: LineChart, label: 'Dashboard', desc: 'Real-time visualization' },
];

export default function Monitoring() {
  const [readings, setReadings] = useState<Reading[]>(() => generateRealtimeReadings(10));
  const [live, setLive] = useState<Reading | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const base = hour >= 6 && hour <= 22 ? 2.5 + Math.sin((hour / 24) * Math.PI * 2) * 1.5 : 1.0;
      const noise = (Math.random() - 0.5) * 0.4;
      const power = Math.max(0.3, base + noise);
      const voltage = 230 + (Math.random() - 0.5) * 6;
      const current = power / voltage;
      const pf = 0.85 + Math.random() * 0.12;
      const reading: Reading = {
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        voltage: Math.round(voltage * 10) / 10,
        current: Math.round(current * 1000) / 1000,
        power: Math.round(power * 100) / 100,
        energy: Math.round(power * 100) / 100,
        powerFactor: Math.round(pf * 100) / 100,
      };
      setLive(reading);
      setReadings((prev) => [...prev.slice(1), reading]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentReading = live || readings[readings.length - 1];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* IoT Architecture */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
            <Activity className="w-5 h-5 text-primary-400" />
          </div>
          <h2 className="text-white font-semibold">IoT Architecture</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {pipelineSteps.map((step, i) => (
            <div key={i} className="relative">
              <div className="glass-card p-4 text-center hover:border-primary-500/30 transition-all h-full">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20 inline-block">
                  <step.icon className="w-6 h-6 text-primary-400" />
                </div>
                <p className="mt-2 text-white font-semibold text-xs">{step.label}</p>
                <p className="text-ink-500 text-[10px] mt-0.5">{step.desc}</p>
              </div>
              {i < pipelineSteps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-2.5 -translate-y-1/2 text-primary-500/40 z-10 bg-ink-950 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live sensor cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <SensorCard icon={Zap} label="Voltage" value={`${currentReading.voltage} V`} color="primary" />
        <SensorCard icon={Activity} label="Current" value={`${currentReading.current} A`} color="accent" />
        <SensorCard icon={Gauge} label="Active Power" value={`${currentReading.power} kW`} color="warning" />
        <SensorCard icon={Database} label="Energy" value={`${currentReading.energy} kWh`} color="primary" />
        <SensorCard icon={Cpu} label="Power Factor" value={currentReading.powerFactor.toString()} color="accent" />
        <SensorCard icon={Radio} label="Timestamp" value={currentReading.time} color="warning" />
      </div>

      {/* Live data table */}
      <div className="glass-card p-5 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary-400" />
            <h3 className="text-white font-semibold text-sm">Live Sensor Data Stream</h3>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-500/15 text-accent-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Live
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-ink-500 text-xs border-b border-ink-800/60">
                <th className="text-left py-2.5 px-3 font-medium">Timestamp</th>
                <th className="text-right py-2.5 px-3 font-medium">Voltage (V)</th>
                <th className="text-right py-2.5 px-3 font-medium">Current (A)</th>
                <th className="text-right py-2.5 px-3 font-medium">Power (kW)</th>
                <th className="text-right py-2.5 px-3 font-medium">Energy (kWh)</th>
                <th className="text-right py-2.5 px-3 font-medium">PF</th>
              </tr>
            </thead>
            <tbody>
              {[...readings].reverse().map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-ink-800/40 hover:bg-ink-800/30 transition-colors"
                >
                  <td className="py-2.5 px-3 text-ink-400 font-mono text-xs">{r.time}</td>
                  <td className="py-2.5 px-3 text-right text-white font-medium">{r.voltage}</td>
                  <td className="py-2.5 px-3 text-right text-white font-medium">{r.current}</td>
                  <td className="py-2.5 px-3 text-right text-primary-400 font-medium">{r.power}</td>
                  <td className="py-2.5 px-3 text-right text-accent-400 font-medium">{r.energy}</td>
                  <td className="py-2.5 px-3 text-right text-white font-medium">{r.powerFactor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-ink-600 text-xs">
          Data is simulated in Demo Mode. Connect an ESP32 to stream real sensor readings through the API endpoint.
        </p>
      </div>
    </div>
  );
}

function SensorCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  color: 'primary' | 'accent' | 'warning';
}) {
  const colorMap = {
    primary: 'border-primary-500/20 text-primary-400 bg-primary-500/10',
    accent: 'border-accent-500/20 text-accent-400 bg-accent-500/10',
    warning: 'border-warning-500/20 text-warning-400 bg-warning-500/10',
  };
  return (
    <div className={`glass-card p-5 ${colorMap[color]} border animate-slide-up`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-ink-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1 font-mono">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]} border`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
