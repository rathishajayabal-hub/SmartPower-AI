export type PageKey =
  | 'overview'
  | 'prediction'
  | 'analytics'
  | 'alerts'
  | 'appliances'
  | 'bill'
  | 'monitoring'
  | 'models'
  | 'settings';

export interface Reading {
  time: string;
  voltage: number;
  current: number;
  power: number;
  energy: number;
  powerFactor: number;
}

export interface ConsumptionPoint {
  time: string;
  actual: number;
  predicted: number;
}

export interface Alert {
  id: string;
  type: 'high-consumption' | 'peak-demand' | 'unusual' | 'bill-increase';
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  timestamp: string;
}

export interface Appliance {
  id: string;
  name: string;
  icon: string;
  power: number;
  dailyUsage: number;
  dailyEnergy: number;
  monthlyCost: number;
  status: 'on' | 'off';
}

export interface ModelInfo {
  name: string;
  description: string;
  type: string;
  mae: number;
  rmse: number;
  mape: number;
  selected: boolean;
}

export interface Tariff {
  name: string;
  slab: string;
  rate: number;
  fixedCharge: number;
}
