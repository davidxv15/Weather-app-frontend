import React, { useEffect, useRef } from "react";

const SingingBowl = ({ playSound }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (playSound && audioRef.current) {
      audioRef.current.play().catch((error) => console.log("Playback blocked:", error));
    }
  }, [playSound]); // Play when `playSound` is true

  return (
    <audio ref={audioRef} loop>
      <source src="SingingBowl.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default SingingBowl;
