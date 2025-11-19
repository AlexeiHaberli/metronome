import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [bpm, setBpm] = useState(120)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  
  const intervalRef = useRef(null)
  const audioContextRef = useRef(null)

  // Inicializar AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Función para reproducir el sonido del click
  const playClick = () => {
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = 1000
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  }

  // Control del metrónomo
  useEffect(() => {
    if (isPlaying) {
      const interval = (60 / bpm) * 1000
      
      intervalRef.current = setInterval(() => {
        playClick()
        setCurrentBeat(prev => prev + 1)
      }, interval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setCurrentBeat(0)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, bpm])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleBpmChange = (e) => {
    const newBpm = parseInt(e.target.value)
    setBpm(newBpm)
  }

  return (
    <div className="metronome-container">
      <h1>Metrónomo</h1>
      
      <div className="bpm-display">
        <span className="bpm-value">{bpm}</span>
        <span className="bpm-label">BPM</span>
      </div>

      <input
        type="range"
        min="40"
        max="240"
        value={bpm}
        onChange={handleBpmChange}
        className="bpm-slider"
        disabled={isPlaying}
      />

      <div className="bpm-minmax">
        <span>40</span>
        <span>240</span>
      </div>

      <button 
        onClick={togglePlay}
        className={`play-button ${isPlaying ? 'playing' : ''}`}
      >
        {isPlaying ? '⏸ Pausar' : '▶ Iniciar'}
      </button>

      {isPlaying && (
        <div className="beat-indicator">
          <div className="beat-pulse"></div>
          <span>Beat: {currentBeat}</span>
        </div>
      )}
    </div>
  )
}

export default App
