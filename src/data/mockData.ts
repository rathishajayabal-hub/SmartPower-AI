import type {
  Reading,
  ConsumptionPoint,
  Alert,
  Appliance,
  ModelInfo,
  Tariff,
} from '@/types';

export const DEMO_MODE = true;

export const currentPower = 3.6;
export const todayConsumption = 24.8;
export const predictedNextHour = 4.2;
export const estimatedMonthlyBill = 1850;
export const peakRisk: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';

export function generateRealtimeReadings(count = 24): Reading[] {
  const readings: Reading[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = t.getHours();
    const base = hour >= 6 && hour <= 22 ? 2.5 + Math.sin((hour / 24) * Math.PI * 2) * 1.5 : 1.0;
    const noise = (Math.random() - 0.5) * 0.4;
    const power = Math.max(0.3, base + noise);
    const voltage = 230 + (Math.random() - 0.5) * 6;
    const current = power / voltage;
    const pf = 0.85 + Math.random() * 0.12;
    readings.push({
      time: t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      voltage: Math.round(voltage * 10) / 10,
      current: Math.round(current * 1000) / 1000,
      power: Math.round(power * 100) / 100,
      energy: Math.round(power * 100) / 100,
      powerFactor: Math.round(pf * 100) / 100,
    });
  }
  return readings;
}

export function generateConsumptionData(days = 7): ConsumptionPoint[] {
  const data: ConsumptionPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const base = 22 + Math.random() * 8;
    const actual = Math.round(base * 10) / 10;
    const predicted = Math.round((base + (Math.random() - 0.5) * 3) * 10) / 10;
    data.push({ time: dayLabel, actual, predicted });
  }
  return data;
}

export function generateHourlyConsumption(): ConsumptionPoint[] {
  const data: ConsumptionPoint[] = [];
  for (let h = 0; h < 24; h++) {
    const base = h >= 6 && h <= 22 ? 1.5 + Math.sin((h / 24) * Math.PI * 2) * 2 : 0.6;
    const actual = Math.round((base + Math.random() * 0.5) * 10) / 10;
    const predicted = Math.round((base + (Math.random() - 0.5) * 0.6) * 10) / 10;
    data.push({
      time: `${String(h).padStart(2, '0')}:00`,
      actual,
      predicted,
    });
  }
  return data;
}

export function generatePeakHourData() {
  const hours = ['00', '04', '08', '12', '16', '18', '20', '22'];
  return hours.map((h) => {
    const hour = parseInt(h);
    let consumption = 1.5;
    if (hour >= 18 && hour <= 22) consumption = 3.5 + Math.random();
    else if (hour >= 6 && hour <= 10) consumption = 2.5 + Math.random() * 0.5;
    else consumption = 1.2 + Math.random() * 0.6;
    return { hour: `${h}:00`, consumption: Math.round(consumption * 10) / 10 };
  });
}

export function generateBarData(period: 'daily' | 'weekly' | 'monthly') {
  if (period === 'daily') {
    return Array.from({ length: 24 }, (_, h) => ({
      label: `${h}:00`,
      value: Math.round((1 + Math.sin((h / 24) * Math.PI * 2) * 1.5 + Math.random() * 0.5) * 10) / 10,
    }));
  }
  if (period === 'weekly') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((d) => ({
      label: d,
      value: Math.round((20 + Math.random() * 10) * 10) / 10,
    }));
  }
  return Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    value: Math.round((22 + Math.random() * 8) * 10) / 10,
  }));
}

export const alerts: Alert[] = [
  {
    id: 'a1',
    type: 'high-consumption',
    severity: 'high',
    title: 'High Consumption Warning',
    message: 'Current power draw of 3.6 kW exceeds your average of 2.4 kW by 50%.',
    timestamp: '2 min ago',
  },
  {
    id: 'a2',
    type: 'peak-demand',
    severity: 'high',
    title: 'Predicted Peak Demand',
    message: 'Peak consumption expected between 7 PM and 9 PM today. Estimated load: 4.2 kW.',
    timestamp: '15 min ago',
  },
  {
    id: 'a3',
    type: 'unusual',
    severity: 'medium',
    title: 'Unusual Consumption Pattern',
    message: 'Energy usage at 3 AM was 40% higher than your typical nighttime baseline.',
    timestamp: '1 hour ago',
  },
  {
    id: 'a4',
    type: 'bill-increase',
    severity: 'medium',
    title: 'Estimated Bill Increase',
    message: 'Projected monthly bill is ₹1,850, up 12% from last month\'s ₹1,650.',
    timestamp: '3 hours ago',
  },
  {
    id: 'a5',
    type: 'high-consumption',
    severity: 'low',
    title: 'Sustained Above-Average Usage',
    message: 'Consumption has remained above average for the past 4 hours.',
    timestamp: '5 hours ago',
  },
];

