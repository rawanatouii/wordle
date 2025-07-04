import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [guess, setGuess] = useState('')
  const [results, setResults] = useState<string[][]>([])
  const [guesses, setGuesses] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [remaining, setRemaining] = useState<number>(6)

  // Stats from backend
  const [wins, setWins] = useState(0)
  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)

  // Fetch stats on load and after each guess/reset
  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:3000/stats')
      if (!res.ok) throw new Error('Failed to fetch stats')
      const data = await res.json()
      setWins(data.wins)
      setStreak(data.streak)
      setScore(data.score)
    } catch {
      // ignore errors silently
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (gameOver) return
    setError(null)

    if (guess.length !== 5) {
      setError('Word must be exactly 5 letters')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: guess }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Unknown error')
        if (data.error === 'Game is already over') {
          setGameOver(true)
        }
        return
      }

      setResults([...results, data.result])
      setGuesses([...guesses, guess])
      setRemaining(data.remaining || 0)
      setGuess('')

      if (data.status === 'won' || data.status === 'lost') {
        setGameOver(true)
      }

      fetchStats()
    } catch (err) {
      setError('Network or server error')
    }
  }

  const handleRestart = async () => {
    setError(null)
    try {
      const response = await fetch('http://localhost:3000/reset', { method: 'POST' })
      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to reset game on server')
        return
      }

      setResults([])
      setGuesses([])
      setGuess('')
      setGameOver(false)
      setRemaining(6)

      fetchStats()
    } catch {
      setError('Network error while resetting game')
    }
  }

  return (
    <div className="wordle-container">
      <h1>Wordle Clone</h1>

      <div className="stats">
        <div>Wins: {wins}</div>
        <div>Streak: {streak}</div>
        <div>Score: {score}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toLowerCase())}
          maxLength={5}
          disabled={gameOver}
          autoFocus
        />
        <button type="submit" disabled={gameOver}>
          Check
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="info">Attempts remaining: {remaining}</div>

      <div className="results">
        {results.map((row, idx) => (
          <div key={idx} className="row">
            {row.map((color, i) => (
              <span key={i} className={`tile ${color}`}>
                {guesses[idx][i]}
              </span>
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="end-screen">
          <p>🎉 Game Over! Want to play again?</p>
          <button className="restart-btn" onClick={handleRestart} disabled={!!error}>
            Start Over
          </button>
        </div>
      )}
    </div>
  )
}

export default App
