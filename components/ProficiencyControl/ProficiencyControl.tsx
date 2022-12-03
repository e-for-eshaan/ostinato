interface ProficiencyProps {
  currentProficieny: number;
  index: number;
  setter: (value: any, index: any) => void;
}

export const ProficiencyControl: React.FC<ProficiencyProps> = ({
  currentProficieny,
  index,
  setter,
}) => {
  return (
    <div className="flex flex-row gap-2 group">
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <div
            key={value}
            className={
              "h-4 w-4 rounded-[50%] bg-yellow-300 hover:bg-red-400 hover:opacity-100 cursor-pointer transform duration-100 " +
              (value <= currentProficieny ? "opacity-100" : "opacity-20")
            }
            onClick={() => setter(value, index)}
          />
        );
      })}
    </div>
  );
};
