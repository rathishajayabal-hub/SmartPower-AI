import {
  LayoutDashboard,
  Brain,
  BarChart3,
  Bell,
  Plug,
  Calculator,
  Radio,
  Cpu,
  Settings,
  Zap,
  X,
} from 'lucide-react';
import type { PageKey } from '@/types';

interface SidebarProps {
  current: PageKey | 'landing';
  onNavigate: (page: PageKey | 'landing') => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'prediction', label: 'AI Prediction', icon: Brain },
  { key: 'analytics', label: 'Energy Analytics', icon: BarChart3 },
  { key: 'alerts', label: 'Smart Alerts', icon: Bell },
  { key: 'appliances', label: 'Appliances', icon: Plug },
  { key: 'bill', label: 'Bill Estimator', icon: Calculator },
  { key: 'monitoring', label: 'Data Monitoring', icon: Radio },
  { key: 'models', label: 'AI Models', icon: Cpu },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onCloseMobile} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-ink-900/80 backdrop-blur-xl border-r border-ink-800/80 z-50 lg:z-0 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-ink-800/60">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 group-hover:animate-pulse-glow transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-white font-bold text-sm leading-tight">SmartPower</span>
              <span className="block text-primary-400 text-xs font-medium">AI System</span>
            </div>
          </button>
          <button onClick={onCloseMobile} className="lg:hidden text-ink-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {navItems.map((item) => {
            const active = current === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-primary-500/15 text-primary-300 border border-primary-500/30 glow-border'
                    : 'text-ink-400 hover:text-white hover:bg-ink-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${active ? 'text-primary-400' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
