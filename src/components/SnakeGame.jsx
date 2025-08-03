import React, { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaRedo, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEEDS = {
  easy: 200,
  medium: 120,
  hard: 80,
};
const SCORE_MULTIPLIERS = {
  easy: 1,
  medium: 2,
  hard: 3,
};

function getRandomFood(snake) {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.floor(Math.random() * GRID_SIZE)),
    };
    if (!snake.some(seg => seg.x === newFood.x && seg.y === newFood.y)) break;
  }
  return newFood;
}

function useSound(url, volume = 0.2) {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.volume = volume;
  }, [audio, volume]);

  const play = useCallback(() => {
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play error:", e));
    setIsPlaying(true);
  }, [audio]);

  const stop = useCallback(() => {
    audio.pause();
    setIsPlaying(false);
  }, [audio]);

  return { play, stop, isPlaying };
}

export default function SnakeGame({ isDarkMode }) {
  const [gameState, setGameState] = useState('init'); // init, playing, paused, gameover
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [intervalMs, setIntervalMs] = useState(SPEEDS.medium);
  const [pendingDir, setPendingDir] = useState(null);
  const [mute, setMute] = useState(false);
  const [specialFood, setSpecialFood] = useState(null);
  const [specialFoodTimer, setSpecialFoodTimer] = useState(0);

  // Sound effects
  const eatSound = useSound('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
  const specialEatSound = useSound('https://assets.mixkit.co/sfx/preview/mixkit-bonus-earned-in-video-game-2058.mp3');
  const gameOverSound = useSound('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.mp3');
  const moveSound = useSound('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3', 0.1);

  // Initialize high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // Special food timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setSpecialFoodTimer(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Spawn special food randomly
  useEffect(() => {
    if (gameState !== 'playing' || specialFood || Math.random() > 0.01) return;

    const newSpecialFood = getRandomFood(snake);
    setSpecialFood(newSpecialFood);
    setSpecialFoodTimer(15); // 15 seconds to eat

    const timeout = setTimeout(() => {
      setSpecialFood(null);
    }, 15000);

    return () => clearTimeout(timeout);
  }, [gameState, snake, specialFood]);

  // Handle keyboard controls
  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'paused') return;

    const handleKey = (e) => {
      // Pause/resume with spacebar
      if (e.key === ' ') {
        e.preventDefault();
        togglePause();
        return;
      }

      if (gameState === 'paused') return;

      let newDir;
      if (e.key === 'ArrowUp' && direction.y !== 1) newDir = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && direction.y !== -1) newDir = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && direction.x !== 1) newDir = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && direction.x !== -1) newDir = { x: 1, y: 0 };

      if (newDir) {
        e.preventDefault();
        setPendingDir(newDir);
        if (!mute) moveSound.play();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, direction, mute]);

  // Game loop
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
            if (!mute) gameOverSound.play();
            setGameState('gameover');
            return prevSnake;
          }

          // Check if food is eaten
          const foodEaten = newHead.x === food.x && newHead.y === food.y;
          const specialFoodEaten = specialFood && newHead.x === specialFood.x && newHead.y === specialFood.y;

          let newSnake;
          if (foodEaten || specialFoodEaten) {
            // Grow snake by adding new head and keeping all segments
            newSnake = [newHead, ...prevSnake];

            if (foodEaten) {
              setFood(getRandomFood(newSnake));
              const points = 10 * SCORE_MULTIPLIERS[difficulty];
              setScore(prev => prev + points);
              if (!mute) eatSound.play();
            }

            if (specialFoodEaten) {
              setSpecialFood(null);
              const points = 50 * SCORE_MULTIPLIERS[difficulty];
              setScore(prev => prev + points);
              if (!mute) specialEatSound.play();
            }
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
  }, [gameState, direction, food, intervalMs, pendingDir, specialFood, difficulty, mute]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setSpecialFood(null);
    setGameState('playing');
  };

  const restartGame = () => {
    startGame();
  };

  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
    setIntervalMs(SPEEDS[level]);
  };

  // Theme styles
  const cellBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const snakeColor = isDarkMode ? 'bg-green-400' : 'bg-green-600';
  const headColor = isDarkMode ? 'bg-green-300' : 'bg-green-500';
  const foodColor = isDarkMode ? 'bg-red-400' : 'bg-red-600';
  const specialFoodColor = isDarkMode ? 'bg-yellow-300' : 'bg-yellow-500';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-400';
  const buttonBg = isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300';

  return (
    <div className="rounded-2xl flex flex-col items-center justify-center p-4 relative bg-transparent w-[400px] h-[400px]"  >
      {gameState === 'init' && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10 ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-lg'}`}>
          <div className={`mb-6 text-[40px] font-semibold tracking-wide ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Snake Game</div>

          <div className="mb-6 w-full px-8">
            <div className={`mb-2 text-center ${textColor}`}>Difficulty:</div>
            <div className="flex justify-center gap-2">
              {Object.keys(SPEEDS).map(level => (
                <button
                  key={level}
                  className={`px-4 py-2 rounded-lg capitalize ${difficulty === level ? 'bg-blue-600 text-white' : buttonBg}`}
                  onClick={() => changeDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="px-6 py-3 cursor-pointer rounded-xl font-semibold bg-blue-600 text-white hover:scale-105 hover:bg-blue-700 transition flex items-center gap-2"
              onClick={startGame}
            >
              <FaPlay /> Play
            </button>
            <button
              className={`px-4 py-3 cursor-pointer rounded-xl font-semibold ${buttonBg} ${textColor} flex items-center gap-2`}
              onClick={() => setMute(!mute)}
            >
              {mute ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>

          {highScore > 0 && (
            <div className={`mt-6 ${textColor}`}>
              High Score: <span className="font-bold">{highScore}</span>
            </div>
          )}
        </div>
      )}

      {(gameState === 'playing' || gameState === 'paused' || gameState === 'gameover') && (
        <div className="relative w-full">
          <div className="w-full mb-2 flex justify-between items-center">
            <div className={`font-semibold text-lg ${textColor}`}>
              Score: <span className="font-bold">{score}</span>
            </div>
            <div className={`font-semibold text-lg ${textColor}`}>
              High: <span className="font-bold">{highScore}</span>
            </div>
            <div className="flex gap-2">
              <button
                className={`p-2 rounded-lg ${buttonBg} ${textColor}`}
                onClick={togglePause}
                disabled={gameState === 'gameover'}
              >
                {gameState === 'paused' ? <FaPlay size={14} /> : <FaPause size={14} />}
              </button>
              <button
                className={`p-2 rounded-lg ${buttonBg} ${textColor}`}
                onClick={() => setMute(!mute)}
              >
                {mute ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </button>
            </div>
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
                const isSpecialFood = specialFood && specialFood.x === x && specialFood.y === y;

                return (
                  <div
                    key={i}
                    className={`w-full h-full border border-transparent rounded-sm ${isHead ? headColor :
                      isSnake ? snakeColor :
                        isSpecialFood ? `${specialFoodColor} animate-pulse` :
                          isFood ? foodColor : cellBg
                      }`}
                    style={{ transition: 'background 0.1s' }}
                  />
                );
              })}
            </div>

            {gameState === 'paused' && (
              <div className={`absolute inset-0 flex items-center justify-center rounded-2xl z-10 ${isDarkMode ? 'bg-black/70' : 'bg-black/60'}`}>
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-100'}`}>PAUSED</div>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10 ${isDarkMode ? 'bg-black/70' : 'bg-black/60'}`}>
                <div className={`mb-2 text-[40px] font-semibold tracking-wide ${isDarkMode ? 'text-gray-100' : 'text-gray-100'}`}>Game Over</div>
                <div className="mb-2 text-xl font-semibold text-gray-100 drop-shadow-lg">Score: {score}</div>
                {score >= highScore && score > 0 && (
                  <div className="mb-4 text-lg font-semibold text-yellow-300 drop-shadow-lg">New High Score!</div>
                )}
                <button
                  className="px-6 py-3 cursor-pointer hover:scale-105 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition mt-2 flex items-center gap-2"
                  onClick={restartGame}
                >
                  <FaRedo /> Play Again
                </button>
              </div>
            )}
          </div>

          {specialFood && (
            <div className={`mt-2 text-center ${textColor} animate-pulse`}>
              Special Food: {specialFoodTimer}s
            </div>
          )}
        </div>
      )}
    </div>
  );
} 