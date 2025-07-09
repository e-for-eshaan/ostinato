import React, { useEffect, useState } from 'react';
import {
  FormatHeading,
  Heading,
  Layout,
  MusicCard,
  PageSection,
  SyncToFirebase,
} from '../../components';
import { getMyVideos } from '../../utils/storage';

const MyMusic = () => {
  const [myMusic, setMyMusic] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const myVideos = getMyVideos();
      setMyMusic(myVideos);
    }
  }, []);

  return (
    <Layout>
      <PageSection className="bg-black text-white pt-10 mt-10 min-h-[400px] mb-10">
        <FormatHeading label="MY MUSIC" />
        <div className="mb-6">
          <SyncToFirebase />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-center md:grid-cols-4 w-fit md:w-full gap-5 mx-auto">
          {myMusic?.map((item, index) => {
            return <MusicCard v_id={item} key={index} />;
          })}
        </div>
      </PageSection>
    </Layout>
  );
};

export default MyMusic;