export const appliances: Appliance[] = [
  { id: 'ap1', name: 'Air Conditioner', icon: 'Wind', power: 1500, dailyUsage: 8, dailyEnergy: 12.0, monthlyCost: 720, status: 'on' },
  { id: 'ap2', name: 'Refrigerator', icon: 'Snowflake', power: 200, dailyUsage: 24, dailyEnergy: 4.8, monthlyCost: 288, status: 'on' },
  { id: 'ap3', name: 'Ceiling Fan', icon: 'Fan', power: 75, dailyUsage: 12, dailyEnergy: 0.9, monthlyCost: 54, status: 'on' },
  { id: 'ap4', name: 'LED Lights', icon: 'Lightbulb', power: 40, dailyUsage: 6, dailyEnergy: 0.24, monthlyCost: 14, status: 'on' },
  { id: 'ap5', name: 'Television', icon: 'Tv', power: 120, dailyUsage: 5, dailyEnergy: 0.6, monthlyCost: 36, status: 'on' },
  { id: 'ap6', name: 'Water Heater', icon: 'Droplets', power: 2000, dailyUsage: 1, dailyEnergy: 2.0, monthlyCost: 120, status: 'off' },
  { id: 'ap7', name: 'Washing Machine', icon: 'WashingMachine', power: 500, dailyUsage: 1, dailyEnergy: 0.5, monthlyCost: 30, status: 'off' },
  { id: 'ap8', name: 'Microwave', icon: 'Microwave', power: 800, dailyUsage: 0.5, dailyEnergy: 0.4, monthlyCost: 24, status: 'off' },
];

export const models: ModelInfo[] = [
  {
    name: 'Linear Regression',
    description: 'Baseline prediction model using linear relationships between time and consumption features.',
    type: 'Baseline',
    mae: 0.42,
    rmse: 0.58,
    mape: 8.7,
    selected: false,
  },
  {
    name: 'Random Forest',
    description: 'Ensemble model capturing nonlinear patterns in consumption data using decision trees.',
    type: 'Nonlinear',
    mae: 0.28,
    rmse: 0.39,
    mape: 5.4,
    selected: false,
  },
  {
    name: 'LSTM / GRU',
    description: 'Deep learning time-series forecasting model that captures temporal dependencies in consumption patterns.',
    type: 'Time-Series',
    mae: 0.19,
    rmse: 0.27,
    mape: 3.6,
    selected: true,
  },
];

export const tariffs: Tariff[] = [
  { name: 'Domestic', slab: '1-100 units', rate: 3.0, fixedCharge: 30 },
  { name: 'Domestic', slab: '101-200 units', rate: 4.5, fixedCharge: 40 },
  { name: 'Domestic', slab: '201-300 units', rate: 6.0, fixedCharge: 50 },
  { name: 'Domestic', slab: '301+ units', rate: 7.5, fixedCharge: 80 },
  { name: 'Commercial', slab: 'All units', rate: 8.0, fixedCharge: 120 },
];

export const recommendations: string[] = [
  'High consumption is expected during evening hours (7 PM - 9 PM). Consider shifting flexible loads like washing machines and water heaters to off-peak hours.',
  'Your weekly consumption is 8% higher than the previous week. Review appliance usage patterns to identify potential savings.',
  'The Air Conditioner accounts for 48% of your total energy usage. Setting it to 24°C instead of 22°C could reduce consumption.',
  'Consider shifting flexible loads to lower-demand periods between 11 PM and 5 AM when rates may be lower.',
  'Your power factor (0.91) is slightly below optimal. Power factor correction could reduce apparent power draw.',
];

export function predictForHorizon(horizon: 'hour' | 'today' | 'tomorrow' | 'week') {
  switch (horizon) {
    case 'hour':
      return { value: 4.2, confidence: 94, unit: 'kWh', label: 'Next Hour' };
    case 'today':
      return { value: 26.4, confidence: 91, unit: 'kWh', label: 'Today (Remaining)' };
    case 'tomorrow':
      return { value: 28.1, confidence: 87, unit: 'kWh', label: 'Tomorrow' };
    case 'week':
      return { value: 185.6, confidence: 82, unit: 'kWh', label: 'Next 7 Days' };
  }
}

export function calculateBill(units: number, tariff: Tariff): number {
  return Math.round(units * tariff.rate + tariff.fixedCharge);
}
