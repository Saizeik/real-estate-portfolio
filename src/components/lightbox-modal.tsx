"use client";
import { useEffect } from "react";

interface LightboxModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function LightboxModal({ isOpen, onClose,  }: LightboxModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // This component is now handled directly in the PortfolioGallery component
  // to avoid prop drilling. This file is kept for potential future use.
  return null;
}
