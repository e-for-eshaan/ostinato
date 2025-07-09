import { Navbar } from '../Navbar/Navbar';

interface VideoLayoutProps {
  children: React.ReactNode;
}

export const VideoLayout: React.FC<VideoLayoutProps> = ({ children }) => {
  return (
    <main className="h-screen overflow-hidden">
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="h-full">{children}</div>
    </main>
  );
};
