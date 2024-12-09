"use client";

import { useEffect, useRef } from "react";
import * as ex from "excalibur";

export const Game = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create an Excalibur engine instance
    const game = new ex.Engine({
      canvasElement: canvasRef.current ?? undefined,
      width: window.innerWidth,
      height: window.innerHeight,
      displayMode: ex.DisplayMode.Fixed,
    });

    // Create a simple actor (a red square)
    const player = new ex.Actor({
      x: 400,
      y: 300,
      width: 250,
      height: 250,
    });

    const spriteImage = new ex.ImageSource(
      "/assets/characters/character.png"
    );
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: spriteImage,
      grid: {
        rows: 4,
        columns: 4,
        spriteWidth: 48,
        spriteHeight: 48,
      },
    });

    // Ensure the image is loaded before using it
    spriteImage.load().then(() => {
      player.graphics.use(spriteSheet.getSprite(0, 0));
      player.scale = new ex.Vector(2, 2); // Scale the sprite by 5 times
    });

    // Add the actor to the game
    game.add(player);

    // Start the game
    game.start();

     // Handle player movement and sprite change
    game.input.keyboard.on('hold', (evt) => {
      switch (evt.key) {
        case ex.Input.Keys.Left:
          player.vel.x = -100;
          player.graphics.use(spriteSheet.getSprite(1, 2)); // Use left-facing sprite
          break;
        case ex.Input.Keys.Right:
          player.vel.x = 100;
          player.graphics.use(spriteSheet.getSprite(1, 3)); // Use up-facing sprite
          break;
        case ex.Input.Keys.Up:
          player.vel.y = -100;
          player.graphics.use(spriteSheet.getSprite(1, 1)); // Use left-facing sprite
          break;
        case ex.Input.Keys.Down:
          player.vel.y = 100;
          player.graphics.use(spriteSheet.getSprite(1, 0)); // Use down-facing sprite
          break;
      }
    });

    game.input.keyboard.on('release', (evt) => {
      switch (evt.key) {
        case ex.Input.Keys.Left:
        case ex.Input.Keys.Right:
          player.vel.x = 0;
          break;
        case ex.Input.Keys.Up:
        case ex.Input.Keys.Down:
          player.vel.y = 0;
          break;
      }
    });

    // Cleanup when component unmounts
    return () => {
      game.stop();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Game;
