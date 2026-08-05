"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type HeaderThemeContextType = {
  forceLight: boolean;
  setForceLight: (value: boolean) => void;
};

const HeaderThemeContext = createContext<HeaderThemeContextType>({
  forceLight: false,
  setForceLight: () => {},
});

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [forceLight, setForceLight] = useState(false);

  return (
    <HeaderThemeContext.Provider value={{ forceLight, setForceLight }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}