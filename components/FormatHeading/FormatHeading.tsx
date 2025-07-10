import { LogoHeading } from '../../features/LogoHeading/LogoHeading';

interface FormatHeadingProps {
  label?: string;
}

export const FormatHeading: React.FC<FormatHeadingProps> = ({ label = 'OSTINATO' }) => {
  return (
    <div className="">
      <LogoHeading className={'relative inline-block'}>
        {label.split('').map((char, index) => {
          if (char === ' ') {
            return <span key={index} className="inline-block" style={{ width: '0.5em' }}></span>;
          }

          if (index % 2 === 0) {
            return (
              <span
                key={index}
                className={`font-righteous transform z-20 duration-100 select-none inline text-secondary hover:text-tone-1`}
              >
                {char}
              </span>
            );
          } else {
            return (
              <span
                key={index}
                className={`font-righteous transform z-20 duration-100 select-none inline text-secondary hover:text-tone-2`}
              >
                {char}
              </span>
            );
          }
        })}
      </LogoHeading>
    </div>
  );
};
