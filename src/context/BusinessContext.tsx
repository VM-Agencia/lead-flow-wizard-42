import { createContext, useContext, useState, type ReactNode } from "react";

interface BusinessContextType {
  selectedBusiness: number;
  setSelectedBusiness: (idx: number) => void;
}

const BusinessContext = createContext<BusinessContextType>({
  selectedBusiness: 0,
  setSelectedBusiness: () => {},
});

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [selectedBusiness, setSelectedBusiness] = useState(0);
  return (
    <BusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  return useContext(BusinessContext);
}
