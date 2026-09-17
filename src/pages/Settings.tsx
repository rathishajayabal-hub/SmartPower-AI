import { useState } from 'react';
import { Settings, Bell, Gauge, Wifi, Cpu, Save, ToggleLeft, ToggleRight } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [peakAlerts, setPeakAlerts] = useState(true);
  const [unusualAlerts, setUnusualAlerts] = useState(true);
  const [billAlerts, setBillAlerts] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [refreshRate, setRefreshRate] = useState(5);
  const [selectedModel, setSelectedModel] = useState('LSTM / GRU');

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
      {/* Notifications */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
            <Bell className="w-5 h-5 text-primary-400" />
          </div>
          <h2 className="text-white font-semibold">Notifications</h2>
        </div>
        <div className="space-y-1">
          <ToggleRow label="Enable All Notifications" desc="Master toggle for all alert notifications" value={notifications} onChange={setNotifications} />
          <ToggleRow label="Peak Demand Alerts" desc="Notify when peak demand is predicted" value={peakAlerts} onChange={setPeakAlerts} />
          <ToggleRow label="Unusual Consumption Alerts" desc="Notify on abnormal usage patterns" value={unusualAlerts} onChange={setUnusualAlerts} />
          <ToggleRow label="Bill Increase Alerts" desc="Notify when estimated bill rises significantly" value={billAlerts} onChange={setBillAlerts} />
        </div>
      </div>

      {/* Data & System */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-accent-500/10 border border-accent-500/20">
            <Gauge className="w-5 h-5 text-accent-400" />
          </div>
          <h2 className="text-white font-semibold">Data & System</h2>
        </div>
        <div className="space-y-5">
          <ToggleRow label="Demo Mode" desc="Use simulated data when real sensors are not connected" value={demoMode} onChange={setDemoMode} />

          <div>
            <label className="text-ink-300 text-sm font-medium block mb-2">Data Refresh Rate</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                value={refreshRate}
                onChange={(e) => setRefreshRate(parseInt(e.target.value))}
                min={1}
                max={30}
                className="flex-1 accent-primary-500"
              />
              <span className="text-white font-semibold text-sm w-20 text-right">{refreshRate}s</span>
            </div>
            <p className="text-ink-500 text-xs mt-1.5">How often the dashboard fetches new sensor data</p>
          </div>
        </div>
      </div>

      {/* AI Model */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-warning-500/10 border border-warning-500/20">
            <Cpu className="w-5 h-5 text-warning-400" />
          </div>
          <h2 className="text-white font-semibold">AI Model Selection</h2>
        </div>
        <div className="space-y-2">
          {['Linear Regression', 'Random Forest', 'LSTM / GRU'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModel(m)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                selectedModel === m
                  ? 'bg-primary-500/15 border-primary-500/40 text-white'
                  : 'bg-ink-800/40 border-ink-700/50 text-ink-400 hover:border-ink-600'
              }`}
            >
              <div className="text-left">
                <span className="font-medium text-sm">{m}</span>
                <span className="block text-xs text-ink-500 mt-0.5">
                  {m === 'Linear Regression' && 'Baseline prediction model'}
                  {m === 'Random Forest' && 'Nonlinear pattern recognition'}
                  {m === 'LSTM / GRU' && 'Time-series deep learning (recommended)'}
                </span>
              </div>
              <span className={`w-4 h-4 rounded-full border-2 transition-colors ${
                selectedModel === m ? 'border-primary-400 bg-primary-400' : 'border-ink-600'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* IoT Connection */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
            <Wifi className="w-5 h-5 text-primary-400" />
          </div>
          <h2 className="text-white font-semibold">IoT Device Connection</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-ink-300 text-sm font-medium block mb-2">ESP32 API Endpoint</label>
            <input
              type="text"
              defaultValue="https://api.smartpower-ai.com/v1/sensor/readings"
              className="w-full px-4 py-3 rounded-xl bg-ink-800/60 border border-ink-700 text-white text-sm focus:border-primary-500 focus:outline-none transition-colors font-mono"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-ink-300 text-sm font-medium block mb-2">Device ID</label>
              <input
                type="text"
                defaultValue="ESP32-001"
                className="w-full px-4 py-3 rounded-xl bg-ink-800/60 border border-ink-700 text-white text-sm focus:border-primary-500 focus:outline-none transition-colors font-mono"
              />
            </div>
            <div>
              <label className="text-ink-300 text-sm font-medium block mb-2">Auth Token</label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-ink-800/60 border border-ink-700 text-white text-sm focus:border-primary-500 focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-ink-800/40 border border-ink-700/50">
            <span className="w-2 h-2 rounded-full bg-warning-400 animate-pulse" />
            <span className="text-ink-400 text-sm">Status: Not connected — running in Demo Mode with simulated data</span>
          </div>
        </div>
      </div>

      {/* Save button */}
      <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors">
        <Save className="w-4 h-4" />
        Save Settings
      </button>
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-ink-800/40 last:border-0">
      <div>
        <p className="text-white font-medium text-sm">{label}</p>
        <p className="text-ink-500 text-xs mt-0.5">{desc}</p>
      </div>
      <button onClick={() => onChange(!value)} className="transition-colors shrink-0" aria-label={`Toggle ${label}`}>
        {value ? (
          <ToggleRight className="w-9 h-9 text-primary-400" />
        ) : (
          <ToggleLeft className="w-9 h-9 text-ink-600" />
        )}
      </button>
    </div>
  );
}
