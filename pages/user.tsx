import { useAuthStore } from '../stores';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '../components';

const UserPage = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/404');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Will redirect to 404
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-righteous font-bold text-white mb-4">User Profile</h1>
            <p className="text-white/70 text-lg">
              Account settings and preferences will be available here soon.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
