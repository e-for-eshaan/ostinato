import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { LoopType } from '../features/VideoPlayer/VideoPlayer';

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
  let allMap = localStorage.getItem('myMap');
  let allMapObj = [];
  if (allMap) {
    allMapObj = JSON.parse(allMap);
    if (allMapObj.includes(v_id)) {
      //do nothing
    } else {
      allMapObj.unshift(v_id);
    }
  } else {
    allMapObj.unshift(v_id);
  }
  localStorage.setItem('myMap', JSON.stringify(allMapObj));
};

export const youtubeURLGen = (v_id: string) => {
  const base = 'watch?v=';
  return v_id ? base + v_id : undefined;
};

export const uuid = () => {
  return uuidv4();
};

export const storeJWT = (jwt: string) => {
  localStorage.setItem('jwt', jwt);
};

export const getJWT = () => {
  return localStorage.getItem('jwt');
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

    // Get all localStorage keys that look like video IDs
    const allKeys = Object.keys(localStorage);
    const videoKeys = allKeys.filter(key => key.length > 10 && !['jwt', 'myMap'].includes(key));

    console.log(`Found ${videoKeys.length} videos to sync`);

    for (const videoId of videoKeys) {
      const timeStampsData = localStorage.getItem(videoId);
      if (timeStampsData) {
        try {
          const timeStamps = JSON.parse(timeStampsData);
          if (Array.isArray(timeStamps)) {
            await syncToFirebase(videoId, timeStamps);
          }
        } catch (error) {
          console.error(`Error parsing timestamps for video ${videoId}:`, error);
        }
      }
    }

    console.log('Finished syncing all localStorage data to Firebase');
  } catch (error) {
    console.error('Error syncing all data to Firebase:', error);
  }
};
