import { useRouter } from 'next/router';
import { Layout } from '../components';
import getYouTubeID from 'get-youtube-id';
import { VideoPlayer } from '../features';
import React from 'react';

const URLPage = () => {
  const router = useRouter();
  const pathname = 'https://www.youtube.com' + router.asPath;
  const videoID = getYouTubeID(pathname);
  return <Layout>{videoID && <VideoPlayer pathName={pathname} v_id={videoID as string} />}</Layout>;
};

export default URLPage;
