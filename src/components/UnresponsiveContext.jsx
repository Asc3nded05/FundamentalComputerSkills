import React, { createContext, useState } from 'react';

export const UnresponsiveContext = createContext();

export function UnresponsiveProvider({ children }) {
  const [showUnresponsive, setShowUnresponsive] = useState(false);

  return (
    <UnresponsiveContext.Provider value={{ showUnresponsive, setShowUnresponsive }}>
      {children}
    </UnresponsiveContext.Provider>
  );
}
