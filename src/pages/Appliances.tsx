import { useState } from 'react';
import {
  Wind,
  Snowflake,
  Fan,
  Lightbulb,
  Tv,
  Droplets,
  WashingMachine,
  Microwave,
  Power,
  Plus,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { appliances as initialAppliances } from '@/data/mockData';
import type { Appliance } from '@/types';

const iconMap: Record<string, typeof Wind> = {
  Wind,
  Snowflake,
  Fan,
  Lightbulb,
  Tv,
  Droplets,
  WashingMachine,
  Microwave,
};

export default function Appliances() {
  const [appliances, setAppliances] = useState<Appliance[]>(initialAppliances);

  const toggle = (id: string) =>
    setAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'on' ? 'off' : 'on' } : a))
    );

  const totalEnergy = appliances.filter((a) => a.status === 'on').reduce((s, a) => s + a.dailyEnergy, 0);
  const totalCost = appliances.filter((a) => a.status === 'on').reduce((s, a) => s + a.monthlyCost, 0);
  const activeCount = appliances.filter((a) => a.status === 'on').length;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 border-primary-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink-400 text-sm">Active Devices</p>
              <p className="text-2xl font-bold text-white mt-1">{activeCount} / {appliances.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <Power className="w-6 h-6 text-primary-400" />
            </div>
          </div>
        </div>
        <div className="glass-card p-5 border-accent-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink-400 text-sm">Daily Energy (Active)</p>
              <p className="text-2xl font-bold text-white mt-1">{totalEnergy.toFixed(1)} kWh</p>
            </div>
            <div className="p-3 rounded-xl bg-accent-500/10 border border-accent-500/20">
              <ToggleRight className="w-6 h-6 text-accent-400" />
            </div>
          </div>
        </div>
        <div className="glass-card p-5 border-warning-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink-400 text-sm">Monthly Cost (Active)</p>
              <p className="text-2xl font-bold text-white mt-1">₹{totalCost}</p>
            </div>
            <div className="p-3 rounded-xl bg-warning-500/10 border border-warning-500/20">
              <Plus className="w-6 h-6 text-warning-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Appliance cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliances.map((ap) => {
          const Icon = iconMap[ap.icon] || Power;
          const isOn = ap.status === 'on';
          return (
            <div
              key={ap.id}
              className={`glass-card p-5 animate-slide-up transition-all hover:scale-[1.02] ${
                isOn ? 'border-accent-500/20' : 'border-ink-800/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${isOn ? 'bg-accent-500/10 border border-accent-500/20' : 'bg-ink-800/40'}`}>
                  <Icon className={`w-6 h-6 ${isOn ? 'text-accent-400' : 'text-ink-500'}`} />
                </div>
                <button
                  onClick={() => toggle(ap.id)}
                  className="transition-colors"
                  aria-label={`Toggle ${ap.name}`}
                >
                  {isOn ? (
                    <ToggleRight className="w-8 h-8 text-accent-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-ink-600" />
                  )}
                </button>
              </div>
              <h3 className="text-white font-semibold">{ap.name}</h3>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Power Rating</span>
                  <span className="text-white font-medium">{ap.power} W</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Daily Usage</span>
                  <span className="text-white font-medium">{ap.dailyUsage} hrs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Daily Energy</span>
                  <span className="text-white font-medium">{ap.dailyEnergy} kWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Monthly Cost</span>
                  <span className="text-white font-medium">₹{ap.monthlyCost}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-800/60">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    isOn ? 'bg-accent-500/15 text-accent-400' : 'bg-ink-800/60 text-ink-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isOn ? 'bg-accent-400 animate-pulse' : 'bg-ink-600'}`} />
                  {isOn ? 'Running' : 'Off'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-ink-600 text-xs text-center">
        Consumption values are estimated from sample data. Actual usage may vary based on device model and settings.
      </p>
    </div>
  );
}
