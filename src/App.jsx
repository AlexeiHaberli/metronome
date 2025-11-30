import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [bpm, setBpm] = useState(120)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [timeSignature, setTimeSignature] = useState('4/4')
  const [subdivision, setSubdivision] = useState('none')
  
  const intervalRef = useRef(null)
  const audioContextRef = useRef(null)
  const beatInMeasure = useRef(0)
  const subdivisionCount = useRef(0)

  // Obtener cantidad de beats según el compás
  const getBeatsPerMeasure = () => {
    const [beats] = timeSignature.split('/')
    return parseInt(beats)
  }

  // Inicializar AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Obtener el número de subdivisiones por beat
  const getSubdivisions = () => {
    switch (subdivision) {
      case 'eighth': return 2
      case 'triplet': return 3
      case 'sixteenth': return 4
      default: return 1
    }
  }

  // Función para reproducir el sonido del click
  const playClick = (isAccent = false, isSubdivision = false) => {
    const ctx = audioContextRef.current
    
    // Reanudar AudioContext si está suspendido (requerido por navegadores)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Diferentes frecuencias y volúmenes según el tipo de click
    if (isSubdivision) {
      // Subdivisiones: más agudas y suaves
      oscillator.frequency.value = 1400
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    } else if (isAccent) {
      // Beat acentuado (primer beat): más grave y fuerte
      oscillator.frequency.value = 1200
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
    } else {
      // Beats normales
      oscillator.frequency.value = 1000
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    }
    
    oscillator.type = 'sine'
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  }

  // Control del metrónomo
  useEffect(() => {
    if (isPlaying) {
      const beatsPerMeasure = getBeatsPerMeasure()
      const subdivisionsPerBeat = getSubdivisions()
      const interval = (60 / bpm / subdivisionsPerBeat) * 1000
      
      beatInMeasure.current = 0
      subdivisionCount.current = 0
      
      // Tocar primer beat inmediatamente al iniciar
      playClick(true, false)
      setCurrentBeat(1)
      beatInMeasure.current = 1
      subdivisionCount.current = 1
      
      intervalRef.current = setInterval(() => {
        subdivisionCount.current++
        
        // Determinar si es un beat principal o subdivisión
        const isMainBeat = subdivisionCount.current % subdivisionsPerBeat === 1
        
        if (isMainBeat) {
          // Avanzar al siguiente beat
          beatInMeasure.current = (beatInMeasure.current % beatsPerMeasure) + 1
          const isFirstBeat = beatInMeasure.current === 1
          
          playClick(isFirstBeat, false)
          setCurrentBeat(beatInMeasure.current)
        } else {
          // Es una subdivisión
          playClick(false, true)
        }
      }, interval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setCurrentBeat(0)
      beatInMeasure.current = 0
      subdivisionCount.current = 0
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, bpm, timeSignature, subdivision])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleBpmChange = (e) => {
    const newBpm = parseInt(e.target.value)
    setBpm(newBpm)
  }

  return (
    <>
      <h1>Metrónomo</h1>
      
      <div className="metronome-container">
        <div className="controls-row">
        <div className="time-signature-selector">
          <label htmlFor="time-signature">Compás:</label>
          <select 
            id="time-signature"
            value={timeSignature}
            onChange={(e) => setTimeSignature(e.target.value)}
            disabled={isPlaying}
          >
            <option value="2/4">2/4</option>
            <option value="3/4">3/4</option>
            <option value="4/4">4/4</option>
            <option value="5/4">5/4</option>
            <option value="6/8">6/8</option>
            <option value="7/8">7/8</option>
            <option value="9/8">9/8</option>
            <option value="10/8">10/8</option>
          </select>
        </div>

        <div className="subdivision-selector">
          <label htmlFor="subdivision">Subdivisión:</label>
          <select 
            id="subdivision"
            value={subdivision}
            onChange={(e) => setSubdivision(e.target.value)}
            disabled={isPlaying}
          >
            <option value="none">Ninguna</option>
            <option value="eighth">Corcheas (♪)</option>
            <option value="triplet">Tresillos (♪₃)</option>
            <option value="sixteenth">Semicorcheas (♬)</option>
          </select>
        </div>
      </div>

      <div className="beat-dots-container">
        {Array.from({ length: getBeatsPerMeasure() }, (_, i) => (
          <div 
            key={i}
            className={`beat-dot ${i + 1 === currentBeat ? 'active' : ''} ${i === 0 ? 'accent' : ''}`}
          />
        ))}
      </div>
      
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
      </div>
    </>
  )
}

export default App
