"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { DarkModeProvider } from "../context/DarkModeContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <DarkModeProvider>
        {children}
      </DarkModeProvider>
    </ThemeProvider>
  );
};

export default Providers;
