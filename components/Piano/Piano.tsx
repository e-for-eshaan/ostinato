import React from 'react';
import useSound from 'use-sound';

//@ts-ignore
import C from './1.mp3';
//@ts-ignore
import Cs from './2.mp3';
//@ts-ignore
import D from './3.mp3';
//@ts-ignore
import Ds from './4.mp3';
//@ts-ignore
import E from './5.mp3';
//@ts-ignore
import F from './6.mp3';
//@ts-ignore
import Fs from './7.mp3';
//@ts-ignore
import G from './8.mp3';
//@ts-ignore
import Gs from './9.mp3';
//@ts-ignore
import A from './10.mp3';
//@ts-ignore
import As from './11.mp3';
//@ts-ignore

export const Piano = () => {
  const [playC] = useSound(C);
  const [playCs] = useSound(Cs);
  const [playD] = useSound(D);
  const [playDs] = useSound(Ds);
  const [playE] = useSound(E);
  const [playF] = useSound(F);
  const [playFs] = useSound(Fs);
  const [playG] = useSound(G);
  const [playGs] = useSound(Gs);
  const [playA] = useSound(A);
  const [playAs] = useSound(As);
  const clicker = (key: number) => {
    switch (key) {
      case 1: {
        playC();
        break;
      }
      case 2: {
        playCs();
        break;
      }
      case 3: {
        playD();
        break;
      }
      case 4: {
        playDs();
        break;
      }
      case 5: {
        playE();
        break;
      }
      case 6: {
        playF();
        break;
      }
      case 7: {
        playFs();
        break;
      }
      case 8: {
        playG();
        break;
      }
      case 9: {
        playGs();
        break;
      }
      case 10: {
        playA();
        break;
      }
      case 11: {
        playAs();
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div className="flex relative bg-primary m-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
        switch (item) {
          case 2: {
            return <BlackKeys keyNum={item} clicker={clicker} className={'left-[35px]'} />;
          }
          case 3: {
            return <BlackKeys keyNum={item} clicker={clicker} className={'left-[91px]'} />;
          }
          case 7: {
            return <BlackKeys keyNum={item} clicker={clicker} className={'left-[203px]'} />;
          }
          case 9: {
            return <BlackKeys keyNum={item} clicker={clicker} className={'left-[259px]'} />;
          }
          case 11: {
            return <BlackKeys keyNum={item} clicker={clicker} className={'left-[315px]'} />;
          }
          default: {
            return <WhiteKeys keyNum={item} clicker={clicker} />;
          }
        }
      })}
    </div>
  );
};

interface Keys {
  className?: string;
  clicker: (e: number) => void;
  keyNum: number;
}

const BlackKeys: React.FC<Keys> = ({ className, clicker, keyNum }) => {
  return (
    <div
      onClick={() => {
        clicker(keyNum);
      }}
      className={`${className} z-10 cursor-pointer hover:bg-tone-1 transform duration-100 w-10 h-40 inline-block bg-black absolute`}
    />
  );
};

const WhiteKeys: React.FC<Keys> = ({ clicker, keyNum }) => {
  return (
    <div
      onClick={() => {
        clicker(keyNum);
      }}
      className={`hover:bg-tone-2 ${
        keyNum === 12 ? 'hidden sm:inline-block' : ''
      } cursor-pointer hover:skew-y-5 transform duration-100 w-12 h-56 inline-block mx-1 bg-white`}
    />
  );
};
