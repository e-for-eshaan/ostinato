import React from 'react';
import { Navbar, Footer } from '../../components';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh-192px)]">{children}</div>
      <Footer />
    </main>
  );
};
