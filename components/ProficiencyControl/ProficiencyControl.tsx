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
    <div className="flex flex-row gap-1 group">
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <div
            key={value}
            className={
              'h-2.5 w-2.5 rounded-[50%]  hover:bg-red-500 hover:opacity-100 cursor-pointer transform duration-100 ' +
              (value <= currentProficieny ? 'bg-yellow-400' : 'bg-gray-200')
            }
            onClick={() => setter(value, index)}
          />
        );
      })}
    </div>
  );
};
