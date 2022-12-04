import React, { useEffect, useState } from "react";
import { Layout, MusicCard, PageSection } from "../../components";

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
      <PageSection>
        <h1>My Music</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-center md:grid-cols-4 lg:grid-cols-5 mt-10 w-fit md:w-full gap-5 md:gap-0 mx-auto">
          {myMusic?.map((item, index) => {
            return <MusicCard v_id={item} key={index} />;
          })}
        </div>
      </PageSection>
    </Layout>
  );
};

export default MyMusic;
