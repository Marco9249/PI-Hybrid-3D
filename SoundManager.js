class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3; // Default volume
        this.masterGain.connect(this.ctx.destination);
        this.isMuted = false;

        // Resume context on first interaction
        const resume = () => {
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            document.removeEventListener('click', resume);
            document.removeEventListener('scroll', resume);
        };
        document.addEventListener('click', resume);
        document.addEventListener('scroll', resume);
    }

    // --- UI SOUNDS ---
    playClick() {
        if (this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // High-tech blip
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playHover() {
        if (this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
    }

    playTransition() {
        if (this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Swoosh effect
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(100, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.15);
        gain.gain.linearRampToValueAtTime(0.0, this.ctx.currentTime + 0.3);

        // Filter for "air" sound
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, this.ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(2000, this.ctx.currentTime + 0.3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }

    playDataReveal() {
        if (this.isMuted) return;
        // Digital typing/computing sound
        const now = this.ctx.currentTime;
        for (let i = 0; i < 3; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.value = 800 + Math.random() * 400;
            gain.gain.setValueAtTime(0.05, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.03);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.03);
        }
    }

    playSuccess() {
        if (this.isMuted) return;
        const now = this.ctx.currentTime;
        this._playNote(523.25, now, 0.1); // C5
        this._playNote(659.25, now + 0.1, 0.4); // E5
    }

    // --- LAYER SOUNDS ---
    playLayerSound(type) {
        if (this.isMuted) return;
        const now = this.ctx.currentTime;

        // Common gain envelope helper if needed, but we'll create per-sound
        const gain = this.ctx.createGain();
        gain.connect(this.masterGain);

        switch (type) {
            case 'input':
                // Data ingestion: Quick rising arpeggio
                this._playNote(220, now, 0.05);
                this._playNote(330, now + 0.05, 0.05);
                this._playNote(440, now + 0.1, 0.1);
                break;

            case 'conv':
            case 'conv1d':
                // Convolution: Rhythmic scanning (low-mid pulses)
                const oscC = this.ctx.createOscillator();
                oscC.type = 'square';
                oscC.frequency.setValueAtTime(110, now);
                oscC.frequency.linearRampToValueAtTime(55, now + 0.2);

                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

                oscC.connect(gain);
                oscC.start(now);
                oscC.stop(now + 0.2);
                break;

            case 'relu':
            case 'activation':
                // Activation: Sharp crisp "open" sound
                const oscA = this.ctx.createOscillator();
                oscA.type = 'triangle';
                oscA.frequency.setValueAtTime(880, now);
                oscA.frequency.linearRampToValueAtTime(1760, now + 0.1);

                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

                oscA.connect(gain);
                oscA.start(now);
                oscA.stop(now + 0.1);
                break;

            case 'pool':
            case 'batchnorm':
                // Pooling/Norm: Compressing sound (descending)
                const oscP = this.ctx.createOscillator();
                oscP.type = 'sine';
                oscP.frequency.setValueAtTime(440, now);
                oscP.frequency.exponentialRampToValueAtTime(110, now + 0.15);

                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.15);

                oscP.connect(gain);
                oscP.start(now);
                oscP.stop(now + 0.15);
                break;

            case 'lstm':
            case 'bilstm':
                // Recurrent: Echo/Delay effect simulation
                this._playNote(300, now, 0.1);
                this._playNote(300, now + 0.1, 0.1); // Echo 1
                this._playNote(300, now + 0.2, 0.05); // Echo 2
                break;

            case 'dropout':
                // Dropout: White noise burst (removing data)
                const bufSize = this.ctx.sampleRate * 0.1; // 100ms
                const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufSize; i++) data[i] = (Math.random() - 0.5) * 2;

                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;

                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

                noise.connect(gain);
                noise.start(now);
                noise.stop(now + 0.1);
                break;

            case 'dense':
            case 'output':
            case 'regression':
                // Dense/Output: Solid chord
                this._playNote(261.63, now, 0.4); // C4
                this._playNote(329.63, now, 0.4); // E4
                this._playNote(392.00, now, 0.4); // G4
                break;

            default:
                this.playHover();
        }
    }
    setWeather(type) {
        if (this.isMuted) return;
        // Stop previous weather loop
        if (this.loops && this.loops.weather) {
            try {
                this.loops.weather.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
                this.loops.weather.osc.stop(this.ctx.currentTime + 0.5);
            } catch (e) { }
            this.loops.weather = null;
        }

        if (type === 'rain') {
            // Simple Rain Synthesis (White Noise + Filter)
            const bufferSize = this.ctx.sampleRate * 2;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            noise.loop = true;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;

            const gain = this.ctx.createGain();
            gain.gain.value = 0.05;

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            noise.start();

            if (!this.loops) this.loops = {};
            this.loops.weather = { osc: noise, gain: gain }; // store noise node as 'osc' for consistency
        }
    }

    togglePump(active) {
        if (this.isMuted) return;
        if (active) {
            if (this.loops && this.loops.pump) return; // Already running

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            // Industrial Hum
            osc.frequency.value = 55;
            osc.type = 'sawtooth';

            // Filter to make it less harsh
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 200;

            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.5);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start();

            if (!this.loops) this.loops = {};
            this.loops.pump = { osc, gain };
        } else {
            if (this.loops && this.loops.pump) {
                const { osc, gain } = this.loops.pump;
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
                osc.stop(this.ctx.currentTime + 0.5);
                this.loops.pump = null;
            }
        }
    }

    _playNote(freq, time, duration) { // Helper kept for reference
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + duration);
    }
}

// Global instance
window.soundManager = new SoundManager();
