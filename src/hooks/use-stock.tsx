
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StockContextType {
  selectedStock: string | null;
  setSelectedStock: (ticker: string | null) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStock, setSelectedStock] = useState<string | null>('RELIANCE.NS');

  return (
    <StockContext.Provider value={{ selectedStock, setSelectedStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
