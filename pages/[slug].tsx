import { useRouter } from 'next/router';
import { VideoLayout } from '../components';
import getYouTubeID from 'get-youtube-id';
import { VideoPlayer } from '../features';
import React from 'react';

const URLPage = () => {
  const router = useRouter();
  const pathname = 'https://www.youtube.com' + router.asPath;
  const videoID = getYouTubeID(pathname);
  return (
    <VideoLayout>
      {videoID && <VideoPlayer pathName={pathname} v_id={videoID as string} />}
    </VideoLayout>
  );
};

export default URLPage;
