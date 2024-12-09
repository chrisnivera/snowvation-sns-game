"use client";

import { useEffect, useRef } from "react";
import * as ex from "excalibur";

const Game = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create an Excalibur engine instance
    const game = new ex.Engine({
      canvasElement: canvasRef.current ?? undefined,
      width: 800,
      height: 600,
      displayMode: ex.DisplayMode.Fixed,
    });

    // Create a simple actor (a red square)
    const player = new ex.Actor({
      x: 400,
      y: 300,
      width: 50,
      height: 50,
      color: ex.Color.Red,
    });

    // Add movement behavior to the actor
    player.vel.setTo(100, 0); // Moving to the right

    // Add the actor to the game
    game.add(player);

    // Start the game
    game.start();

    // Cleanup when component unmounts
    return () => {
      game.stop();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Game;
