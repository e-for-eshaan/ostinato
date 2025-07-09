import { Navbar, Footer } from '../../components';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </main>
  );
};
