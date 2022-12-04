import React, { useEffect, useState } from "react";
import { Heading, Layout, MusicCard, PageSection } from "../../components";

const MyMusic = () => {
  const [myMusic, setMyMusic] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let allMap = localStorage.getItem("myMap");
      let allMapObj = [];
      if (allMap) {
        allMapObj = JSON.parse(allMap);
      } else {
        //do nothing
      }
      setMyMusic(allMapObj);
    }
  }, []);

  return (
    <Layout>
      <PageSection className="bg-black text-white pt-10 mt-10 min-h-[400px]">
        <Heading variant="h1" className="mb-5">
          My Music
        </Heading>
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
