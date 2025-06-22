import React, { useState, useEffect } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEEDS = {
  easy: 300,
  medium: 180,
  hard: 100,
};

function getRandomFood(snake) {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    if (!snake.some(seg => seg.x === newFood.x && seg.y === newFood.y)) break;
  }
  return newFood;
}

export default function SnakeGame({ isDarkMode }) {
  const [gameState, setGameState] = useState('init');
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [intervalMs] = useState(SPEEDS.hard);
  const [pendingDir, setPendingDir] = useState(null);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKey = (e) => {
      let newDir;
      if (e.key === 'ArrowUp' && direction.y !== 1) newDir = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && direction.y !== -1) newDir = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && direction.x !== 1) newDir = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && direction.x !== -1) newDir = { x: 1, y: 0 };
      if (newDir) {
        e.preventDefault();
        setPendingDir(newDir);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, direction]);

  // Smoother game loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    let lastTime = Date.now();
    let animationFrame;
    function gameLoop() {
      const now = Date.now();
      if (now - lastTime > intervalMs) {
        setSnake(prevSnake => {
          const newDir = pendingDir || direction;
          setDirection(newDir);
          setPendingDir(null);
          const newHead = {
            x: prevSnake[0].x + newDir.x,
            y: prevSnake[0].y + newDir.y,
          };
          // Check collision
          if (
            newHead.x < 0 || newHead.x >= GRID_SIZE ||
            newHead.y < 0 || newHead.y >= GRID_SIZE ||
            prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
          ) {
            setGameState('gameover');
            return prevSnake;
          }
          
          // Check if food is eaten
          const foodEaten = newHead.x === food.x && newHead.y === food.y;
          
          let newSnake;
          if (foodEaten) {
            // Grow snake by adding new head and keeping all segments
            newSnake = [newHead, ...prevSnake];
            setFood(getRandomFood(newSnake));
            setScore(prev => prev + 10);
          } else {
            // Move snake by adding new head and removing tail
            newSnake = [newHead, ...prevSnake.slice(0, -1)];
          }
          
          return newSnake;
        });
        lastTime = now;
      }
      animationFrame = requestAnimationFrame(gameLoop);
    }
    animationFrame = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [gameState, direction, food, intervalMs, pendingDir]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setGameState('playing');
  };

  const restartGame = startGame;

  // Theme styles
  const cellBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const snakeColor = isDarkMode ? 'bg-green-400' : 'bg-green-600';
  const foodColor = isDarkMode ? 'bg-red-400' : 'bg-red-600';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';

  return (
    <div className="rounded-2xl flex flex-col items-center justify-center p-4 relative bg-transparent" style={{ width: 380, height: 380 }}>
      {gameState === 'init' && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10 ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-lg'}`}>
          <div className={`mb-6 text-[40px] font-semibold tracking-wide ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Snake Game</div>
          <button
            className="px-6 py-3 cursor-pointer rounded-xl font-semibold bg-blue-600 text-white hover:scale-105 hover:bg-blue-700 transition"
            onClick={startGame}
          >
            Play Game
          </button>
        </div>
      )}
      {(gameState === 'playing' || gameState === 'gameover') && (
        <div className="relative">
          <div className="w-full mb-2 flex justify-center">
            <div className={`font-semibold text-xl ${textColor}`}>Score: {score}</div>
          </div>
          <div
            className="relative"
            style={{ 
              width: 380, 
              height: 380, 
              background: isDarkMode ? '#1a1a1a' : '#f3f3f3', 
              borderRadius: 12, 
              border: isDarkMode ? '2px solid #374151' : '2px solid #bbb', 
              boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #0001' 
            }}
            tabIndex={0}
          >
            {/* Grid */}
            <div className="absolute inset-0 grid" style={{ gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: 2 }}>
              {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => {
                const x = i % GRID_SIZE;
                const y = Math.floor(i / GRID_SIZE);
                const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                const isHead = snake[0].x === x && snake[0].y === y;
                const isFood = food.x === x && food.y === y;
                return (
                  <div
                    key={i}
                    className={`w-full h-full border border-transparent rounded-sm ${
                      isSnake ? (isHead ? 'bg-green-500' : snakeColor) : isFood ? foodColor : cellBg
                    }`}
                    style={{ transition: 'background 0.1s' }}
                  />
                );
              })}
            </div>
            {gameState === 'gameover' && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10 ${isDarkMode ? 'bg-black/70' : 'bg-black/60'}`} style={{ width: 380, height: 380 }}>
                <div className={`mb-2 text-[40px] font-semibold tracking-wide ${isDarkMode ? 'text-gray-100' : 'text-gray-100'}`}>Game Over</div>
                <div className="mb-2 text-xl font-semibold text-gray-100 drop-shadow-lg">Score: {score}</div>
                <button
                  className="px-6 py-3 cursor-pointer hover:scale-105 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition mt-2"
                  onClick={restartGame}
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}