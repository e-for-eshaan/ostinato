import { syncToFirebase, syncAllLocalStorageToFirebase } from './functions';
import { getVideoTimeStamps } from './storage';

// Function to sync a specific video's timestamps to Firebase
export const syncVideoToFirebase = async (videoId: string) => {
  try {
    const timeStamps = getVideoTimeStamps(videoId);
    if (timeStamps.length === 0) {
      console.log(`No data found for video ${videoId}`);
      return;
    }

    await syncToFirebase(videoId, timeStamps);
    console.log(`Successfully synced video ${videoId} with ${timeStamps.length} timestamps`);
  } catch (error) {
    console.error(`Error syncing video ${videoId}:`, error);
  }
};

// Function to sync all localStorage data to Firebase
export const syncAllToFirebase = async () => {
  try {
    await syncAllLocalStorageToFirebase();
    console.log('Successfully synced all localStorage data to Firebase');
  } catch (error) {
    console.error('Error syncing all data:', error);
  }
};

// Function to sync the specific video data you mentioned
export const syncSpecificVideo = async () => {
  const videoId = '2V9CyR06Ojo';
  const timeStamps = getVideoTimeStamps(videoId);

  if (timeStamps.length === 0) {
    console.log('No data found for video 2V9CyR06Ojo');
    return;
  }

  try {
    await syncToFirebase(videoId, timeStamps);
    console.log(`Successfully synced video ${videoId} with ${timeStamps.length} timestamps`);
  } catch (error) {
    console.error('Error syncing specific video:', error);
  }
};

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  (window as any).syncVideoToFirebase = syncVideoToFirebase;
  (window as any).syncAllToFirebase = syncAllToFirebase;
  (window as any).syncSpecificVideo = syncSpecificVideo;
}
