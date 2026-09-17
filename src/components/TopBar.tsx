import { Menu, Bell, Zap } from 'lucide-react';
import { DEMO_MODE } from '@/data/mockData';

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
}

export default function TopBar({ title, onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-ink-950/80 backdrop-blur-xl border-b border-ink-800/60 px-4 lg:px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg bg-ink-800/60 text-ink-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg lg:text-xl font-bold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {DEMO_MODE && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning-500/15 border border-warning-500/30 text-warning-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-warning-400 animate-pulse" />
              Demo Mode
            </span>
          )}
          <button className="relative p-2 rounded-lg bg-ink-800/60 text-ink-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-ink-800">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white leading-tight">Admin User</p>
              <p className="text-xs text-ink-500">Smart Meter #001</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
