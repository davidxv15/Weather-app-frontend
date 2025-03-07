import React, { useEffect, useRef, useState } from "react";

const SingingBowl = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => console.log("Playback blocked:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <button onClick={toggleAudio} className="play-button">
        {isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </button>
      
      <audio ref={audioRef} loop>
        <source src="SingingBowl.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default SingingBowl;
