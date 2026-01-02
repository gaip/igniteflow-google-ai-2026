import React from 'react';

export enum ModuleType {
  FOUNDER_CENTRAL = 'founder-central',
  MARKET_INTEL = 'market-intel',
  PITCH_LAB = 'pitch-lab',
  BRAND_STUDIO = 'brand-studio',
  STRATEGY_ROOM = 'strategy-room'
}

export interface AnalysisResult {
  text: string;
  duration: number;
  error?: string;
}

export interface SidebarItem {
  id: ModuleType;
  label: string;
  icon: React.ReactNode;
}