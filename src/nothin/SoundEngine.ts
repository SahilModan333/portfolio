// Web Audio API Synthesizer for tactile micro-interactions (Zero external file dependencies)
class SoundEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    // Check saved state
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nothin:sound")
      if (saved !== null) {
        this.enabled = saved === "1"
      }
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== "undefined") {
      localStorage.setItem("nothin:sound", this.enabled ? "1" : "0")
    }
    if (this.enabled) {
      this.chime()
    }
    return this.enabled
  }

  // Soft mechanical tick for hovering links and coordinates
  public tick() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.03)

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.03)
  }

  // Tactile switch click for buttons and modals
  public click() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = "triangle"
    osc.frequency.setValueAtTime(800, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.06)

    gain.gain.setValueAtTime(0.09, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.06)
  }

  // Harmonic chord chime for opening chapters and completion
  public chime() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const freqs = [523.25, 659.25, 783.99] // C5, E5, G5
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04)

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime + idx * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.04 + 0.4)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(this.ctx.currentTime + idx * 0.04)
      osc.stop(this.ctx.currentTime + idx * 0.04 + 0.4)
    })
  }

  // Aperture shutter for case studies
  public shutter() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(320, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.08)
  }
}

export const sound = new SoundEngine()
