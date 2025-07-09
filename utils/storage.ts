import { LoopType } from '../features/VideoPlayer/VideoPlayer';

// Storage interface for future extensibility
interface StorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

// LocalStorage implementation
class LocalStorageWrapper implements StorageInterface {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
}

// Create storage instance
const storage = new LocalStorageWrapper();

// Storage utility functions
export const getStorageItem = (key: string): string | null => {
  return storage.getItem(key);
};

export const setStorageItem = (key: string, value: string): void => {
  storage.setItem(key, value);
};

export const removeStorageItem = (key: string): void => {
  storage.removeItem(key);
};

export const clearStorage = (): void => {
  storage.clear();
};

// Video-specific storage functions
export const getVideoTimeStamps = (videoId: string): LoopType[] => {
  const data = getStorageItem(videoId);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing video timestamps:', error);
    return [];
  }
};

export const setVideoTimeStamps = (videoId: string, timeStamps: LoopType[]): void => {
  setStorageItem(videoId, JSON.stringify(timeStamps));
};

export const getMyVideos = (): string[] => {
  const data = getStorageItem('myMap');
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing my videos:', error);
    return [];
  }
};

export const setMyVideos = (videoIds: string[]): void => {
  setStorageItem('myMap', JSON.stringify(videoIds));
};

export const addVideoToMyVideos = (videoId: string): void => {
  const myVideos = getMyVideos();
  if (!myVideos.includes(videoId)) {
    myVideos.unshift(videoId);
    setMyVideos(myVideos);
  }
};

// JWT storage functions
export const getJWT = (): string | null => {
  return getStorageItem('jwt');
};

export const setJWT = (token: string): void => {
  setStorageItem('jwt', token);
};

export const removeJWT = (): void => {
  removeStorageItem('jwt');
};
