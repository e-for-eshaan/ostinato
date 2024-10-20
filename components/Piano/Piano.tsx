import useSound from 'use-sound';

import C from '../../public/notes2/C4.mp3';
import Cs from '../../public/notes2/Db4.mp3';
import D from '../../public/notes2/D4.mp3';
import Ds from '../../public/notes2/Eb4.mp3';
import E from '../../public/notes2/E4.mp3';
import F from '../../public/notes2/F4.mp3';
import Fs from '../../public/notes2/Gb4.mp3';
import G from '../../public/notes2/G4.mp3';
import Gs from '../../public/notes2/Ab4.mp3';
import A from '../../public/notes2/A4.mp3';
import As from '../../public/notes2/Bb4.mp3';
import B from '../../public/notes2/B4.mp3';


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
  const [playB] = useSound(B);

  const playMap = [
    playC,
    playCs,
    playD,
    playDs,
    playE,
    playF,
    playFs,
    playG,
    playGs,
    playA,
    playAs,
    playB
  ]

  return (
    <div className="flex relative bg-primary m-2">
      {playMap.map((playFunc, index) => {
        switch (index + 1) {
          case 2: {
            return (
              <BlackKeys key={index} play={playFunc} className={'left-[35px]'} />
            );
          }
          case 4: {
            return (
              <BlackKeys key={index} play={playFunc} className={'left-[91px]'} />
            );
          }
          case 7: {
            return (
              <BlackKeys key={index} play={playFunc} className={'left-[203px]'} />
            );
          }
          case 9: {
            return (
              <BlackKeys key={index} play={playFunc} className={'left-[259px]'} />
            );
          }
          case 11: {
            return (
              <BlackKeys key={index} play={playFunc} className={'left-[315px]'} />
            );
          }
          default: {
            return <WhiteKeys key={index} play={playFunc} isLast={index === playMap.length - 1} />;
          }
        }
      })}
    </div>
  );
};

interface Keys {
  className?: string;
  play: () => void;
}

const BlackKeys: React.FC<Keys> = ({ className, play }) => {
  return (
    <div
      onClick={play}
      className={`${className} z-10 cursor-pointer text-white hover:bg-tone-1 transform duration-100 w-10 h-40 inline-block bg-black absolute`}
    />
  );
};

const WhiteKeys: React.FC<Keys & { isLast?: boolean }> = ({ play, isLast }) => {
  return (
    <div
      onClick={play}
      className={`hover:bg-tone-2 flex  flex-col-reverse ${isLast ? 'hidden sm:inline-block' : ''} cursor-pointer hover:skew-y-5 transform duration-100 w-12 h-56 inline-block mx-1 bg-white`}
    />
  );
};
