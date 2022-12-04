import React, { useState, useEffect } from "react";
import { clearAllIntervals, youtubeURLGen } from "../../utils/functions";
import Tilt from "react-parallax-tilt";
import Link from "next/link";

interface MusicCardProps {
  v_id: string;
}

export const MusicCard: React.FC<MusicCardProps> = ({ v_id }) => {
  const [currentImg, setCurrentImg] = useState(0);

  //   useEffect(() => {
  //     if (v_id) getTitle();
  //   }, [v_id]);

  //   function getTitle() {
  //     axios
  //       .get(`https://gdata.youtube.com/feeds/api/videos/${v_id}?v=2&alt=json`)
  //       .then((response) => {
  //         console.log(response);
  //         setTitle("response");
  //       })
  //       .catch((error) => {
  //         console.log(v_id, error);
  //       });
  //   }

  return (
    <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}>
      <Link href={("/" + youtubeURLGen(v_id)) as string}>
        <img
          onMouseEnter={() => {
            setInterval(() => {
              setCurrentImg((prev) => (prev === 3 ? 0 : prev + 1));
            }, 800);
          }}
          onMouseLeave={clearAllIntervals}
          src={"https://img.youtube.com/vi/" + v_id + "/" + currentImg + ".jpg"}
          alt=""
          className="w-36 cursor-pointer rounded-md"
        />
      </Link>
    </Tilt>
  );
};
