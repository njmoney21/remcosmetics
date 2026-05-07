import React, { createContext, useContext, useState } from 'react';
import type { Service } from '../data/services';

interface BookingContextType {
  isOpen: boolean;
  initialService: Service | null;
  open: (service?: Service) => void;
  close: () => void;
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  initialService: null,
  open: () => {},
  close: () => {},
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState<Service | null>(null);

  const open = (service?: Service) => {
    setInitialService(service ?? null);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ isOpen, initialService, open, close }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
