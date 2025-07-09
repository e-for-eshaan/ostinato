import React, { useState } from 'react';
import { syncAllLocalStorageToFirebase } from '../../utils/functions';
import { useAuthStore } from '../../stores';

export const SyncToFirebase: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const { isLoggedIn } = useAuthStore();

  const handleSync = async () => {
    if (!isLoggedIn) {
      setSyncStatus('Please log in to sync data to Firebase');
      return;
    }

    setIsSyncing(true);
    setSyncStatus('Syncing to Firebase...');

    try {
      await syncAllLocalStorageToFirebase();
      setSyncStatus('Successfully synced all data to Firebase!');
    } catch (error) {
      setSyncStatus('Error syncing to Firebase. Please try again.');
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <p className="text-yellow-800">Please log in to sync your data to Firebase</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-100 border border-blue-400 rounded">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Sync to Firebase</h3>
      <p className="text-blue-700 mb-4">
        Sync all your localStorage timestamps to Firebase for backup and cross-device access.
      </p>
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
      >
        {isSyncing ? 'Syncing...' : 'Sync to Firebase'}
      </button>
      {syncStatus && <p className="mt-2 text-sm text-blue-600">{syncStatus}</p>}
    </div>
  );
};
