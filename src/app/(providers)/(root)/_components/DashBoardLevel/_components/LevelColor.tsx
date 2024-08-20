const LevelColor = ({ level }: { level: number }) => {
  if (level < 11) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#ADD8E6]">{level}</span>
      </h6>
    );
  } else if (level < 21) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#87CEFA]">{level}</span>
      </h6>
    );
  } else if (level < 31) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#4682B4]">{level}</span>
      </h6>
    );
  } else if (level < 41) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#4169E1]">{level}</span>
      </h6>
    );
  } else if (level < 51) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#00008B]">{level}</span>
      </h6>
    );
  } else if (level < 61) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#98FB98]">{level}</span>
      </h6>
    );
  } else if (level < 71) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#32CD32]">{level}</span>
      </h6>
    );
  } else if (level < 81) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#228B22]">{level}</span>
      </h6>
    );
  } else if (level < 91) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#FF6347]">{level}</span>
      </h6>
    );
  } else if (level <= 100) {
    return (
      <h6 className="text-[28px]">
        Lv.<span className="text-[#FFD700]">{level}</span>
      </h6>
    );
  }

  return (
    <h6 className="text-[28px]">
      Lv.<span className="text-[#000000]">Unknown</span>
    </h6>
  );
};

export default LevelColor;
