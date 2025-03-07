import React, { useEffect, useRef } from "react";

const SingingBowl = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log("Autoplay blocked", error));
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/SingingBowl.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default SingingBowl;
