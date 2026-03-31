import React, { createContext, useContext } from 'react';
import { useSettings } from './settingsManager';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const settings = useSettings();
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettingsContext must be used inside SettingsProvider');
  return ctx;
};