import express, { Request, Response } from 'express'
import cors from 'cors'
import { validateWord } from './validator'
import { GameState } from './state'
import { validWords } from './dictionary'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

function getRandomWord(): string {
  const index = Math.floor(Math.random() * validWords.length)
  return validWords[index]
}

let game = new GameState(getRandomWord())

app.post('/guess', (req: Request, res: Response) => {
  const { word } = req.body

  if (!word || typeof word !== 'string') {
    return res.status(400).json({ error: 'Invalid input' })
  }

  if (game.getStatus() !== 'playing') {
    return res.status(400).json({ error: 'Game is already over' })
  }

  if (!validateWord(word)) {
    return res.status(400).json({ error: 'Invalid word' })
  }

  const result = game.makeGuess(word)
  const status = game.getStatus()
  const remaining = game.getRemainingAttempts()
  const history = game.getHistory()
  const stats = game.getStats()

  return res.json({ result, status, remaining, history, stats })
})

app.post('/reset', (_req: Request, res: Response) => {
  const newWord = getRandomWord()
  game.reset(newWord)
  const stats = game.getStats()
  res.json({ message: 'Game reset', stats })
})

app.get('/stats', (_req: Request, res: Response) => {
  res.json(game.getStats())
})

app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`)
})
