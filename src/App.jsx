import { useEffect, useRef } from 'react';
import kaplay from 'kaplay';
import './App.css';

function App() {
  const game = useRef(null);

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

    const obj = k.add([k.rect(32, 32), k.pos(10, 20), k.color(255, 255, 255), k.area(), k.body(), 'shape']);

    k.add([k.rect(500, 2), k.pos(0, 190), k.color(255, 255, 255), k.area(), k.body({ isStatic: true }), 'shape']);

    k.setGravity(200);

    k.onKeyDown('right', () => {
      obj.move(200, 0);
    });
    k.onKeyDown('left', () => {
      obj.move(-200, 0);
    });
    k.onKeyPress('space', () => {
      obj.jump(100);
    });
  }, []);

  return <canvas ref={game} id='game'></canvas>;
}

export default App;
