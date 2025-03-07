import React, { useEffect, useRef, useState } from "react";

const SingingBowl = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().catch((error) => console.log("Playback error:", error));
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "10px 0" }}>
      <button onClick={toggleAudio}>
        {isPlaying ? "Pause Sound" : "Play Sound"}
      </button>
      <audio ref={audioRef} loop>
        <source src="/singing-bowl.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default SingingBowl;
