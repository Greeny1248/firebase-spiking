import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      {
        BD: "/Kick_17.wav",
        CP: "Snare_7.wav",
        OH: "Hihat_open_1/wav",
        CH: "Hihat_1_closed.wav",
        //////////// CHANGE/////////////
      },
      () => {
        console.log("buffers loaded");
        setPlayer(player);
      }
    ).toDestination();
  }, []);

  return children({ player });
};

export default PlayerProvider;
