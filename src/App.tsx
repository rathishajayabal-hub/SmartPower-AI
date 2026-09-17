import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Landing from '@/pages/Landing';
import Overview from '@/pages/Overview';
import Prediction from '@/pages/Prediction';
import Analytics from '@/pages/Analytics';
import Alerts from '@/pages/Alerts';
import Appliances from '@/pages/Appliances';
import BillEstimator from '@/pages/BillEstimator';
import Monitoring from '@/pages/Monitoring';
import Models from '@/pages/Models';
import SettingsPage from '@/pages/Settings';
import type { PageKey } from '@/types';

const pageTitles: Record<PageKey, string> = {
  overview: 'Overview Dashboard',
  prediction: 'AI Prediction',
  analytics: 'Energy Analytics',
  alerts: 'Smart Alerts',
  appliances: 'Appliance Monitoring',
  bill: 'Bill Estimator',
  monitoring: 'Data Monitoring',
  models: 'AI Model Information',
  settings: 'Settings',
};

export default function App() {
  const [page, setPage] = useState<PageKey | 'landing'>('landing');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (p: PageKey | 'landing') => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  if (page === 'landing') {
    return <Landing onViewDashboard={() => navigate('overview')} />;
  }

  return (
    <div className="min-h-screen bg-ink-950 grid-bg flex">
      <Sidebar
        current={page}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar title={pageTitles[page]} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden">
          {page === 'overview' && <Overview />}
          {page === 'prediction' && <Prediction />}
          {page === 'analytics' && <Analytics />}
          {page === 'alerts' && <Alerts />}
          {page === 'appliances' && <Appliances />}
          {page === 'bill' && <BillEstimator />}
          {page === 'monitoring' && <Monitoring />}
          {page === 'models' && <Models />}
          {page === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
