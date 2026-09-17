import {
  Zap,
  Brain,
  BarChart3,
  Bell,
  Cpu,
  Radio,
  ArrowRight,
  Activity,
  ShieldCheck,
  TrendingDown,
  Gauge,
  Wifi,
  Database,
  LineChart,
  Sparkles,
} from 'lucide-react';

interface LandingProps {
  onViewDashboard: () => void;
}

export default function Landing({ onViewDashboard }: LandingProps) {
  return (
    <div className="min-h-screen bg-ink-950 grid-bg">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-950/70 backdrop-blur-xl border-b border-ink-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block text-white font-bold text-sm leading-tight">SmartPower</span>
              <span className="block text-primary-400 text-xs font-medium">AI System</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm">
            <a href="#features" className="text-ink-400 hover:text-white transition-colors">Features</a>
            <a href="#how" className="text-ink-400 hover:text-white transition-colors">How It Works</a>
            <a href="#benefits" className="text-ink-400 hover:text-white transition-colors">Benefits</a>
            <a href="#tech" className="text-ink-400 hover:text-white transition-colors">Technology</a>
          </div>
          <button
            onClick={onViewDashboard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors"
          >
            Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Energy Intelligence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Predict Your Energy. <br />
              <span className="gradient-text">Power a Smarter Future.</span>
            </h1>
            <p className="mt-5 text-lg text-ink-400 max-w-lg">
              AI-powered electricity monitoring and consumption prediction. Real-time insights, peak demand forecasting, and intelligent energy-saving recommendations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onViewDashboard}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all hover:scale-105"
              >
                View Dashboard <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#how"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink-800/60 border border-ink-700 hover:border-primary-500/40 text-white font-semibold transition-colors"
              >
                How It Works
              </a>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <p className="text-2xl font-bold text-white">94%</p>
                <p className="text-ink-500 text-sm">Prediction Confidence</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-ink-500 text-sm">Real-Time Monitoring</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3.6kW</p>
                <p className="text-ink-500 text-sm">Live Power Tracking</p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative animate-fade-in">
            <div className="glass-card p-8 glow-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="relative space-y-4">
                {/* Smart Meter */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-ink-800/40 border border-ink-700/50">
                  <div className="p-3 rounded-xl bg-primary-500/15">
                    <Gauge className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Smart Meter</p>
                    <p className="text-ink-500 text-xs">Live Reading: 3.6 kW</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-400 animate-pulse" />
                </div>

                {/* Connection flow */}
                <div className="flex items-center justify-center gap-2 text-ink-600">
                  <div className="w-px h-6 bg-gradient-to-b from-primary-500/40 to-accent-500/40" />
                </div>

                {/* ESP32 + Cloud */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-ink-800/40 border border-ink-700/50">
                    <div className="p-2.5 rounded-lg bg-accent-500/15">
                      <Wifi className="w-5 h-5 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs">ESP32</p>
                      <p className="text-ink-500 text-[10px]">IoT Gateway</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-ink-800/40 border border-ink-700/50">
                    <div className="p-2.5 rounded-lg bg-primary-500/15">
                      <Cpu className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs">AI Model</p>
                      <p className="text-ink-500 text-[10px]">LSTM Forecast</p>
                    </div>
                  </div>
                </div>

                {/* Mini chart preview */}
                <div className="p-4 rounded-xl bg-ink-800/40 border border-ink-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white font-semibold text-xs">Consumption Forecast</p>
                    <span className="text-accent-400 text-xs font-semibold">+4.2 kWh</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 55, 35, 70, 50, 85, 65, 90, 75, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-primary-600/40 to-primary-400 transition-all hover:from-primary-500 hover:to-primary-300"
                        style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Powerful Features</h2>
            <p className="mt-3 text-ink-400 max-w-2xl mx-auto">
              Everything you need to monitor, predict, and optimize your electricity consumption.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Activity, title: 'Real-Time Monitoring', desc: 'Track voltage, current, power, and energy consumption live with sub-second updates.' },
              { icon: Brain, title: 'AI Predictions', desc: 'Forecast future consumption using LSTM/GRU deep learning models with confidence scores.' },
              { icon: BarChart3, title: 'Energy Analytics', desc: 'Visualize consumption patterns across daily, weekly, and monthly periods.' },
              { icon: Bell, title: 'Smart Alerts', desc: 'Get notified about high consumption, peak demand, and unusual usage patterns instantly.' },
              { icon: Radio, title: 'IoT Integration', desc: 'Connect ESP32-based sensors seamlessly. Energy Sensor to AI Model pipeline built-in.' },
              { icon: TrendingDown, title: 'Energy Saving Tips', desc: 'AI-generated recommendations to shift loads and reduce consumption during peak hours.' },
            ].map((f, i) => (
              <div
                key={i}
                className="glass-card p-6 hover:border-primary-500/30 transition-all hover:scale-[1.02] group animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 inline-block group-hover:animate-pulse-glow transition-shadow">
                  <f.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="mt-4 text-white font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-ink-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-4 sm:px-6 bg-ink-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-3 text-ink-400 max-w-2xl mx-auto">
              A seamless pipeline from sensor to prediction to dashboard.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: Gauge, label: 'Energy Sensor', desc: 'Measures electrical parameters' },
              { icon: Wifi, label: 'ESP32', desc: 'Sends data via WiFi' },
              { icon: Database, label: 'API + Database', desc: 'Stores readings securely' },
              { icon: Cpu, label: 'AI Model', desc: 'Predicts future consumption' },
              { icon: LineChart, label: 'Dashboard', desc: 'Visualizes insights' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="glass-card p-5 text-center hover:border-primary-500/30 transition-all">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20 inline-block">
                    <step.icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <p className="mt-3 text-white font-semibold text-sm">{step.label}</p>
                  <p className="mt-1 text-ink-500 text-xs">{step.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 text-primary-500/40 z-10">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Benefits</h2>
            <p className="mt-3 text-ink-400 max-w-lg">
              Make informed decisions about your energy usage with AI-driven insights.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Activity, title: 'Proactive Monitoring', desc: 'Catch unusual consumption before it impacts your bill.' },
                { icon: TrendingDown, title: 'Smarter Usage', desc: 'Shift flexible loads to off-peak hours based on AI predictions.' },
                { icon: ShieldCheck, title: 'Better Planning', desc: 'Estimate monthly bills and plan your energy budget effectively.' },
                { icon: Brain, title: 'AI Recommendations', desc: 'Get personalized energy-saving suggestions based on your usage patterns.' },
              ].map((b, i) => (
                <div key={i} className="flex gap-4 items-start animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="p-2.5 rounded-xl bg-accent-500/10 border border-accent-500/20 shrink-0">
                    <b.icon className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{b.title}</h3>
                    <p className="text-ink-400 text-sm mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-8 glow-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">This Week's Summary</h3>
              <span className="text-accent-400 text-sm font-semibold">-8% vs last week</span>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Total Consumption', value: '172.4 kWh', pct: 72 },
                { label: 'Peak Demand', value: '4.2 kW', pct: 85 },
                { label: 'Estimated Bill', value: '₹1,850', pct: 60 },
                { label: 'Avg Power Factor', value: '0.91', pct: 91 },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-ink-400">{m.label}</span>
                    <span className="text-white font-semibold">{m.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-700"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="tech" className="py-20 px-4 sm:px-6 bg-ink-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Technology Stack</h2>
            <p className="mt-3 text-ink-400 max-w-2xl mx-auto">
              Built with modern, scalable technologies for real-world deployment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Activity, title: 'React + Tailwind', desc: 'Responsive, modern frontend with component-based architecture.' },
              { icon: Cpu, title: 'Node.js + Express', desc: 'RESTful API for sensor data ingestion and prediction serving.' },
              { icon: Database, title: 'Supabase', desc: 'PostgreSQL database with real-time subscriptions and secure storage.' },
              { icon: Brain, title: 'ML: LSTM / Random Forest', desc: 'Time-series forecasting and nonlinear pattern recognition models.' },
            ].map((t, i) => (
              <div key={i} className="glass-card p-6 hover:border-primary-500/30 transition-all animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500/15 to-accent-500/15 border border-primary-500/20 inline-block">
                  <t.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="mt-4 text-white font-semibold">{t.title}</h3>
                <p className="mt-2 text-ink-400 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto glass-card p-10 lg:p-14 text-center glow-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to <span className="gradient-text">Power Smarter?</span>
            </h2>
            <p className="mt-4 text-ink-400 max-w-xl mx-auto">
              Explore the full dashboard with live charts, AI predictions, and energy insights.
            </p>
            <button
              onClick={onViewDashboard}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all hover:scale-105"
            >
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-800/60 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-ink-400 text-sm">SmartPower AI — Smart Electricity Consumption Prediction</span>
          </div>
          <p className="text-ink-600 text-xs">Built as a college AI project demonstration. Uses simulated data in Demo Mode.</p>
        </div>
      </footer>
    </div>
  );
}
