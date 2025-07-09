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
  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Novice';
      case 3:
        return 'Intermediate';
      case 4:
        return 'Advanced';
      case 5:
        return 'Master';
      default:
        return 'Not Set';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-xs">{getProficiencyLabel(currentProficieny)}</span>
        <span className="text-white/40 text-xs">{currentProficieny}/5</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(value => {
          return (
            <button
              key={value}
              onClick={() => setter(value, index)}
              className={`h-3 w-3 rounded-full transition-all duration-200 hover:scale-110 ${
                value <= currentProficieny ? 'bg-tone-1 shadow-sm' : 'bg-white/20 hover:bg-white/30'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
