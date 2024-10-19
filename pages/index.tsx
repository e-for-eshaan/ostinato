import { Layout } from '../components';
import { AboutSection, LandingSection } from '../features';

export default function Home() {
  return (
    <Layout>
      <LandingSection />
      <AboutSection />
    </Layout>
  );
}
