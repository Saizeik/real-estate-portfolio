"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ContactFormContextType {
  selectedPackage: string;
  setSelectedPackage: (pkg: string) => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  return (
    <ContactFormContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }
  return context;
};