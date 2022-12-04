import { LogoHeading } from "../../features/LogoHeading/LogoHeading";

interface FormatHeadingProps {
  label?: string;
}

export const FormatHeading: React.FC<FormatHeadingProps> = ({
  label = "OSTINATO",
}) => {
  return (
    <div className="">
      {label.split(" ").map((item, index) => {
        return (
          <div key={index} className="">
            <LogoHeading className={"relative"}>
              {item.split("").map((char, indice) => {
                if (indice % 2 === 0) {
                  return (
                    <span
                      key={indice}
                      className={`font-righteous  transform z-20 duration-100 select-none inline text-secondary hover:text-tone-1 `}
                    >
                      {char}
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={indice}
                      className={`font-righteous transform z-20 duration-100 select-none inline text-secondary hover:text-tone-2 `}
                    >
                      {char}
                    </span>
                  );
                }
              })}
            </LogoHeading>
          </div>
        );
      })}
    </div>
  );
};
