import { useState, useEffect, useRef } from 'react';
import kaplay from 'kaplay';
import './App.css';

function App() {
  const game = useRef(null);
  const [keyDownStart, setKeyDownStart] = useState(10);

  useEffect(() => {
    const k = kaplay({
      global: false,
      pixelDensity: 2,
      width: 500,
      height: 200,
      background: '#000000',
      scale: 2,
      canvas: game.current
    });

    k.scene('game', () => {
      const obj = k.add([k.rect(32, 32), k.pos(30, 20), k.color(255, 255, 255), k.area(), k.body(), 'player']);

      k.add([k.rect(500, 2), k.pos(0, 198), k.color(0, 255, 0), k.area(), k.body({ isStatic: true }), 'ground']);

      k.setGravity(1000);

      const obstacle = k.add([
        k.rect(25, 25),
        k.pos(500, 198),
        k.color(255, 0, 0),
        k.area(),
        k.body({ isStatic: true }),
        { time: 0 },
        'obstacle'
      ]);

      obstacle.onUpdate(() => {
        obstacle.time += k.dt();
        const t = (obstacle.time % 5) / 2;
        obstacle.pos = k.lerp(k.vec2(500, 173), k.vec2(0, 173), t);
      });

      k.onCollide('player', 'obstacle', () => {
        alert('You Lose!');
        k.quit();
      });

      let keyDown;

      k.onKeyPress('space', () => {
        keyDown = Date.now();
      });

      k.onKeyRelease('space', () => {
        const jumpStrength = Date.now() - keyDown;
        obj.jump(jumpStrength > 500 ? 500 : jumpStrength);
      });
    });

    k.go('game');
  }, []);

  return <canvas ref={game} id='game'></canvas>;
}

export default App;
