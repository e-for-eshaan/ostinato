import React, { useState, useEffect } from 'react';
import { clearAllIntervals, youtubeURLGen } from '../../utils/functions';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';

interface MusicCardProps {
  v_id: string;
}

export const MusicCard: React.FC<MusicCardProps> = ({ v_id }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const arr = [
    'https://img.youtube.com/vi/' + v_id + '/0.jpg',
    'https://img.youtube.com/vi/' + v_id + '/1.jpg',
    'https://img.youtube.com/vi/' + v_id + '/2.jpg',
    'https://img.youtube.com/vi/' + v_id + '/3.jpg',
  ];
  return (
    <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}>
      <Link href={('/' + youtubeURLGen(v_id)) as string}>
        <img
          onMouseEnter={() => {
            setInterval(() => {
              setCurrentImg(prev => (prev === 3 ? 0 : prev + 1));
            }, 800);
          }}
          onMouseLeave={() => {
            clearAllIntervals();
            setCurrentImg(0);
          }}
          src={arr[currentImg]}
          alt=""
          className="w-full cursor-pointer"
        />
      </Link>
    </Tilt>
  );
};
