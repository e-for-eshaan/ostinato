import mockJson from '../mocks/default.json';
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { LoopType } from '../features/VideoPlayer/VideoPlayer';
import {
  getVideoTimeStamps,
  setVideoTimeStamps,
  getMyVideos,
  setMyVideos,
  addVideoToMyVideos,
  getJWT,
  setJWT,
} from './storage';

export function clearAllIntervals() {
  if (typeof window !== 'undefined') {
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  }
}

export const myvideosSetter = (v_id: string) => {
  addVideoToMyVideos(v_id);
};

export const youtubeURLGen = (v_id: string) => {
  const base = 'watch?v=';
  return v_id ? base + v_id : undefined;
};

export const uuid = () => {
  return uuidv4();
};

// Firebase sync functions
export const syncToFirebase = async (videoId: string, timeStamps: LoopType[]) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user logged in, skipping Firebase sync');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const videoDocRef = doc(userDocRef, 'videos', videoId);

    await setDoc(videoDocRef, {
      videoId,
      timeStamps,
      lastUpdated: new Date().toISOString(),
    });

    console.log(
      `Successfully synced ${timeStamps.length} timestamps to Firebase for video ${videoId}`
    );
  } catch (error) {
    console.error('Error syncing to Firebase:', error);
    // If Firebase sync fails, we can still save to localStorage
    console.log('Falling back to localStorage only');
  }
};

export const loadFromFirebase = async (videoId: string): Promise<LoopType[]> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user logged in, loading from localStorage only');
      return [];
    }

    const userDocRef = doc(db, 'users', user.uid);
    const videoDocRef = doc(userDocRef, 'videos', videoId);
    const videoDoc = await getDoc(videoDocRef);

    if (videoDoc.exists()) {
      const data = videoDoc.data();
      console.log(
        `Loaded ${data.timeStamps?.length || 0} timestamps from Firebase for video ${videoId}`
      );
      return data.timeStamps || [];
    }

    return [];
  } catch (error) {
    console.error('Error loading from Firebase:', error);
    return [];
  }
};

export const syncAllLocalStorageToFirebase = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user logged in, cannot sync to Firebase');
      return;
    }

    // Get all videos from storage
    const myVideos = getMyVideos();
    console.log(`Found ${myVideos.length} videos to sync`);

    for (const videoId of myVideos) {
      const timeStamps = getVideoTimeStamps(videoId);
      if (timeStamps.length > 0) {
        await syncToFirebase(videoId, timeStamps);
      }
    }

    console.log('Finished syncing all storage data to Firebase');
  } catch (error) {
    console.error('Error syncing all data to Firebase:', error);
  }
};

// Default video data for demo purposes
const defaultVideoData = mockJson;

export const createDefault = () => {
  const videoId = '2V9CyR06Ojo';

  // Set myMap to include the video ID
  setMyVideos([videoId]);

  // Set the video timestamps data
  setVideoTimeStamps(videoId, defaultVideoData as LoopType[]);

  console.log('Created default video data for:', videoId);

  return videoId;
};

export const handleTryNow = () => {
  const videoId = createDefault();

  // Use window.location for navigation to avoid router dependency
  if (typeof window !== 'undefined') {
    window.location.href = `/watch?v=${videoId}`;
  }
};
